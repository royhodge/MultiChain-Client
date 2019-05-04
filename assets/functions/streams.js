// 
// 
// 

const itemQueries = {
    publishers: [],
    keys: [],
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
    var stream = returnStream();
    console.log(stream);
    multichain.listStreamItems({
        stream: stream,
        count: 100,
    }, (err, res) => {
        console.log(res.length);
    });
};
const listStreamItems = () => {
    itemsDisplay.innerHTML = '';
    let publishers = [];
    let keys = [];

    var stream = returnStream();

    multichain.listStreamItems({
        stream: stream,
        count: 100,
    }, (err, res) => {
        if (err) {
            dom.appendTop(itemsDisplay, 'div', ``, 'w3-panel w3-margin w3-card-4');
            dom.appendTop(el, 'h3', ``, '', err.message);
            return;
        } else {
            countStreamsItems();
            res.forEach((val, i) => {
                let el1 = dom.appendTop(itemsDisplay, 'div', `card${i}`, 'w3-panel w3-margin w3-card-4');
                dom.newEl(el1, 'h3', ``, '', `Post: ${val.data.text}`)
                dom.newEl(el1, 'p', ``, '', `Publishers: ${val.publishers}`);
                // dom.newEl(el1, 'p', ``, '', `Keys: ${val.keys}`); 
                notIncluded(itemQueries.publishers, val.publishers);
                notIncluded(itemQueries.keys, val.keys);
                dom.newOp(itemQueries.publishers,streamPublishers);
                dom.newOp(itemQueries.keys,streamKeys);
            });

        }
    });
};
const subscribe = () => {
    var stream = returnStream();
    multichain.subscribe({
        stream: stream
    });
    listStreams();
    listStreamItems();
};
const unsubscribe = () => {
    var stream = returnStream();
    multichain.unsubscribe({
        stream: stream
    });
    listStreams();
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
            console.log('subscribe')
            subscribe(x);
        }, 50);
        setTimeout(() => {
            listStreams();
        }, 60);
    }
};
const postChat = () => {
    var stream = returnStream();
    let tx = document.querySelector('#postInput').value;
    if (tx === '') {
        postInput.placeholder = 'No input!';
        postInput.classList.add('w3-red');
        return;
    }
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
let returnStream = () => {
    var x = streamSelect.value;
    var sl = x.indexOf('---') - 1;
    var stream = x.slice(0, sl);
    return stream;
};


const listStreamKeyItems = () => {
    var stream = returnStream();
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

var listStreamPublisherItems = () => {
    var stream = returnStream();
    publishers = streamPublishers.value;
    multichain.listStreamPublisherItems({
        stream: stream,
        publisher: publishers,
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


Streamsbtn.addEventListener('click', () => {
    setTimeout(() => {
        listStreams();
    }, 100);
    setTimeout(() => {
        listStreamItems();
    }, 150);
});

streamSelect.addEventListener('change', listStreamItems);
streamSubscribe.addEventListener('click', subscribe);
streamUnsubscribe.addEventListener('click', unsubscribe);
streamCreate.addEventListener('click', createStream);
streamPublish.addEventListener('click', postChat);

streamPublishers.addEventListener('change', listStreamPublisherItems)
streamKeys.addEventListener('change', listStreamKeyItems)
// display functions

module.exports = [listStreams, listStreamItems];






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
