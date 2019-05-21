// 
// 
// 
const IPFSStreamKeyItems = require('./FileBrowser');

const subscribeStream = (sub) => {
    let str = event.target.id;
    let stream = str.slice(0, -3);

    switch (sub) {
        case true:
            multichain.unsubscribe({ stream: stream }, (err, res) => {
                if (err) { console.log(err) }
                listStreams();
            });
            break;
        default:
            multichain.subscribe({ stream: stream }, (err, res) => {
                if (err) { console.log(err) }
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
        case 'IPFS Files':
            IPFSStreamKeyItems(stream, 'show');
            break;
        case 'root':
            filesList.textContent = 'This is the root stream. You should not publish anything here.';
            break;
        default:
            filesList.textContent = 'There are no items in this stream. Feature to add different kinds of input coming soon!!';
            break;
    }
};
const streamCard = (name, items, keys, sub) => {

    let card = dom.newEl(streamsDisplay, 'div', '', 'streamCard w3-card-4 w3-round-large w3-margin');
    let header = dom.newEl(card, 'h1', name + 'Stream', 'cardHeader', name);
    header.addEventListener('click', () => {
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
};
const listStreams = () => {
    multichain.listStreams((err, res) => {
        streamsDisplay.innerHTML = '';
        res.forEach((val, i) => {
            streamCard(val.name, val.items, val.keys, val.subscribed)
        });
    });
};
Streamsbtn.addEventListener('click', listStreams);

const newStream = () => {
    var streamName = streamSearch.value;
    if (streamName === '') {
        streamSearch.placeholder = 'No name given';
        streamSearch.classList.add('w3-red');
        return;
    }
    multichain.create({ type: 'stream', name: streamName, open: false }, (err, res) => {
        if (err) { console.log(err); }
        listStreams()
    });
};
streamCreate.addEventListener('click', newStream);



module.exports = listStreams;
