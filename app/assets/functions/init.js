// 
// 
// Create array of local chains 
//  Figure out why it takes 150ms to load variables into array....
fs.readdir(clientVars.chains, (err, stat) => {
    stat.forEach(val => {
        if (!(val.includes("."))) {
            clientVars.chainsList.push(val);
            return clientVars.chainsList;
        }
    });
});

// Create connection objects of local chains 
// These are used later to require multichain
setTimeout(() => {
    // These are generic settings.
    // in production or secure app, there should be handled with encryption 
    // and a login form
    clientVars.chainsList.forEach((val) => {
        let newChain = {
            port: '',
            host: '127.0.0.1',
            user: 'multichainrpc',
            pass: '',
        };
        // read config file to get rpcpassword
        var configFile = path.join(clientVars.chains, val, 'multichain.conf');
        fs.readFile(configFile, 'utf-8', (err, data) => {
            if (err) throw err;
            let x = data.indexOf('rpcpassword=');
            let start = x + 12;
            let stop = start + 44;
            newChain.pass = data.slice(start, stop);
        });
        // read params file to get rpc port
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
