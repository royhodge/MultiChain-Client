// Create Element Functions
const exec = require('child_process').execFile;

let el, el2;

const clientDOM = {
    newEl: (tag, id = '', cl = '', par = document.body, tx = '') => {
        let el = document.createElement(tag);
        el.id = id;
        el.className = cl;
        el.textContent = tx;
        par.appendChild(el);
        return el;
    },
    openTabs: (id, cls) => {
        let y = document.querySelectorAll(`.${cls}`);
        let x = document.querySelector(`#${id}`);
        y.forEach((val) => {
            if (val.classList.contains('w3-hide') === false) {
                val.classList.add('w3-hide');
            }
        });
        x.classList.remove('w3-hide');
    },
    appendTop: (tag, id = '', cl = '', par = document.body) => {
        el = clientDOM.newEl(tag, id, cl);
        par.insertBefore(el, par.firstChild);
        return el;
    },
    appendBottom: (tag, id = '', cl = '', par = document.body) => {
        el = clientDOM.newEl(tag, id, cl);
        par.appendChild(el);
        return el;
    },
    insertBefore: (tag, id = '', cl = '', par = document.body,num) => {
        el = clientDOM.newEl(tag, id, cl);
        par.insertBefore(el, par.childNodes[num]);
        return el;
    },
    createTag: (arr, par) => {
        arr.forEach((val) => {
            el = clientDOM.appendBottom('button', '', 'w3-margin-top w3-margin-left w3-border w3-tag w3-round', par);
            el.innerText = val;
            return el;
        });
    },
    newOp: (arr, par) => {
        arr.forEach((val) => {
            el = clientDOM.appendBottom('option', '', '', par);
            el.innerText = val;
            el.value = val;
            return el;
        });
    },

    newLI: (arr, par) => {
        arr.forEach((val) => {
            el = clientDOM.appendBottom('li', '', '', par);
            el.textContent = val;            
            return el;
        });
    },

    newAssetCard: (name, i, qty, sub) => {
        let x = clientDOM.newEl('div', 'asset' + i, 'assets w3-card-4 w3-margin', assetsContent);
        el = clientDOM.newEl('header', '', 'w3-container w3-amber', x);
        el2 = clientDOM.newEl('h3', '', '', el);
        el2.textContent = name;
        el = clientDOM.newEl('div', '', 'w3-container', x);
        el2 = clientDOM.newEl('p', '', '', el);
        el2.textContent = 'Quantity:' + qty;
        el = clientDOM.newEl('footer', '', 'w3-container w3-amber', x);
        el2 = clientDOM.newEl('p', '', '', el);
        el2.textContent = 'Subscribed: ' + sub;
    }

};

const clientFunc = {
    start: (chain => exec('./multichain/multichaind.exe', [chain, '-daemon'])),
    stop: (chain => exec('./multichain/multichain-cli.exe', [chain, 'stop'])),
};

const objValArr = (arr) => {
    let x = Object.values(arr);
    return x;
};

const objKeyArr = (arr) => {
    let x = Object.keys(arr);
    return x;
};
