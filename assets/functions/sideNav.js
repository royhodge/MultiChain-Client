const gi = require('./generalInfo');
const st = require('./streams');
const nc = require('./newChain');
const remote = require('electron').remote;

let sideNav = document.querySelector('#sideNav');
let closeSideNav = sideNav.querySelector('#closeSideNav');
let chainUL = sideNav.querySelector('#chainUL');
let connectBtn = sideNav.querySelector('#connectBtn');

closeSideNav.addEventListener('click', () => {
    sideNav.style.width = '0px';
});
connectBtn.addEventListener('click', () => {
    let add = document.querySelector('#newConnection').value;
    console.log(add)
    nc(add);
    setTimeout(() => {
        remote.app.relaunch();
        remote.app.quit();
    }, 3000);

});

let connectionList = []

const newChain = (name) => {
    let el = dom.newEl(chainUL, 'div', `${name}Row`, 'w3-white');
    dom.newEl(el, 'div', `${name}Chain`, 'chain w3-button w3-rest', name);
    dom.newEl(el, 'div', `${name}Del`, 'tabNavs w3-button fas fa-times w3-red w3-right');
};

const chainBtns = () => {
    chainUL.innerHTML = '';
    fs.readdir(chains, (err, stat) => {
        if (err) {
            console.log(err);
        } else {
            stat.forEach((val) => {
                if (!(val.includes("."))) {
                    newChain(val);
                    getCreds(val);
                }
            });
        }
    });
};

const getCreds = (chain) => {
    let creds = {
        port: '',
        host: '127.0.0.1',
        user: 'multichainrpc',
        pass: '',
    };
    var configFile = path.join(paths.chains, chain, 'multichain.conf');
    fs.readFile(configFile, 'utf-8', (err, data) => {
        if (err) throw err;
        let x = data.indexOf('rpcpassword=');
        let start = x + 12;
        let stop = start + 44;
        creds.pass = data.slice(start, stop);
    });

    // read params file to get rpc port
    var paramsFile = path.join(paths.chains, chain, 'params.dat');
    fs.readFile(paramsFile, 'utf-8', (err, data) => {
        if (err) throw err;
        let x = data.indexOf('default-rpc-port = ');
        let start = x + 19;
        let stop = start + 4;
        creds.port = data.slice(start, stop);
    });
    connectionList.push(creds)
};

chainBtns();

setTimeout(() => {
    let list = sideNav.querySelectorAll('.chain');
    list.forEach((val, i) => {
        getCreds(val.textContent);
        val.addEventListener('click', () => {
            multichain = require("multichain-node")(connectionList[i]);
            setTimeout(() => {
                gi.displayInfo();
                gi.displayBlockchainParams();               
            }, 150);
        });
    });

}, 100);

// let watchChains = setInterval(() => {
//     console.log('Waiting');
//     if (connectionList.length === 7) {
//         clearInterval(watchChains);
//     }
// }, 10);

module.exports = chainBtns;





