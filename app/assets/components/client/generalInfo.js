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
    el = clientDOM.newEl(Info, 'h3');
    el.textContent = `General Chain Info`;   

    infoInfoArray.forEach((val) => {
        el = clientDOM.newEl(Info, 'div', '', 'w3-padding', val + ':');
        clientDOM.newEl(el, 'span', val + 'Display', 'w3-right');
    });
    clientDOM.newEl(Info, 'ul', 'paramsList', 'w3-ul');
   
};
// setTimeout(() => {
    
// }, 200);
generalInfoContent();

