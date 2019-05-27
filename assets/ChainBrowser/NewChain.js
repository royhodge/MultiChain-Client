//
//
//
const replace = require('replace-in-file');
const remote = require('electron').remote;
const {
    chainPresets
} = require('./ChainPresets');
const {
    createChain,
    startMultichain
} = require('../Daemons');

let presetBtns = presetChain.querySelectorAll('.chainIcon');

const newChain = () => {
    let chainName = chainNameInput.value;
    let chainPath = path.join(chainsPath, chainName);
    createChain(chainName)
        .then(res => {
            console.log('then')
            console.log(res)
            showParams(chainPath);
        })
        .catch(err => {
            console.log(err)
        })
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

    chainPresets.SLC.forEach((val) => {
        el = dom.newEl(displayParams, 'li', '', '', val);
        el.addEventListener('click', changeParams);
    });
};
const applyParams = (arr, name) => {   
    // Path to params file   
    var paramsFile = path.join(chainsPath, name, 'params.dat');
    // find/replace text in document
    const options = {
        files: paramsFile,
        from: chainPresets.replace,
        to: [
            arr[0],
            arr[1],
            arr[2],
            arr[3],
            arr[4],
            arr[5],
            arr[6],
            arr[7],
            arr[8],
        ],
    };

    replace(options, async (error, changes) => {
        if (error) {
            return console.error('Error occurred:', error);
        } else {
            // show params file in text editor for developers           
            location.reload()
            console.log(changes);
        }
    });
};
const applyUserParams = () => {
    // Array of new settings
    var name = chainTitle.textContent;
    var newParams = [];
    var x = displayParams.querySelectorAll('li');
    x.forEach((val => {
        newParams.push(val.textContent);
    }));
    applyParams(newParams, name);
};

const createPreset = (preset, chainName) => {
    if (chainName === '') {
        presetNameInput.value = 'No name given';
        presetNameInput.classList.add('w3-border', 'w3-border-red');
        return;
    }
    createChain(chainName)
        .then(() => {
            switch (preset) {
                case 'SLC':
                    applyParams(chainPresets.SLC, chainName);
                    break;
                case 'SPC':
                    applyParams(chainPresets.SPC, chainName);
                    break;
                case 'OPC':
                    applyParams(chainPresets.OPC, chainName);
                    break;
                default:
                    break;
            }
        })
        .catch(err => {
            console.log(err);
        });
};

createNewChainBtn.addEventListener('click', newChain);
applySettingsBtn.addEventListener('click', applyUserParams);
newChainModalClose.addEventListener('click', () => {
    dom.fadeOut(createChainModal);
});

presetBtns.forEach((val => {
    let stop = val.id.indexOf('-');
    let preset = val.id.slice(0, stop);
    val.addEventListener('click', () => {
        let name = presetNameInput.value;
        createPreset(preset, name);
    });
}));