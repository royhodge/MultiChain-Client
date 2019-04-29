// 
// 
// 
const streamQueries = {
    Publishers: [],
    StreamKeys: [],
    ItemCount: [],
};

const itemQueries = {
    Publishers: [],
    itemKeys: [],
    itemData: [],
    postDate: [],
};

let streamSelect = document.querySelector('#streamSelect');
let newStreamName = document.querySelector('#newStreamName');
let streamPublishers = document.querySelector('#streamPublishers');
let streamKeys = document.querySelector('#streamKeys');
let stream = streamSelect.value;
let publishers = streamPublishers.value;
let key = streamKeys.value;

const listStreams = () => {
    multichain.listStreams((err, res) => {
        streamSelect.innerHTML = '';
        res.forEach((val, i) => {
            dom.newEl(streamSelect, 'option', '', 'w3-border w3-border-green', val.name + ' --- ' + val.subscribed);
        });
    });
};
const countStreamsItems = () => {
    var stream = streamSelect.value;
    multichain.listStreamItems({
        stream: stream
    }, (err, res) => {
    });
};
const listStreamItems = () => {
    itemsDisplay.innerHTML = '';
    let publishers = [];
    let keys = [];

    var stream = returnStr();

    multichain.listStreamItems({
        stream: stream
    }, (err, res) => {
        if (err) {
            console.log(err.message)
            dom.appendTop(itemsDisplay, 'div', ``, 'w3-panel w3-margin w3-card-4');
            dom.appendTop(el, 'h3', ``, '', err.message);
            return;
        } else {
            console.log(res)
            countStreamsItems();
            res.forEach((val, i) => {
                let el1 = dom.appendTop(itemsDisplay, 'div', `card${i}`, 'w3-panel w3-margin w3-card-4');
                dom.newEl(el1, 'h3', ``, '', `Post: ${val.data.text}`)
                dom.newEl(el1, 'p', ``, '', `Publishers: ${val.publishers}`);
                // dom.newEl(el1, 'p', ``, '', `Keys: ${val.keys}`);              

                if (!(publishers.includes(val.publishers))) {
                    publishers.push(val.publishers);
                    dom.newEl(streamPublishers, 'option', '', '', val.publishers);
                }

                if (!(keys.includes(val.keys))) {
                    keys.push(val.keys);
                    dom.newEl(streamKeys, 'option', '', '', val.keys);
                }
            });
        }
    });
};
const subscribe = () => {
    var stream = returnStr();
    multichain.subscribe({
        stream: stream
    });
    listStreamItems();
};
const unsubscribe = () => {
    var stream = returnStr();
    multichain.unsubscribe({
        stream: stream
    });
    listStreamItems();
};
const createStream = () => {
    var x = newStreamName.value;
    if (x === '') {
        newStreamName.placeholder = 'No name given';
        newStreamName.classList.add('w3-red');
        return;
    } else {
        create(x);
        setTimeout(() => {
            listStreams();
        }, 20);
    }
};
const postChat = () => {
    var stream = returnStr();
    let tx = document.querySelector('#postInput').value;
    multichain.publish({
        stream: stream,
        key: '',
        data: {
            text: tx
        }
    }, (err, res) => {
        if (err) {
            throw err;
        }
        listStreamItems();
    });
};

let returnStr = () => {
    var x = streamSelect.value;
    var sl = x.indexOf('---') - 1;
    var stream = x.slice(0, sl);
    return stream;
};




Streamsbtn.addEventListener('click', () => {
    setTimeout(() => {
        listStreams();
    }, 200);
    setTimeout(() => {
        listStreamItems();
    }, 250);
});

streamSelect.addEventListener('change', listStreamItems);
streamSubscribe.addEventListener('click', subscribe);
streamUnsubscribe.addEventListener('click', unsubscribe);
streamCreate.addEventListener('click', createStream);
streamPublish.addEventListener('click', postChat);
// display functions

module.exports = [listStreams, listStreamItems]


const listSubscriptions = () => {
    multichain.listStreams((err, res) => {
        res.forEach((val) => {
            if (val.subscribed) {
                console.log('Subscribed to ' + val.name);
                console.log(`Restrictions: ${res[0].restrict.write}`)
            } else {
                console.log('Not subscribed to ' + val.name);
            }
        });
        // console.log(res.length)
        // console.log(`Name: ${res[0].name}`)
        // console.log(`Itemcount: ${res[0].items}`)
        // console.log(`Keyscount: ${res[0].keys}`)
        // console.log(`Subscribed: ${res[0].subscribed}`)
        // console.log(`Restrictions: ${res[0].restrict.write}`)
        // console.log(`Createtxid: ${res[0].createtxid}`)

    });
};

const listStreamKeyItems = () => {
    stream = streamSelect.value;
    key = streamKeys.value
    multichain.listStreamKeyItems({
        stream: stream,
        keys: key
    }, (err, res) => {
        if (err) {
            alert('No items in this stream');
        } else {
            res.forEach((val) => {

            });
            console.log(res)
            console.log(`Keys: ${res[0].keys}`)
            // console.log(`Publishers: ${res[0].publishers}`)
            // console.log(`Post: ${res[0].data.text}`)
            // console.log(`Blocktime: ${res[0].blocktime}`)
        }
    });
};

var listStreamPublisherItems = (stream, pub) => {
    multichain.listStreamPublisherItems({
        stream: 'new',
        publisher: 'new',
    }, (err, res) => {
        if (err) {
            alert('No items in this stream');
        } else {
            res.forEach((val) => {

            });
            console.log(res)

        }
    });
};


// // Stream

// const listStreamItems = (s) => {
//     multichain.listStreamItems({
//         stream: s
//     }, (err, info) => {
//         if (err) throw err;
//         // Resolves an array
//         // console.log(JSON.stringify(info));
//         console.log(info);
//     });
// };
// const getStreamItem = (s, t) => {
//     multichain.getStreamItem({
//         stream: s,
//         txid: t,
//     }, (err, info) => {
//         if (err) throw err;
//         // Resolves an array
//         // console.log(JSON.stringify(info));
//         console.log(info);
//     });
// };
// const listStreamKeys = (s) => {
//     multichain.listStreamKeys({
//         stream: s
//     }, (err, info) => {
//         if (err) throw err;
//         console.log(info);
//     });
// };
