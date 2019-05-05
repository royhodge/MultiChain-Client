//
const fs = require('fs');
const path = require('path');
const {
  exec,
  execFile
} = require('child_process');

let multichain, multichainexe, chainsPath, startChain, createChain;

let approotPath = path.resolve();

switch (process.platform) {
  case 'win32':
    multichainexe = path.join(approotPath, 'multichain', '/')
    chainsPath = path.join(process.env.APPDATA, 'Multichain', '/');
    startChain = (chainName) => execFile(multichainexe + 'multichaind.exe', [chainName, '-daemon'], (err, res) => {
      if (err) throw err
      console.log(res)
    });
    createChain = (chainName) => execFile(multichainexe + 'multichain-util', ['create', chainName], (err, res) => {
      if (err) throw err
      console.log(res)
    });
    break;
  case 'linux':
    multichainexe = process.env.NODE.replace('/bin/node', '/local/bin/')
    chainsPath = path.join(process.env.HOME, '.multichain');
    startChain = (chainName) => execFile(multichainexe + 'multichaind', [chainName, '-daemon'], (err, res) => {
      if (err) throw err
      console.log(res)
    });
    createChain = (chainName) => execFile(multichainexe + 'multichain-util', ['create', chainName], (err, res) => {
      if (err) throw err
      console.log(res)
    });
    break;
  default:
    // add paths for darwin. need help
    break;
}

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
  var configFile = path.join(chainsPath, chain, 'multichain.conf');
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
  var paramsFile = path.join(chainsPath, chain, 'params.dat');
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

fs.readdir(chainsPath, (err, stat) => {
  let chains = [];  
  stat.forEach((val) => {
    if (!(val.includes("."))) {
      chains.push(val)
    }
  });
  getCreds(chains[0]);
});



let connect = setInterval(() => {
  console.log('Waiting to connect....');
  loadingModal.style.display = 'flex'
  if (home.port !== '') {
    clearInterval(connect);
    loadingModal.style.display = 'none'
    multichain = require('multichain-node')(home);
  }
}, 10);