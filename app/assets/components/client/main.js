
const loadContent = () => {
    let allEl = document.body.querySelectorAll('*');
    allEl.forEach((val => val.classList.add('animated')));
    allEl.forEach((val => { if (val.tagName === 'SCRIPT') { val.classList.remove('animated'); } }));

    el = '';
    el2 = '';
};

// setTimeout(() => {
    
// }, 205);

loadContent();
