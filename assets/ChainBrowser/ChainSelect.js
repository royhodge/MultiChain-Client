const fs = require('fs');
const {
    startMultichain,
    stopMultichain
} = require('../Daemons');

const listStreams = require('./Streams');
const showInfo = require('./GeneralInfo');
const {
    addFiles
} = require('../Windows');

const startbtn = (li, name) => {
    var startBtn = dom.newEl(li, 'button', ``, 'w3-half w3-btn w3-green', 'Start');
    startBtn.addEventListener('click', async () => {
        startMultichain(name);
        connect(name);
    });
    var stopBtn = dom.newEl(li, 'button', ``, 'w3-half w3-btn w3-red', 'Stop');
    stopBtn.addEventListener('click', async () => {
        stopMultichain(name);
        connect('root');
    });
}

const chainBtn = async (name) => {
    let id = name.replace(/ /g, '')
    let li = dom.newEl(chainUL, 'li', `${id}Btn`, 'chainCard w3-border w3-border-red w3-btn w3-round');
    var header = dom.newEl(li, 'h3', ``, 'w3-block', name);
    header.addEventListener('click', async () => {        
        dom.openTabs('Streams', 'section');
        dom.fadeOut(chainSelect)
        let info = await connect(name); 
        let streamItems = await listStreams();
        showInfo(info);
    });
    switch (name) {
        case 'root':
            dom.newEl(li, 'h4', ``, 'w3-block', 'I am root');
            break;
        case 'Share':
            header.addEventListener('click', async () => {
                // addFiles();
            });
            startbtn(li, name);
            break;
        default:
            startbtn(li, name);
            break;
    }
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

openChainSelect.addEventListener('click', () => {
    chainSelect.classList.replace('fadeOut', 'fadeIn')
    chainBtns();
});

closeChainSelect.addEventListener('click', () => {
    chainSelect.classList.replace('fadeIn', 'fadeOut')
});

createChainBtn.addEventListener('click', () => {   
    createChainModal.classList.replace('fadeOut', 'fadeIn')    
});

window.addEventListener('load', () => {
    chainSelect.classList.replace('fadeOut', 'fadeIn')
    chainBtns();
});