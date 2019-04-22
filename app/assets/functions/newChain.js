// 
// 
// 
const replace = require('replace-in-file');
const shell = require('electron').shell;

const instFunc = {

    start: chain => exec('./multichain/multichaind.exe', [chain, '-daemon']),

    stop: chain => exec('./multichain/multichain-cli.exe', [chain, 'stop']),

    create: () => {
        let chainName = chainNameInput.value;
        clientFunc.create(chainName);
        setTimeout(() => {
            let chainPath = path.join(clientVars.chains, chainName);
            instFunc.showParams(chainPath);
            sideMenuFunctions.openNav();
        }, 3000);

    },

    changeParams: () => {
        var x = event.target;
        var tx = x.textContent;
        var tr = /true/gi;
        var fl = /false/gi;

        if (tx.includes('false')) {
            var txt = (tx.replace(fl, 'true'));
            x.textContent = txt;
        }

        if (tx.includes('true')) {
            var txt = (tx.replace(tr, 'false'));
            x.textContent = txt;
        }
    },

    showParams: () => {
        chainTitle.textContent = '';
        displayParams.innerHTML = '';

        let chainName = chainNameInput.value;
        chainTitle.textContent = chainName;

        clientVars.chainPresets.SLC.forEach((val) => {
            el = clientDOM.newEl(displayParams, 'li', '', '', val);
            el.addEventListener('click', instFunc.changeParams);
        });
    },

    applyParams: () => {
        // Array of new settings
        var newParams = [];
        var x = displayParams.querySelectorAll('li');
        x.forEach((val => {
            newParams.push(val.textContent);
        }));
        // Path to params file
        var name = chainTitle.textContent;
        var paramsFile = path.join(clientVars.chains, name, 'params.dat');

        // find/replace text in document 
        const options = {
            files: paramsFile,
            from: clientVars.chainPresets.replace,
            to: [
                newParams[0],
                newParams[1],
                newParams[2],
                newParams[3],
                newParams[4],
                newParams[5],
                newParams[6],
                newParams[7],
                newParams[8],
            ],
        };

        replace(options, (error, changes) => {
            if (error) {
                return console.error('Error occurred:', error);
            } else {
                shell.openExternal(paramsFile);
                sideMenuFunctions.openNav();
                clientFunc.start(name);
            }

        });

    },
};

// Check if Multichain is installed
//passsing directoryPath and callback function
createChainBtn.addEventListener('click', instFunc.create);
applySettingsBtn.addEventListener('click', instFunc.applyParams);
//
