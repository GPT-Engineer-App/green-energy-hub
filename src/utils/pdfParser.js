import * as pdfjsLib from "pdfjs-dist";

export const parsePDF = async (file) => {
  const pdf = await pdfjsLib.getDocument(file).promise;
  const page = await pdf.getPage(1);
  const textContent = await page.getTextContent();
  return textContent.items.map((item) => item.str).join(" ");
};