const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { writeFileSync, readFileSync } = require("fs");

const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadFile('index.html');

  ipcMain.on('key:openFile', (err) => {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{name: "PDF Dosyası", extensions: ['pdf']}]
    }).then(result => {
      mainWindow.webContents.send("pathPdf", result.filePaths[0]);
      mainWindow.webContents.send("changePath", result.filePaths[0]);
    });
  });

  ipcMain.on('key:test', (err, data) => {
    testPdf(data).then(() => {
      mainWindow.webContents.send("pathPdf", path.join(__dirname, 'deneme.pdf'));
    }
    );
  });

  ipcMain.on('key:run', (err, data) => {
    runPdf(data);
  });

  mainWindow.on('closed', function() {
    app.quit();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});




app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});




async function loadPdf(url) {
  // Load a `PDFDocument` from the existing PDF bytes.
  return await PDFDocument.load(readFileSync(url));
}

async function testPdf(data) {
  const pdfDoc = await PDFDocument.load(readFileSync(data.pdf));

  const courierBoldFont = await pdfDoc.embedFont(StandardFonts.Courier);
  
  const firstPage = pdfDoc.getPage(0);
  firstPage.moveTo(Math.floor(data.sol), Math.floor(data.alt));
  firstPage.drawText(data.ornekMetin, {
    font: courierBoldFont,
    size: 12,
    lineHeight: 10,
  });

  writeFileSync("deneme.pdf", await pdfDoc.save());
}


async function runPdf(data) {
  const arr = data.data.split(/r?\n/);

  const pdfDoc = await PDFDocument.load(readFileSync(data.pdf));
  const nullPdf = await PDFDocument.create();
  
  const courierBoldFont = await nullPdf.embedFont(StandardFonts.Courier);

  for(let i=0; i<arr.length; i++){
    const [nullPage] = await nullPdf.copyPages(pdfDoc, [0]);
    nullPdf.addPage(nullPage);


    const firstPage = nullPdf.getPage(i);
    firstPage.moveTo(Math.floor(data.sol), Math.floor(data.alt));
    firstPage.drawText(arr[i], {
      font: courierBoldFont,
      size: 12,
      lineHeight: 10,
      color: rgb(0, 0, 0),
    });
  }
  
  // arr.map(async (item, index) => {
    // const firstPage = nullPdf.getPage(index);
    // firstPage.moveTo(Math.floor(data.sol), Math.floor(data.alt));
    // firstPage.drawText(item, {
    //   font: courierBoldFont,
    //   size: 12,
    //   lineHeight: 10,
    // });
  // });
  
  writeFileSync("deneme.pdf", await nullPdf.save());
}
