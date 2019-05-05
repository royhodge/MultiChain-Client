//
//
//
const replace = require('replace-in-file');
const shell = require('electron').shell;
const remote = require('electron').remote;
const ci = require('./chainInit');


let chainUL = document.querySelector('#chainUL');


const newChain = () => {
    let chainName = chainNameInput.value;
    createChain(chainName);
    setTimeout(() => {
        let chainPath = path.join(chainsPath, chainName);
        showParams(chainPath);
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
    var paramsFile = path.join(chainsPath, name, 'params.dat');

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
            // show params file in text editor for developers
            // shell.openExternal(paramsFile);
            remote.app.relaunch();
            remote.app.quit();
        }
    });
};


createChainBtn.addEventListener('click', newChain);
applySettingsBtn.addEventListener('click', applyParams);
