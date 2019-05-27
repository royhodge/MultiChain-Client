// 
//
const {
    shell
} = require('electron');

let currentItems = [];
let filteredItems = [];

const isDuplicate = () => {
    let newHash = filteredItems.map(val => val.hash);
    let oldHash = currentItems.map(val => val.hash)

    newHash.forEach((val, i) => {
        if (!(oldHash.includes(val))) {
            publishList.push(newItems[i])
        }
    })
};

const streamItems = (arr) => {
    filesList.innerHTML = '';
    arr.forEach((val, i) => {
        let details = JSON.parse(val.data.text);
        let item = dom.newEl(filesList, 'li', '', 'listItem', details.name);
        item.addEventListener('click', () => shell.openExternal(`http://127.0.0.1:8080/ipfs/${details.hash}`));
    });
}

const IPFSStreamKeyItems = () => {
    let key = streamKeyFiltersSelect.value
    console.log(key);
    multichain.listStreamKeyItems({
        stream: 'IPFS',
        key: key,
        count: 100,
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(res);
        streamItems(res)
    });
};

const getStreamItems = () => {
    multichain.listStreamItems({
        stream: 'IPFS'
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        streamItems(res)
    });
}

const showKeyFilters = () => {
    multichain.listStreamKeys({
        stream: 'IPFS'
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        let keys = res.map(val => val.key);
        dom.newOp(keys, streamKeyFiltersSelect)
    });
}

streamKeyFiltersSelect.addEventListener('change', IPFSStreamKeyItems)



module.exports = {
    showKeyFilters,
    getStreamItems
};