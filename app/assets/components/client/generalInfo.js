// 
// 
// General Variables
const generalInfoContent = () => {
    let infoInfoArray = [
        'Username',
        'Chainname',
        'Version',
        'NodeAddress',
        'OS',
        'Parameters'
    ];   

    infoInfoArray.forEach((val) => {
        el = clientDOM.newEl(Info, 'div', '', 'w3-padding w3-border', val + ':');
        clientDOM.newEl(el, 'span', val + 'Display', 'w3-right');
    });
    clientDOM.newEl(Info, 'ul', 'paramsList', 'w3-ul w3-border');
   
};
generalInfoContent();






