const gi = require('./generalInfo');
const remote = require('electron').remote;

let tabNav = document.querySelector('#tabNav');
let sideNav = document.querySelector('#sideNav');
let btns = tabNav.querySelectorAll('a');


btns[0].addEventListener('click', () => {
    sideNav.style.width = '250px';
});
btns[1].addEventListener('click', () => {
    gi.displayInfo();
    gi.displayBlockchainParams();
});



btns[7].addEventListener('click', () => { remote.app.quit(); });
btns[8].addEventListener('click', () => { location.reload(); });
// btns[9].addEventListener('click', win.loadURL('https://github.com'));