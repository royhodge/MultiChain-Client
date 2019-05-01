// 
const fs = require('fs');
const path = require('path');

let chains = path.join(process.env.APPDATA, 'Multichain');
let approotPath = path.resolve();
let assetsPath = path.join(approotPath, 'app/assets/');
let multichain;

const paths = {
    chains: chains,
    functionsPath: path.join(assetsPath, 'functions'),
    componentsPath: path.join(assetsPath, 'components'),
    multichainPath: path.join(approotPath, 'multichain')
};
// 
// Create a secure root chain for login credentials
// 
let home = {
    port: '',
    host: '127.0.0.1',
    user: 'multichainrpc',
    pass: '',
};

const readConfig = (chain) => {
    var configFile = path.join(paths.chains, chain, 'multichain.conf');
    fs.readFile(configFile, 'utf-8', (err, data) => {
        if (err) throw err;
        let x = data.indexOf('rpcpassword=');
        let start = x + 12;
        let stop = start + 44;
        home.pass = data.slice(start, stop);
    });
}

const readParams = (chain) => {
    // read params file to get rpc port
    var paramsFile = path.join(paths.chains, chain, 'params.dat');
    fs.readFile(paramsFile, 'utf-8', (err, data) => {
        if (err) throw err;
        let x = data.indexOf('default-rpc-port = ');
        let start = x + 19;
        let stop = start + 4;
        home.port = data.slice(start, stop);
    });
};

// read config file to get rpcpassword
const getCreds = (chain) => {
    readConfig(chain);
    readParams(chain);
};

getCreds('home');

let connect = setInterval(() => {
    // console.log('empty');
    if (home.port !== '') {        
        clearInterval(connect);
        multichain = require('multichain-node')(home);            
        chainInfo.getChainInfo();  
    }
}, 10);


let checkStatus = setInterval(() => {
    // console.log('offline');
    if (multichain !== undefined) {
        // console.log('multichain is online');
        clearInterval(checkStatus);
        multichain.getInfo((err, info) => {
            // console.log(info);             
            // console.log(chainInfo);             
        });        
    }
}, 10);





