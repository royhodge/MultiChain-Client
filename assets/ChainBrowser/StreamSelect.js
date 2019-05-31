// 
// 
// 
const { listIPFSFiles } = require('../streamBrowsers/IPFSBrowser');
const { listGenericItems } = require('../streamBrowsers/GenericStreamBrowser');

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
        comingSoonModal.style.display = 'flex';
        comingSoonHeader.textContent = 'You are not subscribed to this stream. To subscribe, click "Subscribed"';
        return;
    }
    switch (stream) {
        case 'IPFS':
            dom.openTabs('IPFSFileBrowser', 'section');
            IPFSFileBrowserTitle.textContent = stream;
            listIPFSFiles();
            break;
        default:
            dom.openTabs('genericStreamBrowser', 'section');
            genericStreamsList.innerHTML = '';
            genericStreamBrowserTitle.textContent = stream;
            listGenericItems();
            break;
    }
};

const newStream = (streamName) => {

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
            errorModal.style.display = 'flex';
            errorHeader.textContent = err.message;
        }
        dom.fadeOut(newStreamModal);
        listStreams()
    });
};
const streamCard = (name, items, keys, sub, details) => {

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

    });

};

createStreamBtn.addEventListener('click', () => {
    var streamName = newStreamName.value;
    newStream(streamName);
});

streamCreate.addEventListener('click', () => {
    presetStreamIcons.innerHTML = '';
    switch (Infobtn.textContent) {
        case 'Share':
            dom.newEl(presetStreamIcons, 'i', 'IPFSIcon', 'streamIcon fas fa-share-alt');
            IPFSIcon.addEventListener('click', () => {
                newStream('IPFS');
            });
            break;
        case 'Passwords':
            dom.newEl(presetStreamIcons, 'i', 'PasswordsIcon', 'streamIcon fas fa-lock');
            PasswordsIcon.addEventListener('click', () => {
                comingSoonModal.style.display = 'flex';
            });
            break;
        case 'Contacts':
            dom.newEl(presetStreamIcons, 'i', 'AddressBookIcon', 'streamIcon fas fa-address-book');
            AddressBookIcon.addEventListener('click', () => {
                newStream('Address Book');
            });
            break;
        default:
            dom.newEl(presetStreamIcons, 'i', 'GenericForm', 'streamIcon fab fa-wpforms');
            GenericForm.addEventListener('click', () => {
                newStream('Generic');
            });
            break;
    }
    dom.fadeIn(newStreamModal);
});

streamSearch.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
        comingSoonModal.style.display = 'flex';
    }
});

module.exports = listStreams;