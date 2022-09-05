import * as React from 'react';

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

let pdfDoc;


async function loadPdf() {
  // Fetch an existing PDF document.
  const url = './biyoloji9.pdf';
  
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  // Load a `PDFDocument` from the existing PDF bytes.
  return await PDFDocument.load(existingPdfBytes);
}

async function addPageToDoc(doc) {
  const page = doc.addPage();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const { width, height } = page.getSize();
  const fontSize = 30;
  page.drawText('Adding a page in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });

  return doc;
}

async function removePageToDoc(doc) {
  const totalPages = doc.getPageCount();
  doc.removePage(totalPages - 1);
  return doc;
}

async function saveAndRender(doc) {
  // Serialize the `PDFDocument` to bytes (a `Uint8Array`).
  // const pdfBytes = await doc.save()

  const pdfDataUri = await doc.saveAsBase64({ dataUri: true });
  document.getElementById('pdf').src = pdfDataUri;
}

async function addPage() {
  pdfDoc = await addPageToDoc(pdfDoc);
  await saveAndRender(pdfDoc);
}

async function removePage() {
  pdfDoc = await removePageToDoc(pdfDoc);
  await saveAndRender(pdfDoc);
}


const App = () => {

  loadPdf().then((doc) => {
    pdfDoc = doc;

    console.log(pdfDoc);
    // return saveAndRender(pdfDoc);
  });

  

  
  return(
    <>
      <div>merhaba </div>
    </>
  );
};

export default App;
