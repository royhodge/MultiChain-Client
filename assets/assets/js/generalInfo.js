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

    client.newEl('h3', '', '', Info, `General Info`);

    infoInfoArray.forEach((val) => {
        el = client.newEl('div', '', 'w3-padding w3-border', Info, val + ':');
        client.newEl('span', val + 'Display', 'w3-right', el);
    });
};

const giFunctions = {
    getInfo: () => {
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
    getBlockchainParams: () => {

        let params = [
            'anyone-can-connect',
            'anyone-can-create',
            'anyone-can-send',
            'anyone-can-receive',
            'anyone-can-admin',
            'anyone-can-activate'
        ];
        client.newEl('ul', 'paramsList', 'w3-ul w3-border', Info);
        multichain.getBlockchainParams((err, info) => {
            if (err) {
                throw err;
            }
            params.forEach((val) => {
                el = client.newEl('li', '', '', paramsList, val + ' = ' + info[val]);
            });
        });
    },
};

generalInfoContent();
giFunctions.getInfo();
giFunctions.getBlockchainParams();