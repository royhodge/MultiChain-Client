
// Main body section
client.appendTop('div', 'clientBody', 'w3-content w3-card-4');

// Main nav
client.newEl('nav', 'tabNav', 'w3-bar w3-teal w3-card-4', clientBody);

client.newEl('section', 'sectionDisplay', '', clientBody);

let sectionArray = [
    'Info',
    'Streams',
    'Assets',
    'Addresses',
    'Peers',
    'Wallet',
];

sectionArray.forEach((val) => {
    client.newEl('div', val, 'tab w3-container w3-hide', sectionDisplay);
    el = client.newEl('a', '', 'w3-bar-item w3-button', tabNav, val);    
    el.href = `#${val}`;
    el.setAttribute('onclick', `client.openTabs('${val}','tab')`);
});
