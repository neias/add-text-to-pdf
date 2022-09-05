const electron = require('electron');
const { ipcRenderer } = electron;

document.querySelector("#fileOpen").addEventListener('click', () => {
  ipcRenderer.send('key:openFile');
});

ipcRenderer.on("pathPdf", (err, pdf) => {
  document.getElementById('pdf').src = pdf;
});
