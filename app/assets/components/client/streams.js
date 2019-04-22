// Streams section
const streamContent = () => {
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

    // Stream item display
    clientDOM.newEl(Streams, 'div', 'itemsDisplay', 'w3-container');    
};
streamContent();
// setTimeout(() => {
    
// }, 200);




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
