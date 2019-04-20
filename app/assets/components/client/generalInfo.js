// 
// 
const path = require('path');
// General Variables

const generalInfoContent = () => {
    let infoInfoArray = [
        'Username',
        'Chainname',
        'Version',
        'NodeAddress',
        'OS',
        'Parameters'
    ];

    clientDOM.newEl('h3', '', '', Info, `General Info`);
    clientDOM.newEl('select', 'selectChain', 'w3-input', Info);
    selectChain.setAttribute('onclick', 'display()');

    let chainNames = [];

    chainDB.forEach((val => chainNames.push(val.name)));
    clientDOM.newOp(chainNames, selectChain);

    infoInfoArray.forEach((val) => {
        el = clientDOM.newEl('div', '', 'w3-padding w3-border', Info, val + ':');
        clientDOM.newEl('span', val + 'Display', 'w3-right', el);
    });
    clientDOM.newEl('ul', 'paramsList', 'w3-ul w3-border', Info);
};

const giFunctions = {
    displayInfo: () => {
        multichain.getInfo((err, info) => {
            // info is an object            
            ChainnameDisplay.textContent = info.chainname;
            NodeAddressDisplay.textContent = info.nodeaddress;
            VersionDisplay.textContent = info.version;
            if (process.platform === 'win32') {
                OSDisplay.textContent = 'Windows';
            }
            UsernameDisplay.textContent = process.env.USERNAME;
        });
    },
    displayBlockchainParams: () => {

        let params = clientVars.chainPresets.SLC;
        paramsList.innerText = '';
        multichain.getBlockchainParams((err, info) => {
            if (err) {
                throw err;
            }
            params.forEach((val) => {
                el = clientDOM.newEl('li', '', '', paramsList, val + ' = ' + info[val]);
            });
        });
    },
};

generalInfoContent();

const display = () => {
    giFunctions.displayInfo();
    giFunctions.displayBlockchainParams();
};


const gatherDetails= () => {
    var paramsFile = path.join(clientVars.chains, chainName, 'params.dat');
    var configFile = path.join(clientVars.chains, chainName, 'multichain.conf');
    var chainName,nodeAddress
};

