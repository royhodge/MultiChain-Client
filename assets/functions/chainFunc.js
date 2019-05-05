// 
// 
// 
let chainInfo = {
    nodeAddress: '',
    name: '',
    version: '',
    params: {
        connect: '',
        admin: '',
        create: '',
        issue: '',
        send: '',
        receive: '',
        receiveEmpty: '',
        activate: '',
        mine: '',
    },
    peers: {},
    addresses: [],
    streams: [],
    getChainInfo: () => {
        getInfo();
        getBlockchainParams();
        listPermissions();
        getAddresses();
        listStreams();
    }

};

let chainPermissions = {
    admin: [],
    activate: [],
    connect: [],
    create: [],
    issue: [],
    send: [],
    receive: [],
    receiveEmpty: [],
    mine: [],
};

const notIncluded = (arr, str) => {
    if (!(arr.includes(str))) {
        arr.push(str);
    }
};

// display functions
// General
const getInfo = () => {
    multichain.getInfo((err, info) => {
        console.log(info)
        // if (err) {
        //     console.log('not ready yet...keep trying');
        //     loadingModal.style.display = 'flex';
        //     getInfo();
        // } else {
        //     // Resolves an object  
        //     console.log('Finally!!!')
        //     loadingModal.style.display = 'none';
        //     chainInfo.nodeAddress = info.nodeaddress;
        //     chainInfo.version = info.version;
        // }

    });
};
const getBlockchainParams = () => {
    multichain.getBlockchainParams((err, info) => {
        let str = 'anyone-can-';
        if (err) {
            getBlockchainParams();
        } else {
            // Resolves an object        
            chainInfo.name = info['chain-name'];
            chainInfo.params.activate = info[`${str}activate`];
            chainInfo.params.admin = info[`${str}admin`];
            chainInfo.params.connect = info[`${str}connect`];
            chainInfo.params.create = info[`${str}create`];
            chainInfo.params.send = info[`${str}send`];
            chainInfo.params.issue = info[`${str}issue`];
            chainInfo.params.receive = info[`${str}receive`];
            chainInfo.params.receiveEmpty = info[`${str}receive-empty`];
            chainInfo.params.mine = info[`${str}mine`];
        };

    });
};

const listPermissions = (a, p) => {
    multichain.listPermissions({
        addresses: a,
        permissions: p,
    }, (err, info) => {
        if (err) {
            getBlockchainParams();
        } else {
            info.forEach((val) => {
                switch (val.type) {
                    case 'admin':
                        notIncluded(chainPermissions.admin, val.address);
                        break;
                    case 'activate':
                        notIncluded(chainPermissions.activate, val.address);
                        break;
                    case 'connect':
                        notIncluded(chainPermissions.connect, val.address);
                        break;
                    case 'create':
                        notIncluded(chainPermissions.create, val.address);
                        break;
                    case 'send':
                        notIncluded(chainPermissions.send, val.address);
                        break;
                    case 'issue':
                        notIncluded(chainPermissions.issue, val.address);
                        break;
                    case 'receive':
                        notIncluded(chainPermissions.receive, val.address);
                        break;
                    case 'mine':
                        notIncluded(chainPermissions.mine, val.address);

                        break;
                }
            });
        }
    });
};
// Addresses
const getAddresses = () => {
    multichain.getAddresses((err, info) => {
        if (err) throw err;
        // Resolves an array
        info.forEach((val) => {
            if (!(chainInfo.addresses.includes(val))) {
                chainInfo.addresses.push(val);
            }
        });
    });
};
const listStreams = () => {
    multichain.listStreams((err, info) => {
        if (err) throw err;
        info.forEach((val) => {
            if (!(chainInfo.streams.includes(val.name))) {
                chainInfo.streams.push(val.name);
            }
        });
    });
};


// let getChainInfo = setInterval(() => {
//     console.log('Waiting to for multichain....');    
//     if (home.port !== '') {
//         clearInterval(getChainInfo);
//         chainInfo.getChainInfo()
//     }
// }, 10);




// Actions
// Permissions
const grant = (a, p) => {
    multichain.grant({
        addresses: a,
        permissions: p,
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};
const revoke = (a, p) => {
    multichain.revoke({
        addresses: a,
        permissions: p,
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};
const grantFrom = (from, to, p) => {
    multichain.grantFrom({
        from: from,
        to: to,
        permissions: p,
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};

// Addresses
const getNewAddress = () => {
    multichain.getNewAddress({
        verbose: false,
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};

// Streams
const create = (n) => {
    multichain.create({
        type: 'stream',
        name: n,
        open: false,
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};

const publish = (s, k, tx) => {
    multichain.publish({
        stream: s,
        key: k,
        data: {
            text: tx
        },
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};

const subscribe = (s) => {
    multichain.subscribe({
        stream: s,
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};

const unsubscribe = (s) => {
    multichain.unsubscribe({
        stream: s,
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};


module.exports = chainInfo;