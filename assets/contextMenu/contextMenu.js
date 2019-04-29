const remote = require('electron').remote;
const { Menu, MenuItem } = remote;

const menu = new Menu()
menu.append(new MenuItem({
    label: 'Reload',
    click() {
        location.reload();
    }
}));

menu.append(new MenuItem({ type: 'separator' }));

menu.append(new MenuItem({
    label: 'Quit root',    
    click() {
        remote.app.quit();
    }
}));

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup({ window: remote.getCurrentWindow() });
}, false);