const electron = require("electron");
const IPC = electron.ipcRenderer;

window.onload = () => {
  window.play = str => IPC.send(str);
}
