// Streams section

const streamElements = () => {
    // headers
    clientDOM.newEl('h3', '', '', Streams, `Stream Management`);
    el = clientDOM.newEl('h5', '', '', Streams, `Select a stream`);  

    // Stream actions bar
    clientDOM.newEl('div', 'streamActions', 'w3-bar', Streams);

    // Select a stream
    let cls = 'w3-bar-item w3-btn w3-dark-gray w3-margin-left';
    clientDOM.newEl('select', 'streamNamesSelect', 'w3-input w3-third', streamActions);

    // Stream Action buttons
    clientDOM.newEl('button', 'streamSubscribe', cls, streamActions, 'Subscribe');
    clientDOM.newEl('button', 'streamPublish', cls, streamActions, 'Publish');
    clientDOM.newEl('button', 'streamCreate', cls, streamActions, 'Create');

    // Input name for a new stream
    clientDOM.newEl('input', 'newStreamName', 'w3-input w3-third', streamActions);
    newStreamName.placeholder = 'New stream name';

    // Display area for stream details and filters
    clientDOM.newEl('div', 'streamFilters', 'w3-bar w3-padding w3-container', Streams);

    // Publishers
    clientDOM.newEl('select', 'streamPublishers', 'w3-half w3-input', streamFilters);
    el = clientDOM.newEl('option', '', '', streamPublishers, 'Publishers');
    el.setAttribute('selected', '');

    // Keyword search
    clientDOM.newEl('select', 'streamKeys', 'w3-half w3-input', streamFilters);
    el = clientDOM.newEl('option', '', '', streamKeys, 'Keyword search');
    el.setAttribute('selected', '');

    // Stream content
    clientDOM.newEl('div', 'streamContent', 'w3-container', Streams);

    // Chat modal
    clientDOM.newEl('div', 'chatModal', 'w3-modal  w3-center w3-card-4 w3-border w3-padding', Streams);
    clientDOM.newEl('div', 'chatModalContent', 'w3-modal-content w3-center', chatModal);
    clientDOM.newEl('h3', '', 'w3-center', chatModalContent, 'Publish new content');
    clientDOM.newEl('input', 'streamItemKeys', 'w3-input w3-center w3-border', chatModalContent);
    streamItemKeys.style.width = '300px';
    streamItemKeys.placeholder = 'only 1 key at a time...for now.';
    clientDOM.newEl('textarea', 'chatInput', 'w3-left w3-margin-bottom', chatModalContent);
    chatInput.placeholder = 'Inner Text';
    chatInput.cols = '60';
    chatInput.rows = '10';
    chatInput.placeholder = 'Add your content';
    clientDOM.newEl('div', 'chatModalFooter', 'w3-center w3-padding-bottom', chatModalContent);
    clientDOM.newEl('button', 'streamPost', 'w3-btn', chatModalFooter,'Submit');
    clientDOM.newEl('button', 'streamPostCloseBtn', 'w3-btn', chatModalFooter,'Close');
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
                streamFunctions.newStreamItem(val, i, itemPublisher[i]);
                clientDOM.newEl('option', '', '', streamPublishers, itemPublisher[i]);
                clientDOM.newEl('option', '', '', streamKeys, itemKeys[i]);
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
        el = clientDOM.appendTop('div', 'streamItem' + i, 'w3-panel w3-gray w3-margin-top', streamContent);
        el2 = clientDOM.newEl('h5', '', '', el);
        el2.textContent = 'Content:';
        el2 = clientDOM.newEl('p', '', '', el);
        el2.textContent = tx;
        el2 = clientDOM.newEl('h6', '', '', el);
        el2.textContent = 'Publisher:';
        el2 = clientDOM.newEl('p', '', '', el);
        el2.textContent = pub;
    }
};
// List streams
streamFunctions.listStreams();

streamNamesSelect.addEventListener('change', streamFunctions.listStreamItems);
streamSubscribe.addEventListener('click', streamFunctions.subscribe);
streamCreate.addEventListener('click', streamFunctions.createStream);
streamPublish.addEventListener('click', show = () => {
    w3.show('#chatModal');
});
streamPostCloseBtn.addEventListener('click', show = () => {
    w3.hide('#chatModal');
});
streamPost.addEventListener('click',streamFunctions.postChat);


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
