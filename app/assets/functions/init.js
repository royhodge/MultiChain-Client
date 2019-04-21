// 
// 
const fs = require('fs');

fs.readdir(clientVars.chains, (err, stat) => {
    stat.forEach(val => {
        if (!(val.includes("."))) {
            clientVars.chainsList.push(val);
            return clientVars.chainsList;
        }
    });
});

setTimeout(() => {

    clientVars.chainsList.forEach((val) => {
        let newChain = {
            port: '',
            host: '127.0.0.1',
            user: 'multichainrpc',
            pass: '',
        };

        var configFile = path.join(clientVars.chains, val, 'multichain.conf');
        fs.readFile(configFile, 'utf-8', (err, data) => {
            if (err) throw err;
            let x = data.indexOf('rpcpassword=');
            let start = x + 12;
            let stop = start + 44;
            newChain.pass = data.slice(start, stop);
        });

        var paramsFile = path.join(clientVars.chains, val, 'params.dat');
        fs.readFile(paramsFile, 'utf-8', (err, data) => {
            if (err) throw err;
            let x = data.indexOf('default-rpc-port = ');
            let start = x + 19;
            let stop = start + 4;
            newChain.port = data.slice(start, stop);
        });

        clientVars.chainDB.push(newChain);
    });    
}, 150);
