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

  const path = document.getElementById('hdnPath').value;
  const yol = path.split('/');
  let newPathname = '';
  
  for (i = 1; i < yol.length -1; i++) {
    newPathname += "/";
    newPathname += yol[i];
  }
  // newPathname =  newPathname + '/' + '(added)_' + yol[yol.length-1];

  
  const data = {
    sol: document.querySelector("#sol").value,
    alt: document.querySelector("#alt").value,
    ornekMetin: document.querySelector("#ornek-metin").value,
    pdf: document.getElementById('hdnPath').value,
    newPath: newPathname,
    newFile: '(added)_' + yol[yol.length-1]
  };

  ipcRenderer.send('key:test', data);
});

document.querySelector("#run").addEventListener('click', () => {
  const path = document.getElementById('hdnPath').value;
  const yol = path.split('/');
  let newPathname = '';
  
  for (i = 1; i < yol.length -1; i++) {
    newPathname += "/";
    newPathname += yol[i];
  }
  // newPathname =  newPathname + '/' + '(added)_' + yol[yol.length-1];
  
  const data = {
    sol: document.querySelector("#sol").value,
    alt: document.querySelector("#alt").value,
    data: document.querySelector("#kod-numara").value,
    pdf: document.getElementById('hdnPath').value,
    newPath: newPathname,
    newFile: '(added)_' + yol[yol.length-1]
  };
  ipcRenderer.send('key:run', data);
});
