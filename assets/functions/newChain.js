// 
// 
// 
const replace = require('replace-in-file');
const shell = require('electron').shell;
const remote = require('electron').remote;
const sn = require('./sideNav');
const ci = require('./chainInit'); 
const exec = require('child_process').execFile; 


const start = (chainName) => exec(paths.multichainPath + '/multichaind.exe', [chainName, '-daemon']);
const createChain = (chainName) => exec(paths.multichainPath + '/multichain-util.exe', ['create', chainName]);

const newChain = () => {
    let chainName = chainNameInput.value;
    createChain(chainName);
    setTimeout(() => {
        let chainPath = path.join(paths.chains, chainName);
        showParams(chainPath);
        sn();
    }, 3000);

}
const changeParams = () => {
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
};

const showParams = () => {
    chainTitle.textContent = '';
    displayParams.innerHTML = '';

    let chainName = chainNameInput.value;
    chainTitle.textContent = chainName;

    ci.chainPresets.SLC.forEach((val) => {
        el = dom.newEl(displayParams, 'li', '', '', val);
        el.addEventListener('click', changeParams);
    });
};

const applyParams = () => {
    // Array of new settings
    var newParams = [];
    var x = displayParams.querySelectorAll('li');
    x.forEach((val => {
        newParams.push(val.textContent);
    }));
    // Path to params file
    var name = chainTitle.textContent;
    var paramsFile = path.join(paths.chains, name, 'params.dat');

    // find/replace text in document 
    const options = {
        files: paramsFile,
        from: ci.chainPresets.replace,
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
            start(name);
            remote.app.relaunch();
            remote.app.quit();
        }
    });

};


createChainBtn.addEventListener('click', newChain);
applySettingsBtn.addEventListener('click', applyParams);

module.exports = start;
