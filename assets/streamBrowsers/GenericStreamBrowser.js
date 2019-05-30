// 
//
const {
    shell
} = require('electron');

let stream;
let newPostKeyInputs = newPostKeys.querySelectorAll('input');



const postGenericItem = () => {
    let k = [];
    newPostKeyInputs.forEach(val => {
        if (val.value !== '') {
            dom.notIncluded(k, val.value);
        }
    });
    k.push('All');
    stream = genericStreamBrowserTitle.textContent;
    let post = newPostInput.value;
    if (post !== '') {
        multichain.publish({
            stream: stream,
            key: k,
            data: {
                text: newPostInput.value
            }
        },
            (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.log(res);
                listGenericItems(streamItemCount.value)
            });
        return;
    }
    newPostInput.value = '';
    newPostInput.placeholder = 'No input given';
};
const optFilters = (arr, parent) => {
    parent.innerHTML = '';
    dom.newOp(arr, parent);
};

const genericItems = (arr) => {
    genericStreamsList.innerHTML = '';
    arr.forEach((val, i) => {
        dom.appendTop(genericStreamsList, 'p', '', 'w3-card w3-padding w3-white', val);
    });
};

const listGenericItems = (newCount) => {
    let files = [];
    let publishers = [];
    let keys = [];
    let txid = [];
    stream = genericStreamBrowserTitle.textContent;
    if (newCount === '' || newCount === undefined) {
        count = 100;
    } else {
        count = Number(newCount);
    }
    multichain.listStreamItems({
        stream: stream,
        count: count
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(val => {
            files.push(val.data.text);
            dom.notIncluded(txid, val.txid);
            val.keys.forEach(key => {
                dom.notIncluded(keys, key);
            })
            val.publishers.forEach(pub => {
                dom.notIncluded(publishers, pub);
            });
        });
        optFilters(publishers, genericStreamPublishers);
        optFilters(keys, genericStreamKeys);
        optFilters(txid, genericStreamTXID);
        genericItems(files);
    });
};


const filterByKey = (key) => {
    if (key === 'all') {
        listGenericItems();
        return;
    }
    genericStreamsList.innerHTML = '';
    multichain.listStreamKeyItems({
        stream: stream,
        key: key
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(val => {
            dom.appendTop(genericStreamsList, 'p', '', 'w3-card w3-padding w3-white', val.data.text);
            console.log(val.data.text);
            // f.push(val.data.text);
            // dom.notIncluded(tx, val.txid);
            // val.keys.forEach(key => {
            //     dom.notIncluded(k, key);
            // })
            // val.publishers.forEach(pub => {
            //     dom.notIncluded(p, pub);
            // });
        });
        // optFilters(p, streamPublishers);
        // optFilters(k, streamKeys);
        // optFilters(tx, streamTXID);
        // genericItems(f);
    });
};

newPostInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
        postGenericItem();
    }
});

streamItemCount.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"        
        listGenericItems(streamItemCount.value);
    }
});
genericStreamKeys.addEventListener("change", () => {
    filterByKey(genericStreamKeys.value);
});
module.exports = {
    listGenericItems,
};