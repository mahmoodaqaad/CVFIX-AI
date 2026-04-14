"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDF(
    elementId: string,
    fileName: string = "resume.pdf"
) {
    const element = document.getElementById(elementId);

    if (!element) {
        throw new Error("Element not found");
    }

    // 🔥 مهم جدًا: انتظار الخطوط واستقرار الـ layout
    await document.fonts?.ready;
    await new Promise((r) => setTimeout(r, 500));

    // Create container
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "0";
    container.style.top = "0";
    container.style.width = "210mm";
    container.style.zIndex = "-9999";
    container.style.background = "#fff";

    document.body.appendChild(container);

    // Clone element
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.margin = "0";
    clone.style.padding = "0";
    clone.style.height = "auto";

    // ⬇️ لازم ندخله للـ DOM قبل القياس
    container.appendChild(clone);

    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 300));

    // Collect blocks
    const blocks: HTMLElement[] = [];

    const collectBlocks = (node: HTMLElement) => {
        const children = node.children;

        for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;

            const hasHeading = child.querySelector("h2");

            if (hasHeading && child.children.length > 1) {
                const sectionChildren = Array.from(child.children) as HTMLElement[];

                sectionChildren.forEach((sectionChild) => {
                    blocks.push(sectionChild.cloneNode(true) as HTMLElement);
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

    let currentPage = createNewPage();
    container.appendChild(currentPage);

    // ✅ FIX: استخدم height الحقيقي بدل رقم ثابت
    const pageHeightPx = currentPage.getBoundingClientRect().height;
    const marginPx = 75;

    for (const block of blocks) {
        currentPage.appendChild(block);

        const totalHeight =
            block.offsetTop + block.getBoundingClientRect().height;

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
        compress: true,
    });

    // Render pages
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        try {
            const canvas = await html2canvas(page, {
                scale: 1, // 🔥 مهم: ثابت للموبايل
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                allowTaint: false,
                scrollX: 0,
                scrollY: 0,
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.85);

            if (i > 0) pdf.addPage();

            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
        } catch (err) {
            console.error(`Error rendering page ${i}:`, err);

            throw new Error(
                "فشل إنشاء PDF على هذا الجهاز. حاول مرة أخرى أو استخدم كمبيوتر."
            );
        }
    }

    // Save PDF
    try {
        pdf.save(fileName);
    } catch (saveError) {
        console.error("Save error:", saveError);

        const pdfOutput = pdf.output("arraybuffer");
        const blob = new Blob([pdfOutput], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    } finally {
        if (container?.parentNode) {
            document.body.removeChild(container);
        }
    }

    return pdf;
}