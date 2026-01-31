import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDF(content: string, filename: string) {
  const element = document.createElement("div");
  element.style.position = "absolute";
  element.style.left = "-9999px";
  element.style.width = "800px";
  element.style.padding = "40px";
  element.style.fontFamily = "cursive";
  element.style.fontSize = "16px";
  element.style.lineHeight = "1.6";
  element.style.color = "#333";
  element.style.background = "linear-gradient(135deg, #FFB6E1 0%, #D8BFD8 100%)";
  element.innerHTML = `<div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">${content.replace(/\n/g, "<br>")}</div>`;
  document.body.appendChild(element);

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
  } finally {
    document.body.removeChild(element);
  }
}

