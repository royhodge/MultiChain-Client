// 
// 
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');
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
let activeChain;

const quickPublish = (stream,keys,text) => {
    multichain.publish({
        stream: stream,
        key: keys,
        data: {
            text: text
        }
    },
        (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(res)
        });
};

const subscribe = (s) => {
    multichain.subscribe({
        stream: s,
    }, (err, info) => {
        console.log(info);
    });
};
const autoSubscribe = (n) => {
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

const connect = (chain) => {
    return new Promise((resolve,reject)=> {       
        loadingModal.style.display = 'block'; 
        let count = 0;       
        let interval = setInterval(() => {   
            count = count + 1;        
            multichain = require("multichain-node")(chainCreds[findChainCreds(chain)]);
            multichain.getInfo((err, info) => {
                if (err || info.chainname === undefined) {
                    if (count > 60) {
                        console.log('Something Has gone wrong. This chain is not connected');                        
                        clearInterval(interval);
                        loadingModal.style.display = 'none';
                    }
                    console.log(err.message);                    
                    reject(err.message);
                    return;
                }            
                clearInterval(interval);
                loadingModal.style.display = 'none';
                activeChain = info;
                resolve(info);               
            });
        }, 200);
    });
};

module.exports = connect;