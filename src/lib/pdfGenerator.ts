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
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "210mm"; // A4 width
    document.body.appendChild(container);

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;

    // Reset margins/padding on the clone itself as we handle pages manually
    clone.style.margin = "0";
    clone.style.padding = "0";
    clone.style.height = "auto";

    // Extract logical sections/blocks to paginate
    const blocks: HTMLElement[] = [];

    // Helper to traverse and collect "atomic" blocks
    const collectBlocks = (node: HTMLElement) => {
        // If node corresponds to a major section (like "Experience" wrapper), traverse children
        // We identify sections by checking if they contain headers or lists
        // For simplicity, we treat first-level children of the main container as blocks,
        // EXCEPT if a block is too large, we might split it?
        // Let's stick to first-level children of the CV template (Header, Summary, Experience Section, etc.)
        // But Experience Section might be huge. We need to split IT.

        const children = node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            // If the child is a "Section" container (has a header and list of items), we want its children
            // The structure in CVTemplate is:
            // <div>... (Header)</div>
            // <div>... (Summary)</div>
            // <div>
            //    <h2>Experience</h2>
            //    <div>Job 1</div>
            //    <div>Job 2</div>
            // </div>

            // Heuristic: If it has a H2, it's a section wrapper.
            // We want to keep the H2, but treat subsequent divs as separate blocks.
            // BUT we want to keep them grouped semantically? 
            // Actually, if we just flatten everything into a list of "print blocks", we can reconstruct the layout.
            // However, the section wrapper might have margin-bottom.

            // Let's try to flatten "Section Containers" but keep "Items".
            const hasHeading = child.querySelector("h2");
            if (hasHeading && child.children.length > 1) {
                // It's a section. Add the H2 block.
                // Then add children blocks.
                // But wait, the section div itself has 'mb-6'. We lose that if we unwrap.
                // We can add a "spacer" block or apply margin to the last item?
                // Let's traverse children.
                const sectionChildren = Array.from(child.children) as HTMLElement[];
                sectionChildren.forEach(sectionChild => {
                    // Clone the node to detach from parent
                    const sectionChildClone = sectionChild.cloneNode(true) as HTMLElement;
                    // Preserve some context if needed? 
                    // For spacing, we can check computed style? 
                    // Let's simplistically add it.
                    blocks.push(sectionChildClone);
                });
                // Add a spacer block for the section margin
                const spacer = document.createElement("div");
                spacer.style.height = "1.5rem"; // approx mb-6
                blocks.push(spacer);
            } else {
                // It's an atomic block (like Header or simple section)
                blocks.push(child.cloneNode(true) as HTMLElement);
            }
        }
    };

    // The CVTemplate has direct children.
    collectBlocks(clone);

    // Prepare Pages
    const pages: HTMLElement[] = [];
    let currentPage = createNewPage();
    // We need to measure height in PIXELS on the screen.
    // A4 height in pixels (approx) = 1122px (at 96dpi)
    // Let's rely on the container width (210mm) and let browser layout content.
    // We append current page to container to measure.
    container.appendChild(currentPage);

    // Helper to create page
    function createNewPage() {
        const page = document.createElement("div");
        page.className = "bg-white text-black relative";
        page.style.width = "210mm";
        page.style.minHeight = "297mm";
        page.style.padding = "20mm"; // Matches standard A4 margin
        page.style.boxSizing = "border-box";
        page.style.overflow = "hidden"; // Hide overflow
        // We need to apply the same font styles as the original
        page.style.fontFamily = "Arial, sans-serif";
        page.style.fontSize = "11pt";
        page.style.lineHeight = "1.5";
        return page;
    }

    // Process Blocks
    for (const block of blocks) {
        currentPage.appendChild(block);

        // Check if overflowing
        // We use scrollHeight of the content area.
        // Actually, easiest is: the content height (last element bottom) should not exceed CONTENT_HEIGHT_MM.
        // But simpler: `currentPage.scrollHeight` > `currentPage.clientHeight`?
        // `currentPage` has min-height 297mm.
        // So we want to check if the content goes beyond 297mm - 20mm padding bottom?
        // Since we have padding 20mm, the content area ends at 277mm.
        // Let's use a wrapper inside the page for content?
        // Or just check block.getBoundingClientRect().bottom wrt page.

        // Wait, since 'container' is hidden and possibly not fully rendered, metrics might be off.
        // We must append to document body (which we did).

        // For more accurate measurement, we need to inspect the page in DOM.
        // A4 297mm is approx 1122px.
        // Padding 20mm is approx 75px.
        // Usable height ~ 970px.

        const pageHeightPx = 1122; // 297mm * 3.78 
        const marginPx = 75; // 20mm * 3.78


        // Calculate total used height
        // We can just sum up offsetHeights of children?
        // Block might have margin.

        // Let's check `block.offsetTop + block.offsetHeight` relative to `currentPage`.
        // Since `currentPage` has padding, offsetTop starts at padding.

        // Actually best way:
        const totalHeight = block.offsetTop + block.offsetHeight;
        // In the context of `currentPage` (which is `relative`), `offsetTop` is relative to it?
        // If `currentPage` has padding, `block` inside it starts at `padding`.

        // The limit is `pageHeightPx - marginPx` (bottom margin).
        // `offsetTop` is distance from top border.

        const limit = pageHeightPx - marginPx;

        if (totalHeight > limit) {
            // Overflow!
            // Move this block to next page
            currentPage.removeChild(block);
            pages.push(currentPage);

            // Create new page
            currentPage = createNewPage();
            container.appendChild(currentPage); // Add to DOM to measure
            currentPage.appendChild(block);

            // If this single block is huge (larger than page), we force split or accept cut.
            // For now we accept cut or it just overflows. 
            // Ideally we recursively split.
            // But assuming blocks are "Items" (jobs), they fit in one page mostly.
        }
    }

    // Push the last page
    pages.push(currentPage);

    // Generate PDF
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        // Generate Header per page? No, usually not for CV.

        const canvas = await html2canvas(page, {
            scale: 2, // High quality
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        if (i > 0) {
            pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    }

    pdf.save(fileName);

    // Cleanup
    document.body.removeChild(container);
}
