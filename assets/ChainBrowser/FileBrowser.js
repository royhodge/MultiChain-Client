// 
//
const { shell } = require('electron');


const IPFSStreamKeyItems = (stream, key) => {

    multichain.listStreamKeyItems({
        stream: stream,
        key: key,
        count: 100,        
    }, (err, res) => {
        if (err) { console.log(err); }
        res.forEach((val, i) => {
            let details = JSON.parse(val.data.text);
            let item = dom.newEl(filesList, 'li', '', 'listItem', details.name);
            item.addEventListener('click', () => shell.openItem(`http://127.0.0.1:8080/ipfs/${details.hash}`));
        });

        // dom.notIncluded(hashish,details.hash);
        // dom.notIncluded(names,details.name);
        // dom.notIncluded(path,details.path);
        // dom.notIncluded(size,details.size);
        // dom.notIncluded(type,details.type);
        //     dom.newEl(item, 'p', '', '', details.size + ' KB');
        //     dom.newEl(item, 'p', '', '', details.path); 
        //     dom.newEl(item, 'p', '', '', details.hash);
        //     dom.newEl(item, 'p', '', '', details.type);
        // });
        // names.forEach((val, i) => { 
        //     let item = dom.newEl(filesList, 'li', '', 'listItem', val);
        //     item.addEventListener('click', () => shell.openItem(`http://127.0.0.1:8080/ipfs/${hashish[i]}`))
        // dom.newEl(item, 'p', '', '', size[i]);
        // dom.newEl(item, 'p', '', '', path[i]);
        // dom.newEl(item, 'p', '', '', hashish[i]);
        // dom.newEl(item, 'p', '', '', type[i]);
    });
};

const getStreamItems = () => {
    streamItems = [];
    multichain.listStreamItems({ stream: 'IPFS Files' }, (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(val => {
            let details = JSON.parse(val.data.text);
            streamItems.push(details);
        });    
    });
}

module.exports = IPFSStreamKeyItems;