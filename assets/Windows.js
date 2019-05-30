const { remote, BrowserWindow} = require('electron');

module.exports = {
    addFiles: () => {
        let window = new remote.BrowserWindow({
            width: 450,
            height: 650,
            frame: false,
            resizable: true,
            webPreferences: {
                nodeIntegration: true
            }
        });

        window.loadFile('pages/addfiles.html');

        // window.webContents.openDevTools();

        window.on('closed', function () {
            window = null
        });
    },
    install: () => {
        let window = new BrowserWindow({
            width: 600,
            height: 600,
            frame: false,           
            webPreferences: {
                nodeIntegration: true
            }
        });
        // and load the index.html of the app.
        window.loadFile('pages/installer.html');

                // Emitted when the window is closed.
        window.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            window = null
        });
    },    
    login: () => {
        let window = new BrowserWindow({
            width: 800,
            height: 600,           
            frame: false,
            fullscreen: true,   
            webPreferences: {
                nodeIntegration: true
            }         
        });
        // and load the index.html of the app.
        window.loadFile('pages/login.html');
        window.webContents.openDevTools();        

        // Emitted when the window is closed.
        window.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            window = null
        });
    }
}