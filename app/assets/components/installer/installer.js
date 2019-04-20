const { shell } = require('electron');
const replace = require('replace-in-file');
const remote = require('electron').remote;


// Default chain params
var defaultParams = [
    'anyone-can-connect = false',
    'anyone-can-send = false',
    'anyone-can-receive = false',
    'anyone-can-receive-empty = true',
    'anyone-can-create = false',
    'anyone-can-issue = false',
    'anyone-can-mine = false',
    'anyone-can-activate = false',
    'anyone-can-admin = false',
];

// Create DOM
const instDOM = () => {
    clientDOM.appendTop('div', 'content', 'w3-content w3-card-4 w3-container w3-center w3-padding-32 w3-margin-top w3-display-container');
    clientDOM.newEl('span', 'instCloseBtn', 'w3-button w3-hover-red w3-display-topright', content, 'X');
    clientDOM.newEl('h1', '', '', content, `Let's create a blockchain!`);
    clientDOM.newEl('input', 'chainNameInput', 'w3-input w3-twothird', content);
    chainNameInput.type = 'text';
    chainNameInput.placeholder = 'Enter a name for your blockchain';
    clientDOM.newEl('button', 'createChainBtn', 'w3-btn w3-round-large w3-ripple w3-border w3-green', content, 'Create');
    clientDOM.newEl('hr', '', '', content, '');
    clientDOM.newEl('div', 'paramsContainer', 'w3-center w3-container', content, '');
    clientDOM.newEl('h3', '', '', paramsContainer, 'Blockchain parameters');
    clientDOM.newEl('p', '', '', paramsContainer, '(click true or false to switch value)');
    clientDOM.newEl('ul', 'displayParams', 'w3-ul', paramsContainer, '');
    clientDOM.newEl('button', 'applySettingsBtn', 'w3-btn w3-round-large w3-ripple w3-border w3-blue', content, 'Apply and Restart');
};
instDOM();

// DOM related functions
const instFunc = {  

    create: () => {
        let chainName = chainNameInput.value;
        clientDOM.insertBefore('h3', 'chainTitle', '', paramsContainer, 2);
        chainTitle.textContent = chainName;
        clientFunc.create(chainName);
        setTimeout(() => {            
            instFunc.showParams();
        }, 3000);
    },

    showParams: () => {        
        defaultParams.forEach((val) => {
            el = clientDOM.newEl('li', '', '', displayParams, val);
            el.addEventListener('click', instFunc.changeParams);
        });
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
            from: [
                /anyone-can-connect = false/g,
                /anyone-can-send = false/g,
                /anyone-can-receive = false/g,
                /anyone-can-receive-empty = true/g,
                /anyone-can-create = false/g,
                /anyone-can-issue = false/g,
                /anyone-can-mine = false/g,
                /anyone-can-activate = false/g,
                /anyone-can-admin = false/g
            ],
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
            }            
        });
        shell.openExternal(paramsFile); 
        // remote.app.relaunch();
        // remote.app.quit();                    
    },
};

// Check if Multichain is installed
//passsing directoryPath and callback function
createChainBtn.addEventListener('click', instFunc.create);
applySettingsBtn.addEventListener('click', instFunc.applyParams);
//
