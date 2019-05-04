// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').execFile;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWindow;

// Paths 
let approotPath = path.resolve();
let multichainPath = path.join(approotPath, 'multichain', '/');
let chainsPath = path.join(process.env.APPDATA, 'Multichain', '/');

// functions
const start = (chainName) => exec(multichainPath + 'multichaind.exe', [chainName, '-daemon']);
const create = (chainName) => exec(multichainPath + 'multichain-util.exe', ['create', chainName]);
const stop = (chainName) => exec(multichainPath + 'multichain-cli.exe', [chainName, 'stop']);

const firstInit = () => { 
  create('home');
  app.relaunch();
  setTimeout(() => app.quit(), 3000);
};
const createWindow = () => {
  // Create the browser window.
  appWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    fullscreen: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  // Open the DevTools.
  appWindow.webContents.openDevTools();

  appWindow.loadFile('index.html');
  
  appWindow.once('ready-to-show', () => {
    appWindow.show();
  });

  // Emitted when the window is closed.
  appWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    appWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.

// Is installed? init : start all chains
fs.readdir(chainsPath, (err, stat) => {
  if (err) {
    firstInit();
  } else {
    // Start all chains
    stat.forEach((val) => {
      if (!(val.includes("."))) {
        start(val);
      }     
    });
    setTimeout(() => {
      createWindow();
    }, 500);
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (appWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.