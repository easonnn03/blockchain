import { PDFDocument, rgb } from 'pdf-lib';

export async function generatePDF(companyName, issueDate) {
  try {
    // Define the path to the PDF template
    const pdfTemplateUrl = "/Certificate_of_authenticity.pdf";

    // Fetch the existing PDF template
    const response = await fetch(pdfTemplateUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF template: ${response.statusText}`);
    }

    const existingPdfBytes = await response.arrayBuffer();

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page of the PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Define text properties
    const fontSize = 24; // Adjust font size as needed
    const xPosition = 150; // Adjust X position
    const yPositionCompany = 400; // Y position for company name
    const yPositionDate = 360; // Y position for the issue date

    // Add company name to the PDF
    firstPage.drawText(companyName, {
      x: xPosition,
      y: yPositionCompany,
      size: fontSize,
      color: rgb(0, 0, 0), // Black color
    });

    // Add issue date to the PDF
    firstPage.drawText(issueDate, {
      x: xPosition,
      y: yPositionDate,
      size: fontSize,
      color: rgb(0, 0, 0), // Black color
    });

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();

    // Convert the PDF bytes to a Blob
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Return the Blob
    return pdfBlob;
  } catch (error) {
    console.error("Error during PDF generation:", error);
    throw error; // Rethrow error for further handling
  }
}
