// 
// 
let newItems = [];
let currentItems = [];
let publishList = [];
let listLength = '';

connect('Share')
// File functons
// I want to make these into async functions

// get list of current items
let getItems = setInterval(() => {
    multichain.listStreamItems({
        stream: 'IPFS'
    }, (err, res) => {
        if (err) {
            dom.fadeIn(loadingModal)
            console.log(err.message);
            autoSubscribe('IPFS');
            return;
        }
        clearInterval(getItems)
        dom.fadeOut(loadingModal)
        res.forEach(val => {
            let details = JSON.parse(val.data.text);
            currentItems.push(details);
        });
        console.log(currentItems);
    });
}, 300);
// Create Dropzone
dropFiles.ondragover = dropFiles.ondrop = (ev) => {
    ev.preventDefault();
};

// Step 1....get file details
const getFileDetails = () => {
    document.ondrop = (ev) => {
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            let {
                name,
                path,
                size,
                type,
                lastModifiedDate
            } = ev.dataTransfer.files[i];
            let obj = {
                name: name,
                path: path,
                type: type,
                size: Math.round(size / 1024),
                lastModifiedDate: lastModifiedDate,
            };
            listLength = ev.dataTransfer.files.length;
            newItems.push(obj);
        }
        newItems.forEach(val => {
            fs.readFile(val.path, (err, res) => {
                if (err) {
                    dom.newEl(listDisplay, 'li', '', '');
                    dom.newEl(el, 'a', ``, '', `${val.name}  ---  ${val.size}KB`);
                    return;
                }
                dom.newEl(listDisplay, 'li', '', '');
                dom.newEl(el, 'a', ``, '', `${val.name}  ---  ${val.size}KB`);
            });
        })
        fileBox.textContent = 'Next, add files to IPFS';
        ipfs.classList.add('w3-green', 'tada');
        ev.preventDefault();
    };
};

// step 2.....add to IPFS
const pinHash = (hash, name) => {
    execFile('ipfs', ['pin', 'add', hash], (err, res) => {
        if (err) {
            console.log(err);
        }
        dom.newEl(listDisplay, 'li', '', '', name)
        dom.newEl(listDisplay, 'li', '', '', res)
        fileBox.textContent = 'Now publish hashish to Multichain';
        mcPublish.classList.add('w3-green', 'tada');
    });
};
const getString = (res) => {
    let start = res.lastIndexOf('Qm');
    let stop = start + 46;
    let hash = res.slice(start, stop);
    let name = res.slice(stop)
    pinHash(hash, name);
    return hash;
};
const getFileHash = (path, num) => {
    execFile('ipfs', ['add', path], (err, res) => {
        if (err) throw err;
        console.log(res)
        let hash = getString(res);
        newItems[num].hash = hash;
    });
};
const getFolderHash = (path, num) => {
    execFile('ipfs', ['add', path, '-r'], (err, res) => {
        if (err) throw err;
        console.log(res)
        let hash = getString(res);
        newItems[num].hash = hash;
    });
};
const addToIPFS = () => {
    listDisplay.innerHTML = '';
    newItems.forEach((val, i) => {
        fs.readFile(val.path, (err, res) => {
            if (err) {
                val.type = 'folder'
                getFolderHash(val.path, i, );
                return;
            }
            val.type = 'file'
            getFileHash(val.path, i);
        });
    });
    ipfs.classList.remove('w3-green');
    dom.newEl(dropFiles, 'input', 'keyInput', 'w3-input');
    el.placeholder = 'Add custom keys for this content. Seperate values with ","'
};

// Step 3....check if items are duplicate
const isDuplicate = () => {
    let newHash = newItems.map(val => val.hash);
    let oldHash = currentItems.map(val => val.hash)

    newHash.forEach((val, i) => {
        if (!(oldHash.includes(val))) {
            publishList.push(newItems[i])
        }
    });
};

// step 4 ..... publish to blockchain
const publish = (fileDetails, name) => {
    let keysInput = keyInput.value;
    let keys = keysInput.split(",")
    if (keysInput === '') {
        keys = 'show'
    }
    multichain.publish({
            stream: 'IPFS',
            key: "show " + keys,
            data: {
                text: fileDetails,
            }
        },
        (err, info) => {
            if (err) {
                console.log(err);
                return;
            }
            dom.newEl(listDisplay, 'li', '', '', name)
            dom.newEl(listDisplay, 'li', '', '', info)
            console.log(info)
        });
}

const publishHash = () => {
    // let classList = ;

    reload.classList.forEach(val => {
        if (val === 'w3-green') {
            console.log('Please refresh')
            return;
        }
    })

    isDuplicate()

    publishList.forEach((val, i) => {
        let obj = {
            name: val.name,
            hash: val.hash,
            path: val.path,
            type: val.type,
            size: val.size,
            lastModified: val.lastModifiedDate,
        }
        let fileDetails = JSON.stringify(obj);
        listDisplay.innerHTML = '';
        publish(fileDetails, val.name);
    });
    fileBox.textContent = 'Well done. Please refresh to app to continue';
    mcPublish.classList.remove('w3-green');
    reload.classList.add('w3-green', 'pulse');
};

// Event listeners
ipfs.addEventListener('click', addToIPFS);

mcPublish.addEventListener('click', publishHash);

reload.addEventListener('click', () => {
    window.location.reload();
});
closeWindow.addEventListener('click', () => {
    window.close();
});

dropFiles.addEventListener('drop', () => {
    getFileDetails();
});