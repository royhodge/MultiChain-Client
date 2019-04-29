// 
const fs = require('fs');

const path = require('path');

let chains = path.join(process.env.APPDATA, 'Multichain');
let approotPath = path.resolve();
let assetsPath = path.join(approotPath, 'app/assets/');

const paths = {
    chains: chains,    
    functionsPath: path.join(assetsPath, 'functions'),
    componentsPath: path.join(assetsPath, 'components'),
    multichainPath: path.join(approotPath, 'multichain')
};
// 
// Create a secure root chain for login credentials
// 

let users = []

let passwords = [];

let home = {
    port: '',
    host: '127.0.0.1',
    user: 'multichainrpc',
    pass: '',
};
// read config file to get rpcpassword
const getCreds = (chain) => {
    var configFile = path.join(paths.chains, chain, 'multichain.conf');
    fs.readFile(configFile, 'utf-8', (err, data) => {
        if (err) throw err;
        let x = data.indexOf('rpcpassword=');
        let start = x + 12;
        let stop = start + 44;
        home.pass = data.slice(start, stop);
    });

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

getCreds('home');

const listUsers = () => {
    multichain.listStreamKeys({
        stream: 'root'
    }, (err, res) => {
        if (err) throw err;
        res.forEach((val) => {
            users.push(val.key);
        });

    });
};
const listPasswords = () => {
    multichain.listStreamItems({
        stream: 'root'
    }, (err, res) => {
        if (err) {
            console.log('No passwords');
        } else {
            res.forEach((val) => {
                passwords.push(val.data.text);
            });
        }
    });
};
const buildDB = () => {
    listUsers();
    listPasswords();
};

setTimeout(() => {
    multichain = require('multichain-node')(home);
}, 160);

setTimeout(() => {
    buildDB();
}, 500);


// Is online?
// let isOnline = () => {
//     fs.readdir(homePath, (err, stat) => {
//       if (!(stat.includes('multichain.pid'))) {
//         console.log("multichain is offline");
//         isOnline();
//       } else {

//       }
//     });
//   };




