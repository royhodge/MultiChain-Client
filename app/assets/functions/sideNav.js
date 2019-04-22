// 
// 
// 
const sideMenuFunctions = {
    openNav: () => {
        chainUL.innerHTML = '';
        document.getElementById("sideNav").style.width = "250px";
        clientVars.chainsList.forEach((val,i) => {
            el = clientDOM.newEl(chainUL, 'li', 'chain'+i, 'w3-white w3-block w3-button', val);
            el.addEventListener('click', sideMenuFunctions.selectChain);
            el.addEventListener('click', giFunctions.displayChainInfo);
            el.addEventListener('click', streamFunctions.listStreams);
            el.addEventListener('click', sideMenuFunctions.closeNav);
            
        });
    },

    closeNav: () => {
        document.getElementById("sideNav").style.width = "0";    
    },

    selectChain: () => {
        let str = event.target.id;
        let e = str.slice(5);               
        multichain = require("multichain-node")(clientVars.chainDB[e]);         
    },
    connect: () => {
        let add = newConnection.value;
        console.log(add);
        clientFunc.start(add);
    }
};

closeSideNav.addEventListener('click',sideMenuFunctions.closeNav);
connectBtn.addEventListener('click',sideMenuFunctions.connect);