
// Main body section
clientDOM.appendTop(document.body,'div', 'clientBody');

// Main nav
clientDOM.newEl( clientBody,'nav', 'tabNav', 'w3-bar w3-teal w3-card-4');

// Section where other components are mounted
clientDOM.newEl(clientBody,'section', 'sectionDisplay');

// Basic chain aspects
let sectionArray = [
    'Info',
    'Streams',
    'Assets',
    'Addresses',
    'Peers',
    'Wallet',
];

// CLose button
clientDOM.newEl( tabNav,'span', 'openSideNav', 'w3-bar-item fas fa-bars w3-large w3-button w3-left');
openSideNav.setAttribute('onclick','sideMenuFunctions.openNav()');

// Div sections
sectionArray.forEach((val) => {
    clientDOM.newEl(sectionDisplay,'div', val, 'tab w3-container w3-hide w3-margin-top');
    el = clientDOM.newEl(tabNav,'a', '', 'w3-bar-item w3-button',  val);    
    el.href = `#${val}`;
    el.setAttribute('onclick', `clientDOM.openTabs('${val}','tab')`);
});



