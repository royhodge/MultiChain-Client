const { execFile } = require('child_process');

module.exports = {
    //      
    startMultichain: (chainName) => {
        execFile('multichaind', [chainName, '-daemon'], (err, res) => {
            if (err) { console.log(err); }
            console.log(res);
        });
    },
    createChain: (chainName) => {
        execFile('multichain-util', ['create', chainName], (err, res) => {
            if (err) { console.log(err); }
            console.log(res);
        });

    },
    startIPFS: () => {
        execFile('ipfs', ['daemon'], (err, res) => {
            if (err) { console.log(err); }
            console.log(res);
        });
    },    
};
