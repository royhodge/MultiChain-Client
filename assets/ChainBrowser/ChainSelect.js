// 
// 
const fs = require('fs');
const {
    startMultichain,
    stopMultichain
} = require('../Daemons');

const listStreams = require('./StreamSelect');
const showInfo = require('./GeneralInfo');
const {
    addFiles
} = require('../Windows');


// Card header is used to manage stream pages
const chainHeader = (header, name) => {
    header.addEventListener('click', async () => {
        let info = await connect(name);       
        showInfo(info);        
        switch (name) {
            case 'root':
                comingSoonModal.style.display = 'flex';
                comingSoonHeader.textContent = 'I am root!';
                break;
            case 'Contacts':
                dom.openTabs('contactsBrowser', 'section');                
                Streamsbtn.addEventListener('click', async () => {
                    dom.openTabs('contactsBrowser', 'section');                    
                });
                break;
            default:
                dom.openTabs('Streams', 'section');                
                Streamsbtn.addEventListener('click', async () => {
                    dom.openTabs('Streams', 'section');                    
                });
                listStreams();
                break;
        }
        Infobtn.textContent = name;
        dom.fadeOut(chainSelect);
    });
};

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
};

const chainBtn = async (name) => {
    let id = name.replace(/ /g, '')
    let li = dom.newEl(chainUL, 'li', `${id}Btn`, 'chainCard w3-border w3-border-red w3-btn w3-round');
    var header = dom.newEl(li, 'h3', ``, 'w3-block', name);
    chainHeader(header, name);
    switch (name) {
        case 'root':
            dom.newEl(li, 'h4', ``, 'w3-block', 'I am root');
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
    dom.fadeIn(chainSelect);
    chainBtns();
});

closeChainSelect.addEventListener('click', () => {
    dom.fadeOut(chainSelect);
});

createChainBtn.addEventListener('click', () => {
    dom.fadeIn(createChainModal);
});


window.addEventListener('load', () => {
    dom.fadeIn(chainSelect);
    chainBtns();
});