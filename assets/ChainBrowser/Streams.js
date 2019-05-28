// 
// 
// 
const {
    getStreamItems,
    showKeyFilters
} = require('./FileBrowser');

const subscribeStream = (sub) => {
    let str = event.target.id;
    let stream = str.slice(0, -3);

    switch (sub) {
        case true:
            multichain.unsubscribe({
                stream: stream
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                listStreams();
            });
            break;
        default:
            multichain.subscribe({
                stream: stream
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                listStreams();
            });
            break;
    }
};
const listStreamItems = (stream, sub) => {
    if (!(sub)) {
        alert('You are not subscribed to this stream \n\n To subscribe, click "Subscribed');
        return;
    }
    filesList.innerHTML = '';
    FileBrowserTitle.textContent = stream;
    dom.openTabs('FileBrowser', 'tab');
    switch (stream) {
        case 'IPFS':
            console.log(activeChain);
            getStreamItems(stream);
            showKeyFilters();
            break;
        case 'root':
            filesList.textContent = 'This is the root stream. You should not publish anything here.';
            break;
        default:
            filesList.textContent = 'There are no items in this stream. Feature to add different kinds of input coming soon!!';
            break;
    }
};
const streamCard = (name, items, keys, sub, details) => {

    let card = dom.newEl(streamsDisplay, 'div', '', 'streamCard w3-card-4 w3-round-large w3-margin');
    let header = dom.newEl(card, 'h1', name + 'Stream', 'cardHeader', name);
    header.addEventListener('click', () => {
        dom.openTabs('FileBrowser', 'section');
        listStreamItems(name, sub);
    });

    let body = dom.newEl(card, 'div', name + 'body', 'cardBody');
    dom.newEl(body, 'p', '', '', 'Items: ' + items);
    dom.newEl(body, 'p', '', '', 'Keys: ' + keys);

    dom.newEl(body, 'p', name + 'sub', '', 'Subscribed: ' + sub);
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
        subscribeStream(sub);
    });
    dom.newEl(body, 'p', '', '', 'Details:');
    dom.newEl(body, 'p', '', '', details);
};
const listStreams = () => {
    return new Promise((resolve, reject) => {
        multichain.listStreams((err, res) => {
            if (err) {
                reject(err);
            }
            streamsDisplay.innerHTML = '';
            res.forEach((val, i) => {
                streamCard(val.name, val.items, val.keys, val.subscribed, val.details.text)
            });
            resolve(res);
        });

    })

};
Streamsbtn.addEventListener('click', () => {   
    dom.openTabs('Streams', 'section');
    listStreams();
});
createStreamBtn.addEventListener('click', () => {
    newStream();
});

const newStream = () => {
    var streamName = newStreamName.value;
    if (streamName === '') {
        newStreamName.placeholder = 'No name given';
        newStreamName.classList.add('w3-border', 'w3-border-red');
        return;
    }
    let isOpen;
    switch (streamOpen.value) {
        case 'Open':
            isOpen = true;
            break;
        default:
            isOpen = false;
            break;
    }
    multichain.create({
        type: 'stream',
        name: streamName,
        open: isOpen,
        details: {
            text: streamDetails.value
        }
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        dom.fadeOut(newStreamModal);
        listStreams()
    });
};

module.exports = listStreams;