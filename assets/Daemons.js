const { execFile } = require('child_process');

module.exports = {
    //      
    startMultichain: (chainName) => {
        return new Promise((resolve, reject) => {
            execFile('multichaind', [chainName, 'daemon'], (err, res) => {
                if (err) {
                    reject(err);
                }                
                resolve(res);                
            });
        })
    },
    stopMultichain: (chainName) => {
        return new Promise((resolve, reject) => {           
            execFile('multichain-cli', [chainName, 'stop'], (err, res) => {
                if (err) {
                    reject(err);
                }                
                resolve(res);                
            });
        })
    },
    createChain: (chainName) => {
        return new Promise((resolve, reject) => {
            execFile('multichain-util', ['create', chainName], (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
    },
    startIPFS: () => {
        return new Promise((resolve, reject) => {
            execFile('ipfs', ['daemon'], (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })

    },    
};
