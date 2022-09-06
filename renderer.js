const electron = require('electron');
const { ipcRenderer } = electron;

document.querySelector("#fileOpen").addEventListener('click', () => {
  ipcRenderer.send('key:openFile');
});

ipcRenderer.on("pathPdf", (err, pdf) => {
  document.getElementById('pdf').src = pdf;
});

ipcRenderer.on("changePath", (err, path) => {
  document.getElementById('hdnPath').value = path;
});

document.querySelector("#test").addEventListener('click', () => {
  const data = {
    sol: document.querySelector("#sol").value,
    alt: document.querySelector("#alt").value,
    ornekMetin: document.querySelector("#ornek-metin").value,
    pdf: document.getElementById('hdnPath').value
  };

  ipcRenderer.send('key:test', data);
});

document.querySelector("#run").addEventListener('click', () => {
  const data = {
    sol: document.querySelector("#sol").value,
    alt: document.querySelector("#alt").value,
    data: document.querySelector("#kod-numara").value,
    pdf: document.getElementById('hdnPath').value
  };
  ipcRenderer.send('key:run', data);
});
