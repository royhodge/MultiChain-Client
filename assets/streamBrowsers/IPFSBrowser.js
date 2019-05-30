// 
//
const { shell } = require('electron');
const { addFiles } = require('../Windows');
const { execFile } = require('child_process');

const IPFSItemFilter = (arr, parent) => {
    parent.innerHTML = '';
    dom.newOp(arr, parent);
};

const listIPFSPublishers = (arr) => {
    IPFSstreamPublishers.innerHTML = '';
    dom.newOp(arr, IPFSstreamPublishers);
};

const IPFSItems = (arr) => {
    IPFSfilesList.innerHTML = '';
    arr.forEach((val, i) => {
        let details = JSON.parse(val.text);
        let item = dom.newEl(IPFSfilesList, 'p', '', 'IPFSlistItem w3-card w3-padding w3-white', details.name);
        item.addEventListener('click', () => shell.openExternal(`http://127.0.0.1:8080/ipfs/${details.hash}`));        
    });
};

const listIPFSFiles = () => {
    let f = [];
    let k = [];
    let p = [];
    let tx = [];
    multichain.listStreamItems({
        stream: 'IPFS'
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(val => {
            dom.notIncluded(tx, val.txid);
            val.keys.forEach(key => {
                console.log(key);
                dom.notIncluded(k, key);
            })
            val.publishers.forEach(pub => {
                dom.notIncluded(p, pub);
            });
            f.push(val.data);
        });
        IPFSItems(f);
        IPFSItemFilter(p, IPFSstreamPublishers);
        IPFSItemFilter(k, IPFSstreamKeys);
        IPFSItemFilter(tx, IPFSstreamTXID);
    });
};

addToIPFSBtn.addEventListener("click", () => {
    addFiles();
})

module.exports = {
    listIPFSFiles,
};