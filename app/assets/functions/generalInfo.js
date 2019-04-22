// 
// 
// 
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
    displayChainInfo: () => {    
        giFunctions.displayInfo();
        giFunctions.displayBlockchainParams();
    },
};

setTimeout(() => {
    giFunctions.displayChainInfo();
}, 200);