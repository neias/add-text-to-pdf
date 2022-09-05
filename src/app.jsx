import * as React from 'react';
import * as ReactDom from 'react-dom';

import { PDFDocument } from 'pdf-lib';

async function loadPdf() {
  // Fetch an existing PDF document.
  const url = './demo.pdf';
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  // Load a `PDFDocument` from the existing PDF bytes.
  return await PDFDocument.load(existingPdfBytes);
}


const App = () => {
  return(
    <>merhaba</>
  );
};

export default App;
