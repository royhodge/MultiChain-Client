// 
// 
// const chainList = require('./../assets/functions/connect.js');

const sideContent = () => {

    clientDOM.newEl(clientBody, 'div', 'sideNav', 'sidenav w3-display-container');
    clientDOM.newEl(sideNav, 'div', 'sideNavBody', 'w3-padding');
    clientDOM.newEl(sideNavBody, 'span', 'closeSideNav', 'w3-bar-item fas fa-times w3-large w3-button w3-display-topright w3-white');
    closeSideNav.setAttribute('onclick', 'sideMenuFunctions.closeNav()');
    clientDOM.newEl(sideNavBody, 'h2', '', 'w3-white w3-center', 'Local Chains');
    clientDOM.newEl(sideNavBody, 'ul', 'chainUL', 'w3-ul w3-border');

    //
};

sideContent();

const sideMenuFunctions = {
    openNav: () => {
        chainUL.innerHTML = '';
        document.getElementById("sideNav").style.width = "250px";
        clientVars.chainsList.forEach((val,i) => {
            el = clientDOM.newEl(chainUL, 'li', 'chain'+i, 'w3-white w3-block w3-button', val);
            el.addEventListener('click', sideMenuFunctions.selectChain);
            el.addEventListener('click', displayChainInfo);
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
    }
};