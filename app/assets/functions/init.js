// 
// 
const fs = require('fs');
const replace = require('replace-in-file');
// First chain
const initFunctions = {
    setParams: (chainName, preset) => {
        // Path to params file   
        var paramsFile = path.join(clientVars.chains, chainName, 'params.dat');

        // find/replace text in document 
        const options = {
            files: paramsFile,
            from: clientVars.chainPresets.replace,
            to: preset
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
    chainInit: (chainName, params) => {    
        clientFunc.create(chainName);    
        initFunctions.setParams(chainName, params);    
        clientFunc.start(chainName); 
        connect(chainName);   
    }    

};

fs.readdir(clientVars.chains, (err, stat) => {
    if (err) {
        initFunctions.chainInit('root',clientVars.chainPresets.SLC);
    } else {
        clientFunc.start('root');
    }
  });

