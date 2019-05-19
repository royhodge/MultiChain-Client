// 
// 
const remote = require('electron').remote;
const Windows = require('../Windows');

IPFSbtn.addEventListener('click', () => { Windows.addFiles(); });
closeApp.addEventListener('click', () => { remote.app.quit(); });
refreshApp.addEventListener('click', () => { location.reload(); });