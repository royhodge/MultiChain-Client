// 
// 
// 
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