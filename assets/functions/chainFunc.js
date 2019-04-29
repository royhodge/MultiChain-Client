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


// display functions
// General
const getInfo = () => {
    multichain.getInfo((err, info) => {
        if (err) throw err;
        // Resolves an object  
        console.log(info);
        chainInfo.nodeAddress = info.nodeaddress;
        chainInfo.version = info.version;
    });
};
const getBlockchainParams = () => {
    multichain.getBlockchainParams((err, info) => {
        let str = 'anyone-can-';
        if (err) throw err;
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
    });
};

const listPermissions = (a, p) => {
    multichain.listPermissions({
        addresses: a,
        permissions: p,
    }, (err, info) => {
        if (err) throw err;
        info.forEach((val) => {
            switch (val.type) {
                case 'admin':
                    if (!(chainPermissions.admin.includes(val.address))) {
                        chainPermissions.admin.push(val.address);
                    }
                    break;
                case 'activate':
                    if (!(chainPermissions.activate.includes(val.address))) {
                        chainPermissions.activate.push(val.address);
                    }
                    break;
                case 'connect':
                    if (!(chainPermissions.connect.includes(val.address))) {
                        chainPermissions.connect.push(val.address);
                    }
                    break;
                case 'create':
                    if (!(chainPermissions.create.includes(val.address))) {
                        chainPermissions.create.push(val.address);
                    }
                    break;
                case 'send':
                    if (!(chainPermissions.send.includes(val.address))) {
                        chainPermissions.send.push(val.address);
                    }
                    break;
                case 'issue':
                    if (!(chainPermissions.issue.includes(val.address))) {
                        chainPermissions.issue.push(val.address);
                    }
                    break;
                case 'receive':
                    if (!(chainPermissions.receive.includes(val.address))) {
                        chainPermissions.receive.push(val.address);
                    }
                case 'mine':
                    if (!(chainPermissions.mine.includes(val.address))) {
                        chainPermissions.mine.push(val.address);
                    }
                    break;
            }
        });
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
        console.log(info);
        info.forEach((val) => {
            if (!(chainInfo.streams.includes(val.name))) {
                 chainInfo.streams.push(val.name);
            }           
        });
    });
};

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