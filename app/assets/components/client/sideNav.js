// 
// 
// const chainList = require('./../assets/functions/connect.js');

const sideContent = () => {

    clientDOM.newEl(clientBody, 'div', 'sideNav', 'sidenav w3-display-container');
    clientDOM.newEl(sideNav, 'div', 'sideNavBody', 'w3-padding');
    clientDOM.newEl(sideNavBody, 'span', 'closeSideNav', 'w3-bar-item fas fa-times w3-large w3-button w3-display-topright w3-white');    
    clientDOM.newEl(sideNavBody, 'h2', '', 'w3-white w3-center', 'Local Chains');
    clientDOM.newEl(sideNavBody, 'ul', 'chainUL', 'w3-ul w3-border');
    clientDOM.newEl(sideNavBody, 'br');
    clientDOM.newEl(sideNavBody, 'input', 'newConnection', 'w3-input w3-border');
    newConnection.placeholder = 'Paste nodeaddress';
    clientDOM.newEl(sideNavBody, 'button', 'connectBtn', 'w3-button w3-block w3-white', 'Connect');    
    clientDOM.newEl(sideNavBody, 'br');
    clientDOM.newEl(sideNavBody, 'button', 'createChain', 'w3-button w3-block w3-white', 'Create chain');
    createChain.setAttribute('onclick', 'w3.show("#createChainModal")');

    //
};
sideContent();
// setTimeout(() => {
    
// }, 200);




