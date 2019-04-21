// Streams section

const streamElements = () => {
    // headers
    clientDOM.newEl(Streams, 'h3', '', '', `Stream Management`);
    el = clientDOM.newEl(Streams, 'h5', '', '', `Select a stream`);

    // Stream actions bar
    clientDOM.newEl(Streams, 'div', 'streamActions', 'w3-bar');

    // Select a stream
    let cls = 'w3-bar-item w3-btn w3-dark-gray w3-margin-left';
    clientDOM.newEl(streamActions, 'select', 'streamNamesSelect', 'w3-input w3-third');

    // Stream Action buttons
    clientDOM.newEl(streamActions, 'button', 'streamSubscribe', cls, 'Subscribe');
    clientDOM.newEl(streamActions, 'button', 'streamPublish', cls, 'Publish');
    clientDOM.newEl(streamActions, 'button', 'streamCreate', cls, 'Create');

    // Input name for a new stream
    clientDOM.newEl(streamActions, 'input', 'newStreamName', 'w3-input w3-third');
    newStreamName.placeholder = 'New stream name';

    // Display area for stream details and filters
    clientDOM.newEl(Streams, 'div', 'streamFilters', 'w3-bar w3-padding w3-container');

    // Publishers
    clientDOM.newEl(streamFilters, 'select', 'streamPublishers', 'w3-half w3-input');
    el = clientDOM.newEl(streamPublishers, 'option', '', '', 'Publishers');
    el.setAttribute('selected', '');

    // Keyword search
    clientDOM.newEl(streamFilters, 'select', 'streamKeys', 'w3-half w3-input');
    el = clientDOM.newEl(streamKeys, 'option', '', '', 'Keyword search');
    el.setAttribute('selected', '');

    // Stream content
    clientDOM.newEl(Streams, 'div', 'streamContent', 'w3-container');

    // Chat modal
    clientDOM.newEl(Streams, 'div', 'chatModal', 'w3-modal  w3-center w3-card-4 w3-border w3-padding');
    clientDOM.newEl(chatModal, 'div', 'chatModalContent', 'w3-modal-content w3-center');
    clientDOM.newEl(chatModalContent, 'h3', '', 'w3-center', 'Publish new content');
    clientDOM.newEl(chatModalContent, 'input', 'streamItemKeys', 'w3-input w3-center w3-border');
    streamItemKeys.style.width = '300px';
    streamItemKeys.placeholder = 'only 1 key at a time...for now.';
    clientDOM.newEl(chatModalContent, 'textarea', 'chatInput', 'w3-left w3-margin-bottom');
    chatInput.placeholder = 'Inner Text';
    chatInput.cols = '60';
    chatInput.rows = '10';
    chatInput.placeholder = 'Add your content';
    clientDOM.newEl(chatModalContent, 'div', 'chatModalFooter', 'w3-center w3-padding-bottom');
    clientDOM.newEl(chatModalFooter, 'button', 'streamPost', 'w3-btn', 'Submit');
    clientDOM.newEl(chatModalFooter, 'button', 'streamPostCloseBtn', 'w3-btn', 'Close');
};
streamElements();

const streamFunctions = {

    createStream: () => {
        var x = document.querySelector('#newStreamName').value;
        multichain.create({
            type: "stream",
            name: x,
            open: false
        });
        streamFunctions.listStreams();
    },

    listStreams: () => {
        multichain.listStreams((err, res) => {
            streamNamesSelect.innerHTML = '';
            let arrs = Object.values(res);
            let streamNames = [];

            arrs.forEach((val) => {
                let values = Object.values(val);
                streamNames.push((values[0]));
            });

            clientDOM.newOp(streamNames, streamNamesSelect);
        });
    },

    subscribe: () => {
        let x = document.querySelector('#streamNamesSelect').value;
        multichain.subscribe({
            stream: x
        });
        streamFunctions.listStreamItems();
    },

    listStreamItems: () => {
        let stream = document.querySelector('#streamNamesSelect').value;
        streamContent.innerHTML = '';

        multichain.listStreamItems({
            stream: stream
        }, (err, res) => {
            if (err) {
                alert('You are not subcribed to that stream');
            }
            let arrs = Object.values(res);
            let itemContent = [];
            let itemPublisher = [];
            let itemKeys = [];

            arrs.forEach((val) => {
                let values = Object.values(val);
                itemContent.push((values[4].text));
                itemPublisher.push((values[0]));
                itemKeys.push((values[1]));
            });

            itemContent.forEach((val, i) => {
                streamFunctions.newStreamItem(itemPublisher[i], val, i);
                clientDOM.newEl(itemPublisher[i], 'option', '', '', streamPublisher);
                clientDOM.newEl(itemKeys[i], 'option', '', '', streamKeys);
            });
        });
    },

    postChat: () => {
        let stream = document.querySelector('#streamNamesSelect').value;
        let key = document.querySelector('#streamItemKeys').value;
        let tx = document.querySelector('#chatInput').value;
        multichain.publish({
            stream: stream,
            key: key,
            data: {
                text: tx
            }
        }, (err, res) => {
            if (err) {
                throw err;
            }
            streamFunctions.listStreamItems();
        });
    },

    newStreamItem: (tx, i, pub) => {
        el = clientDOM.appendTop(streamContent, 'div', 'streamItem' + i, 'w3-panel w3-gray w3-margin-top');
        el2 = clientDOM.newEl(el, 'h5');
        el2.textContent = 'Content:';
        el2 = clientDOM.newEl(el, 'p');
        el2.textContent = tx;
        el2 = clientDOM.newEl(el, 'h6');
        el2.textContent = 'Publisher:';
        el2 = clientDOM.newEl(el, 'p');
        el2.textContent = pub;
    }
};

streamNamesSelect.addEventListener('change', streamFunctions.listStreamItems);
streamSubscribe.addEventListener('click', streamFunctions.subscribe);
streamCreate.addEventListener('click', streamFunctions.createStream);
streamPublish.addEventListener('click', show = () => {
    w3.show('#chatModal');
});
streamPostCloseBtn.addEventListener('click', show = () => {
    w3.hide('#chatModal');
});
streamPost.addEventListener('click', streamFunctions.postChat);


var streamObject = {
    "websites": [{
        "author": "",
        "date": "",
        "links": {
            "https": "",
            "http": "",
            "ipfs": "",
            "dat": ""
        },
        "seeds": ""
    }]
};
