// 
const ci = require('./chainInit');  

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
        let params = ci.chainPresets.SLC;
        paramsList.innerText = '';
        multichain.getBlockchainParams((err, info) => {
            if (err) {
                throw err;
            }            
            params.forEach((val) => {
                dom.newEl(paramsList, 'li', '', '', val);
            });
        });
    },    
};
