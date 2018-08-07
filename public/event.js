const electron = require("electron");
const IPC = electron.ipcRenderer;

window.onload = function() {
const Play = document.getElementById('btnplay');
//const Demo = document.getElementById('btnplaydemo');

Play.addEventListener('click', function () {
  IPC.send('Play');
});
// Demo.addEventListener('click', function () {
//   IPC.send('Demo');
// });
}
