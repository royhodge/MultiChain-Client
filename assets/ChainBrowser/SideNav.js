const GeneralInfo = require('./GeneralInfo');
const Streams = require('./Streams');
const fs = require('fs');

const chainBtn = (name) => {
    let btn = dom.newEl(chainUL, 'div', `${name}Btn`, 'w3-white w3-button w3-block', name);    
    btn.addEventListener('click', () => {
        let name = event.target.textContent;
        connect(name);
        setTimeout(() => {
            GeneralInfo();
            Streams();
        }, 200);
    });    
};

const chainBtns = () => {
    chainUL.innerHTML = '';
    fs.readdir(chainsPath, (err, res) => {
        let chainList = res.filter(val => !(val.includes('.')));
        chainList.forEach((val) => {
            if (!(val.includes("."))) {
                chainBtn(val);
            }
        });
    });
};

openSideNav.addEventListener('click', () => {
    sideNav.style.width = '250px';
    chainBtns();
});

closeSideNav.addEventListener('click', () => {
    sideNav.style.width = '0px';
});

module.exports = chainBtns;
