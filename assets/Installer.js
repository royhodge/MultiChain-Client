// 
// 
// 
const { execFile } = require('child_process');
const { remote } = require('electron');

const createChain = (chainName) => execFile('multichain-util', ['create', chainName], (err, res) => {
    if (err) {  dom.newEl(log, 'p', '', '', err); }   
    dom.newEl(log, 'p', '', '', res);
    loadingModal.style.display = 'none';
    setTimeout(() => {        
        remote.app.relaunch();
        remote.app.quit();
    }, 1000);
});
createChain('app');
