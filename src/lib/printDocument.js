import html2pdf from "html2pdf.js";

const printDocument = async ({ invoiceData, originalElement, month }) => {
    try {
        if (!originalElement) return;

        // Clone node and apply inline styles for PDF
        const clone = originalElement.cloneNode(true);
        clone.style.background = "#fff";
        clone.style.color = "#000";
        clone.style.padding = "20px";
        clone.style.fontFamily = "Arial, sans-serif";
        clone.querySelectorAll("*").forEach((el) => {
            el.style.color = "#000";
        });

        document.body.appendChild(clone);

        const options = {
            margin: 0.5,
            filename: `invoice-${
                invoiceData ? invoiceData.invoiceNumber : month
            }.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: "in",
                format: "letter",
                orientation: "portrait",
            },
        };

        await html2pdf().set(options).from(clone).save();
        document.body.removeChild(clone);
    } catch (err) {
        console.error("PDF Error:", err);
    }
};
export default printDocument;
