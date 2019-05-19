
const Windows = require('../assets/Windows');
const Connect = require('../assets/Connect');
const { shell } = require('electron');

console.log(Connect)
// 
// 
// 
const startIPFS = () => {
    execFile('ipfs', ['daemon'], (err, res) => {
        if (err) throw err;
        console.log(res);
    });
};

const checkStatus = () => {
    execFile('ipfs', ['id'], (err, res) => {
        if (err) {
            console.log('IPFS is offline....');
            checkStatus();
        };
        console.log(res);
    });
};

const addFolder = (folder) => {
    execFile('ipfs', ['add', folder, '-r'], (err, res) => {
        if (err) throw err;
        console.log(res);
        let start = res.lastIndexOf('Qm');
        let stop = res.lastIndexOf(' ');
        let hash = res.slice(start, stop);
        let hashName = res.slice(stop);
        dom.newEl(htmlConsole, 'h2', '', '', `Name: ${hashName}`);
        dom.newEl(htmlConsole, 'h4', '', '', `Hash: ${hash}`);
    });
};
const addFilePin = (file) => {
    let hash = '';

    execFile('ipfs', ['add', file], (err, res) => {
        if (err) throw err;
        console.log(res);
        let start = res.lastIndexOf('Qm');
        let stop = res.lastIndexOf(' ');
        hash = res.slice(start, stop);
        let hashName = res.slice(stop);
        dom.newEl(htmlConsole, 'h2', '', '', `Name: ${hashName}`);
        dom.newEl(htmlConsole, 'h4', '', '', `Hash: ${hash}`);
    });

    setTimeout(() => {
        execFile('ipfs', ['pin', 'add', hash], (err, res) => {
            if (err) {
                console.log(err);
            }
            dom.newEl(
                htmlConsole,
                'h4',
                '',
                '',
                `${hash} has been pinned recursively`);
        });
    }, 100);


};


const catHash = (hash) => {
    shell.openExternal(`http://127.0.0.1:8080/ipfs/${hash}`)
};

const ipfsHash = (hash, name) => {
    execFile('ipfs', ['get', '-o', name, hash], (err, res) => {
        if (err) throw err;
        console.log(res);
    });
};
const lsHash = (hash) => {
    execFile('ipfs', ['ls', hash], (err, res) => {
        if (err) throw err;
        console.log(res);
    });
};
const refHash = (hash) => {
    execFile('ipfs', ['refs', hash], (err, res) => {
        if (err) throw err;
        console.log(res);
    });
};
const localHash = (hash) => {
    execFile('ipfs', ['refs', 'local'], (err, res) => {
        if (err) throw err;
        console.log(res.length);
    });
};
