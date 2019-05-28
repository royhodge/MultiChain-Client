// 
//
const {
    shell
} = require('electron');

let stream;

const optFilters = (arr, parent) => {
    parent.innerHTML = '';
    dom.newOp(arr, parent);
};

const genericItems = (arr) => {
    genericStreamsList.innerHTML = '';
    arr.forEach((val, i) => {
        dom.newEl(genericStreamsList, 'p', '', 'w3-card w3-padding w3-white', val);
    });
};

const listGenericItems = () => {
    let f = [];
    let k = [];
    let p = [];
    let tx = [];
    stream = genericStreamBrowserTitle.textContent;
    multichain.listStreamItems({
        stream: stream
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(res);
        res.forEach(val => {
            f.push(val.data.text);
            dom.notIncluded(tx, val.txid);
            val.keys.forEach(key => {
                dom.notIncluded(k, key);
            })
            val.publishers.forEach(pub => {
                dom.notIncluded(p, pub);
            });
        });
        optFilters(p, streamPublishers);
        optFilters(k, streamKeys);
        optFilters(tx, streamTXID);
        genericItems(f);
    });
};

genericStreamInput.addEventListener("keydown", (e) => {
    stream = genericStreamBrowserTitle.textContent;
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
        multichain.publish({
            stream: stream,
            key: 'generic',
            data: {
                text: genericStreamInput.value
            }
        },
            (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.log(res);
                listGenericItems()
            });
    }
});

module.exports = {
    listGenericItems,
};