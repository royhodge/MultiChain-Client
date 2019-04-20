
// Main body section
clientDOM.appendTop('div', 'clientBody', 'w3-content w3-card-4');

// Main nav
clientDOM.newEl('nav', 'tabNav', 'w3-bar w3-teal w3-card-4', clientBody);

clientDOM.newEl('section', 'sectionDisplay', '', clientBody);

let sectionArray = [
    'Info',
    'Streams',
    'Assets',
    'Addresses',
    'Peers',
    'Wallet',
];

sectionArray.forEach((val) => {
    clientDOM.newEl('div', val, 'tab w3-container w3-hide', sectionDisplay);
    el = clientDOM.newEl('a', '', 'w3-bar-item w3-button', tabNav, val);    
    el.href = `#${val}`;
    el.setAttribute('onclick', `clientDOM.openTabs('${val}','tab')`);
});

clientDOM.newEl('button', 'startBtn','w3-btn w3-right',tabNav,'Start');
startBtn.addEventListener('click',function() {
    clientFunc.start('private');    
});
