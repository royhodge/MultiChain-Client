// 
// Connect to first chain by default
let multichain = setTimeout(() => {     
    multichain = require('multichain-node')(clientVars.chainDB[0]);    
}, 160);


