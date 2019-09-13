//
import { app, crashReporter } from 'electron';

import BrowserWindows from './BowserWindows'
import LocalChains from '../renderer/constants/LocalChains'
import Daemons from '../renderer/constants/Daemons'

const isDevelopment = process.env.NODE_ENV === 'development';

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false,
});


app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  LocalChains()
  .then(localchains => {
    localchains.forEach(chain => {
      Daemons.startMultichain(chain);
    });
  })
  .then(()=> {
    BrowserWindows.main();
  })
  .catch(() => {
    console.log('No local chains');
  })
});


app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
