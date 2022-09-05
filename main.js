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

  mainWindow.loadFile('index.html');

  ipcMain.on('key:openFile', (err) => {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{name: "PDF Dosyası", extensions: ['pdf']}]
    }).then(result => {
      mainWindow.webContents.send("pathPdf", result.filePaths[0]);
    });
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
