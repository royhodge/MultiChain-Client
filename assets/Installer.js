// 
// 
// 
const {
    execFile
} = require('child_process');

const {
    remote
} = require('electron');

const createChain = (chainName) => {
    return new Promise((resolve, reject) => {
        execFile('multichain-util', ['create', chainName], (err, res) => {
            log.textContent = '';
            if (err) {
                reject(err)
                dom.newEl(log, 'p', '', '', err);
            }
            resolve(res)
            loadingModal.style.display = 'none';
            dom.newEl(log, 'p', '', '', res);
        })
    })
}

const setup = () => {
    createChain('root')
        .then(() => {
            remote.app.relaunch();
            remote.app.quit();
        })
}
setup()