import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    // Dynamic import of jsPDF (server-side)
    const { jsPDF } = await import("jspdf");

    // Create PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set font and styling
    doc.setFontSize(16);
    doc.setTextColor(236, 72, 153); // Pink color
    doc.text("A Love Letter for Avani", 105, 20, { align: "center" });

    // Add decorative heart
    doc.setFontSize(20);
    doc.text("❤️", 105, 30, { align: "center" });

    // Main content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Split text into lines that fit page width
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    const lineHeight = 7;
    let y = 45;

    const lines = doc.splitTextToSize(text, maxWidth);
    
    lines.forEach((line: string) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(168, 85, 247); // Purple color
    doc.text("With all my love, ❤️", 105, pageHeight - 10, { align: "center" });

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=love-letter-for-avani.pdf",
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

