// 
// 
const path = require('path');
const fs = require('fs');
const ChainInfo = require('../assets/ChainBrowser/ChainInfo');
let multichain, chainsPath;

switch (process.platform) {
    case 'win32':
        chainsPath = path.join(process.env.APPDATA, 'Multichain', '/');
        break;
    case 'linux':
        chainsPath = path.join(process.env.HOME, '.multichain', '/');
        break;
    default:
        // add paths for darwin. need help
        break;
}

let chainCreds = [];
let chainList = [];

const subscribe = (s) => {
    multichain.subscribe({
        stream: s,
    }, (err, info) => {
        console.log(info);
    });
};
const createStream = (n) => {
    multichain.create({
        type: 'stream',
        name: n,
        open: false,
    }, (err, info) => {
        if (err) {
            console.log(err.message);
        }
        subscribe(n);
    });
};

const getCreds = (chain) => {
    let creds = {
        port: '',
        host: '127.0.0.1',
        user: 'multichainrpc',
        pass: '',
        name: chain
    };

    var configFile = path.join(chainsPath, chain, 'multichain.conf');
    fs.readFile(configFile, 'utf-8', (err, data) => {
        if (err) throw err;
        let x = data.indexOf('rpcpassword=');
        let start = x + 12;
        let stop = start + 44;
        creds.pass = data.slice(start, stop);
    });

    // read params file to get rpc port
    var paramsFile = path.join(chainsPath, chain, 'params.dat');
    fs.readFile(paramsFile, 'utf-8', (err, data) => {
        if (err) throw err;
        let x = data.indexOf('default-rpc-port = ');
        let start = x + 19;
        let stop = start + 4;
        creds.port = data.slice(start, stop);
    });
    chainCreds.push(creds)
    return creds;
};

const findChainCreds = (chainName) => {
    let num;
    chainCreds.forEach((val, i) => {        
        if (val.name !== chainName) {            
            return;
        }
        num = i;       
    });
    return num;
};

fs.readdir(chainsPath, (err, stat) => {
    if (err) {
        console.log(err);
    }
    stat.forEach(val => {
        if (!(val.includes('.'))) {
            getCreds(val);
        }
    });
});

let connect = (chain) => {    
    let interval = setInterval(() => {
        multichain = require("multichain-node")(chainCreds[findChainCreds(chain)]);
        multichain.getInfo((err, info) => {
            if (err || info.chainname === undefined) { 
                console.log(err.message);
                return;
            }
            clearInterval(interval);             
            if (info.chainname === 'app') {
                createStream('IPFS Files');                 
            }
            console.log(info);
            ChainInfo();                     
        });        
    }, 200);
};

connect('app');
module.exports = connect;

