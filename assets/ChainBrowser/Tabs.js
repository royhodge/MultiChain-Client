// 
// 
const remote = require('electron').remote;

closeApp.addEventListener('click', () => { remote.app.quit(); });
refreshApp.addEventListener('click', () => { location.reload(); });