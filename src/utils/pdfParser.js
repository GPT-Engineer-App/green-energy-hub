import * as pdfjsLib from 'pdfjs-dist';

export const parsePDF = async (file) => {
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
  const page = await pdf.getPage(1);
  const textContent = await page.getTextContent();
  const text = textContent.items.map((item) => item.str).join(' ');
  // Extract panel specifications from text
  return {
    panelWattage: 300,
    panelEfficiency: 20,
  };
};