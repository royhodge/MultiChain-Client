// 
// 
// 



let chainDB = [
    {
        name: 'Private',
        Params: { port: 6310, host: '127.0.0.1', user: "multichainrpc", pass: "4X8Mh3G78zsnCE9tyroyzWRf9VSit8MYcrYKJ2jqscpA" }
    },
];


let multichain = require("multichain-node")(chainDB[0].Params);


// // Used to 


// fs.readdir(mcpath, function (err, files) {
//     //handling error
//     if (err) {
//         installerModal.style.display = 'block';
//     } else {
//         connectModal.style.display = 'block';
//         //listing all files using forEach      
//         for (i = 0; i < files.length; i++) {
//             if (files[i].includes('multichain.conf') === false) {
//                 client.newEl('li', files[i] + 'id', 'chains', localChains, files[i]);
//             }
//         }
//     }
// });
