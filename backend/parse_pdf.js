const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser(this, 1);
const pdfPath = path.join(__dirname, '..', 'Dazz Tradlink CP.pdf');

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync('pdf-content.txt', pdfParser.getRawTextContent());
    console.log('PDF extracted to pdf-content.txt');
});

pdfParser.loadPDF(pdfPath);
