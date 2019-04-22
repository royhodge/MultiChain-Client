// Client global variables
// Funcitons to create DOM elements

let el, el2;

const clientDOM = {
    el: (tag, id = '', cl = '', tx = '') => {
        let el = document.createElement(tag);
        el.id = id;
        el.className = cl;
        el.textContent = tx;
        return el;
    },

    newEl: (par, tag, id = '', cl = '', tx = '') => {
        el = clientDOM.el(tag, id, cl, tx);
        par.appendChild(el);
        return el;
    },

    appendTop: (par, tag, id = '', cl = '', tx = '') => {
        el = clientDOM.el(tag, id, cl, tx);
        par.insertBefore(el, par.firstChild);
        return el;
    },

    insertBefore: (par, num, tag, id = '', cl = '', tx = '') => {
        el = clientDOM.el(tag, id, cl, tx);
        par.insertBefore(el, par.childNodes[num]);
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
    createTag: (arr, par) => {
        arr.forEach((val) => {
            el = clientDOM.newEl(par,'button', '', 'w3-margin-top w3-margin-left w3-border w3-tag w3-round');
            el.innerText = val;
            return el;
        });
    },
    newOp: (arr, par) => {
        arr.forEach((val) => {
            el = clientDOM.newEl(par, 'option');
            el.textContent = val;
            el.value = val;
            return el;
        });
    },

    newLI: (arr, par) => {
        arr.forEach((val) => {
            el = clientDOM.newEl(par,'li');
            el.textContent = val;
            return el;
        });
    },
};

