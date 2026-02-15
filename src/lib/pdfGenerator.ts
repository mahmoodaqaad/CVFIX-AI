"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDF(elementId: string, fileName: string = "resume.pdf") {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error("Element not found");
    }

    // Create a temporary container for processing
    const container = document.createElement("div");
    container.style.position = "fixed"; // Use fixed to ensure it's in the viewport context
    container.style.left = "-1000vw"; // Move far left
    container.style.top = "0";
    container.style.width = "210mm";
    container.style.zIndex = "-9999";
    document.body.appendChild(container);

    // ... (rest of the cloning and paginate logic remains same)
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.margin = "0";
    clone.style.padding = "0";
    clone.style.height = "auto";

    const blocks: HTMLElement[] = [];
    const collectBlocks = (node: HTMLElement) => {
        const children = node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            const hasHeading = child.querySelector("h2");
            if (hasHeading && child.children.length > 1) {
                const sectionChildren = Array.from(child.children) as HTMLElement[];
                sectionChildren.forEach(sectionChild => {
                    const sectionChildClone = sectionChild.cloneNode(true) as HTMLElement;
                    blocks.push(sectionChildClone);
                });
                const spacer = document.createElement("div");
                spacer.style.height = "1.5rem";
                blocks.push(spacer);
            } else {
                blocks.push(child.cloneNode(true) as HTMLElement);
            }
        }
    };

    collectBlocks(clone);

    const pages: HTMLElement[] = [];
    let currentPage = createNewPage();
    container.appendChild(currentPage);

    function createNewPage() {
        const page = document.createElement("div");
        page.className = "bg-white text-black relative";
        page.style.width = "210mm";
        page.style.minHeight = "297mm";
        page.style.padding = "20mm";
        page.style.boxSizing = "border-box";
        page.style.overflow = "hidden";
        page.style.fontFamily = "Arial, sans-serif";
        page.style.fontSize = "11pt";
        page.style.lineHeight = "1.5";
        return page;
    }

    for (const block of blocks) {
        currentPage.appendChild(block);
        const pageHeightPx = 1122;
        const marginPx = 75;
        const totalHeight = block.offsetTop + block.offsetHeight;
        const limit = pageHeightPx - marginPx;

        if (totalHeight > limit) {
            currentPage.removeChild(block);
            pages.push(currentPage);
            currentPage = createNewPage();
            container.appendChild(currentPage);
            currentPage.appendChild(block);
        }
    }

    pages.push(currentPage);

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true // Enable compression for mobile
    });

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        try {
            const canvas = await html2canvas(page, {
                scale: window.innerWidth < 768 ? 1.5 : 2, // Slightly lower scale on mobile to save memory
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                allowTaint: true,
                scrollX: 0,
                scrollY: 0,
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.9); // Use JPEG with quality 0.9 to reduce size

            if (i > 0) {
                pdf.addPage();
            }

            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
        } catch (err) {
            console.error(`Error rendering page ${i}:`, err);
            // Fallback: try with lower scale if it failed
            const canvas = await html2canvas(page, {
                scale: 1,
                useCORS: true,
                backgroundColor: "#ffffff",
            });
            const imgData = canvas.toDataURL("image/jpeg", 0.8);
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
        }
    }

    pdf.save(fileName);
    document.body.removeChild(container);
}
