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

var currentStream;


// display functions
var listSubscriptions = () => {
    multichain.listStreams((err, res) => {
        res.forEach((val) => {
            if(val.subscribed){
                console.log('Subscribed to ' + val.name);
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

var listStreamKeyItems = (stream, key) => {
    multichain.listStreamKeyItems({
        stream: stream,
        key: key
    }, (err, res) => {
        if (err) {
            alert('No items in this stream');
        } else {
            res.forEach((val) => {

            });
            console.log(res)
            console.log(`Keys: ${res[0].keys}`)
            console.log(`Publishers: ${res[0].publishers}`)
            console.log(`Post: ${res[0].data.text}`)
            console.log(`Blocktime: ${res[0].blocktime}`)
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

const streamFunctions = {
    // working
    createStream: () => {
        var x = document.querySelector('#newStreamName').value;
        if (x === '') {
            alert('No name given');
            return
        } else {
            multichain.create({
                type: "stream",
                name: x,
                open: false
            });
            streamFunctions.listStreams();
        }
    },

    listStreams: () => {
        multichain.listStreams((err, res) => {
            streamNamesSelect.innerHTML = '';
            let arrs = Object.values(res);
            let streamNames = [];

            arrs.forEach((val) => {
                let values = Object.values(val);
                streamNames.push(values[0]);                               
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
        itemsDisplay.innerHTML = '';
        let publishers = [];
        let keys = [];
    
        multichain.listStreamItems({
            stream: stream
        }, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                res.forEach((val, i) => {
                    el1 = clientDOM.appendTop(itemsDisplay, 'div', `card${i}`,'w3-panel w3-margin w3-card-4');                
                    clientDOM.newEl(el1, 'h3', ``,'',`Post: ${val.data.text}`)
                    clientDOM.newEl(el1, 'p', ``,'',`Publishers: ${val.publishers}`);
                    clientDOM.newEl(el1, 'p', ``,'',`Keys: ${val.keys}`); 
                    
                    if (!(publishers.includes(val.publishers))) {
                        publishers.push(val.publishers); 
                        clientDOM.newEl(streamPublishers, 'option', '', '',val.publishers);                       
                    }                    
                    
                    if (!(keys.includes(val.keys))) {
                        keys.push(val.keys);  
                        clientDOM.newEl( streamKeys, 'option', '', '',val.keys);                        
                    }               
                });  
            }
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

Streamsbtn.addEventListener('click', streamFunctions.listStreams);
streamNamesSelect.addEventListener('change', streamFunctions.listStreamItems);
streamSubscribe.addEventListener('click', streamFunctions.subscribe);
streamCreate.addEventListener('click', streamFunctions.createStream);
streamPublish.addEventListener('click', () => {
    w3.show('#streamPostModal');
});
streamPost.addEventListener('click', streamFunctions.postChat);
streamPostCloseBtn.addEventListener('click', () => {
    w3.hide('#streamPostModal');
});