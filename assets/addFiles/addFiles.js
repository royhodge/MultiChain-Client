const { remote } = require('electron');
const { execFile } = require('child_process');

let newItems = [];
let currentItems = [];
let publishList = [];

// File functons
// I want to make these into async functions
// Create Dropzone
dropFiles.ondragover = dropFiles.ondrop = (ev) => {
    ev.preventDefault();
};
// Step 1....get file details
const getFileDetails = () => {
    document.ondrop = (ev) => {
        ipfs.classList.add('w3-green', 'tada');
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            let { name, path, size, type, lastModifiedDate } = ev.dataTransfer.files[i];
            let obj = {
                name: name,
                path: path,
                type: type,
                size: Math.round(size / 1024),
                lastModifiedDate: lastModifiedDate,
            };
            newItems.push(obj);
        }
        newItems.forEach(val => {
            fs.readFile(val.path, (err, res) => {
                if (err) {
                    dom.newEl(listDisplay, 'li', '', 'w3-green');
                    dom.newEl(el, 'a', ``, '', val.name);
                    return;
                }
                dom.newEl(listDisplay, 'li', '', 'w3-blue');
                dom.newEl(el, 'a', ``, '', val.name);
            });
        })
        fileBox.textContent = 'Next, add files to IPFS';
        ev.preventDefault();
    };
};
// and current stream items
const getStreamItems = () => {
    multichain.listStreamItems({ stream: 'IPFS Files' }, (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(val => {
            let details = JSON.parse(val.data.text);
            currentItems.push(details);
        });
    });
}

// step 2.....add to IPFS
const pinHash = (hash) => {
    execFile('ipfs', ['pin', 'add', hash], (err, res) => {
        if (err) {
            console.log(err);
        }
        htmlConsole.style.display = 'block'
        dom.newEl(htmlConsole, 'p', '', '', res)
        fileBox.textContent = 'Now publish hashish to Multichain';
        mcPublish.classList.add('w3-green', 'tada');
    });
};
const getString = (res) => {
    let start = res.lastIndexOf('Qm');
    let stop = start + 46;
    let hash = res.slice(start, stop);
    pinHash(hash);
    return hash;
};
const getFileHash = (path, num) => {
    execFile('ipfs', ['add', path], (err, res) => {
        if (err) throw err;
        let hash = getString(res);
        newItems[num].hash = hash;
    });
}
const getFolderHash = (path, num) => {
    execFile('ipfs', ['add', path, '-r'], (err, res) => {
        if (err) throw err;
        let hash = getString(res);
        newItems[num].hash = hash;
    });
}
const addToIPFS = () => {
    newItems.forEach((val, i) => {
        fs.readFile(val.path, (err, res) => {
            if (err) {
                getFolderHash(val.path, i);
                return;
            }
            getFileHash(val.path, i);
        });
    });
    ipfs.classList.remove('w3-green');
};

// Step 3....check if items are duplicate
const isDuplicate = () => {
    let filenames = newItems.map(val => val.name);
    let streamNames = currentItems.map(val => val.name)

    filenames.forEach((val, i) => {
        if (!(streamNames.includes(val))) {
            publishList.push(newItems[i])
        }
    })
};

// step 4 ..... publish to blockchain
const publish = (fileDetails) => {
    multichain.publish({
        stream: 'IPFS Files',
        key: 'show',
        data: {
            text: fileDetails,
        }
    },
        (err, info) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(info)
        });
}

const publishHash = () => {
    let list = listDisplay.querySelectorAll('li');
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
        publish(fileDetails);
        htmlConsole.style.display = 'none'
        // list.forEach((li, i) => {
        //     if (li.textContent === val.name) {
        //         console.log(li.textContent)
        //         console.log(val.name)
        //         console.log(listDisplay.childNodes[i])
        //         listDisplay.removeChild(listDisplay.childNodes[i])

        //     }
        // })

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
    getStreamItems()
});

