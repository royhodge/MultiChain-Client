// display functions
// Call this to build global chain info object
let newChain = {
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
};

const getInfo = () => {
    multichain.getInfo((err, info) => {
        if (err) {
            console.log(err);
        }
        newChain.nodeAddress = info.nodeaddress;
        newChain.version = info.version;
        getBlockchainParams();
    });
};
const getBlockchainParams = () => {
    multichain.getBlockchainParams((err, info) => {
        let str = 'anyone-can-';
        if (err) {
            console.log(err);
        }
        // Resolves an object        
        newChain.name = info['chain-name'];
        newChain.params.activate = info[`${str}activate`];
        newChain.params.admin = info[`${str}admin`];
        newChain.params.connect = info[`${str}connect`];
        newChain.params.create = info[`${str}create`];
        newChain.params.send = info[`${str}send`];
        newChain.params.issue = info[`${str}issue`];
        newChain.params.receive = info[`${str}receive`];
        newChain.params.receiveEmpty = info[`${str}receive-empty`];
        newChain.params.mine = info[`${str}mine`];

        getAddresses();
    });
};
// Addresses
const getAddresses = () => {
    multichain.getAddresses((err, info) => {
        if (err) {
            console.log(err);
        }
        info.forEach((val) => {
            dom.notIncluded(newChain.addresses, val)
        });
        listStreams();
    });
};
const listStreams = () => {
    multichain.listStreams((err, info) => {
        if (err) {
            console.log(err);
        } else {
            info.forEach((val) => {
                let obj = {
                    name: val.name,
                    keys: val.keys
                }
                newChain.streams.push(obj)
            });
        }
    });
};
const getChainInfo = () => {
    getInfo();
    chainList.push(newChain);
};
module.exports = getChainInfo;