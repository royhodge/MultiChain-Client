// 
// 
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

    infoInfoArray.forEach((val) => {
        el = clientDOM.newEl(Info, 'div', '', 'w3-padding w3-border', val + ':');
        clientDOM.newEl(el, 'span', val + 'Display', 'w3-right');
    });
    clientDOM.newEl(Info, 'ul', 'paramsList', 'w3-ul w3-border');
   
};

const giFunctions = {
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

        let params = clientVars.chainPresets.SLC;
        paramsList.innerText = '';
        multichain.getBlockchainParams((err, info) => {
            if (err) {
                throw err;
            }
            console.log(info)
            params.forEach((val) => {
                el = clientDOM.newEl(paramsList, 'li', '', '', val);
            });
        });
    },
};

const displayChainInfo = () => {    
    giFunctions.displayInfo();
    giFunctions.displayBlockchainParams();
};

generalInfoContent();





