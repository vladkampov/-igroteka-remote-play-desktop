const { app, BrowserWindow, shell } = require('electron');
const openvpnBin = require('openvpn-bin');
const openvpnmanager = require('node-openvpn');
const isDev = require('electron-is-dev');
const path = require('path');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


openvpnBin.initialize('openvpn', {
  host: 'vpn.zaborona.help',
  port: 1194,
  config: path.normalize('public/config.ovpn'),
}).then(() => {
  const managerInstance = openvpnmanager.connect({
    host: 'vpn.zaborona.help',
    port: 1194,
    timeout: 1500,
    logpath: 'log.txt',
  });

  managerInstance.on('connected', () => {
    console.log('connected');
    openvpnmanager.authorize({
      user: '',
      pass: '',
    })
      .then(() => createWindow())
      .catch(err => console.log('error', err));
  });

  managerInstance.on('console-output', output => {
    console.log('output', output);
  });

  managerInstance.on('error', error => {
    console.log('error', error);
  })


  managerInstance.on('disconnected', () => {
    console.log('disconnected');
    openvpnmanager.destroy();
  });
}).catch(err => console.log(err));


function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600, nativeWindowOpen: true, frame: false });

  win.setResizable(false);

  // and load the index.html of the app.
  win.loadURL(isDev ? 'http://vk.com' : `file://${path.join(__dirname, '../build/index.html')}`);

  // Open the DevTools.
  win.webContents.openDevTools();

  win.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // openvpnmanager.disconnect();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
