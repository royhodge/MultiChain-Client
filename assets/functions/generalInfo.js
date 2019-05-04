// 
const sideNav = require('./sideNav');

let ChainnameDisplay = document.querySelector('#ChainnameDisplay');
let NodeAddressDisplay = document.querySelector('#NodeAddressDisplay');
let VersionDisplay = document.querySelector('#VersionDisplay');
let UsernameDisplay = document.querySelector('#UsernameDisplay');
let paramsList = document.querySelector('#paramsList');

// 
// 
module.exports = {
    displayInfo: () => {
        multichain.getInfo((err, info) => {
            ChainnameDisplay.textContent = info.chainname;
            NodeAddressDisplay.textContent = info.nodeaddress;
            VersionDisplay.textContent = info.version;
            if (process.platform === 'win32') {
                OSDisplay.textContent = 'Windows';
            }
            UsernameDisplay.textContent = process.env.USERNAME;
        });
    },
    // Blockchain Params are more useful than getInfo in most cases
    displayBlockchainParams: () => {
        let params = [
            'anyone-can-connect',
            'anyone-can-create',
            'anyone-can-issue',
            'anyone-can-send',
            'anyone-can-receive',
            'anyone-can-mine',
            'anyone-can-admin',
            'anyone-can-activate',
        ]; 
        
        paramsList.textContent = '';
        multichain.getBlockchainParams((err, info) => {
            if (err) {
                throw err;
            }
            params.forEach((val) => {
                dom.newEl(paramsList, 'li', '', '', val + ': ' + info[val]);
            });
        });
    },
};
