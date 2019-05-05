// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  shell
} = require('electron');
const path = require('path');
const fs = require('fs');
const {
  exec,
  execFile
} = require('child_process');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWindow, multichainexe, chainsPath, start, create;

// Root of Electron App
let approotPath = path.resolve();

switch (process.platform) {
  case 'win32':
    multichainexe = path.join(approotPath, 'multichain', '/');
    chainsPath = path.join(process.env.APPDATA, 'Multichain', '/');
    start = (chainName) => execFile(multichainexe + 'multichaind.exe', [chainName, '-daemon'], (err, res) => {
      if (err) throw err;
      console.log(res);
    });
    create = (chainName) => execFile(multichainexe + 'multichain-util.exe', ['create', chainName], (err, res) => {
      if (err) throw err;
      console.log(res);
    });
    break;
  case 'linux':
    multichainexe = process.env.NODE.replace('/bin/node', '/local/bin/')
    chainsPath = path.join(process.env.HOME, '.multichain', '/');
    start = (chainName) => execFile(multichainexe + 'multichaind', [chainName, '-daemon'], (err, res) => {
      if (err) throw err;
      console.log(res);
    });
    create = (chainName) => execFile(multichainexe + 'multichain-util', ['create', chainName], (err, res) => {
      if (err) throw err;
      console.log(res);
    });
    break;
  default:
    // add paths for darwin. need help
    break;
}

const firstInit = () => {
  create('home'); 
  app.relaunch();
  setTimeout(() => app.quit(), 3000);
};

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
