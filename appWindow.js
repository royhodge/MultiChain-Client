// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWindow;
// Change to download path 

// Client global variables
const clientVars = {
  chains: path.join(process.env.APPDATA, 'Multichain'),
  installFiles: path.join('C:', process.env.HOMEPATH, 'documents', 'multichain-windows-2.0-release/'),    
};

function createWindow() {
  // Create the browser window.
  appWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    fullscreen: false
  });

  // and load the index.html of the app.  
  // profileWindow.loadFile('app/index.html');  
  // Open the DevTools.
  // appWindow.webContents.openDevTools();

  fs.readdir(clientVars.installFiles, (err, stat) => {
    if (err) {
      appWindow.loadFile('app/download.html');
    } else {
      appWindow.loadFile('app/index.html');
    }
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
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (profileWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
