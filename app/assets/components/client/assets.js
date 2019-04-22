// Asset sections

const assetContent = () => {
    el = clientDOM.newEl(Assets, 'h3');
    el.textContent = `Asset Management`;
    clientDOM.newEl(Assets, 'div', 'assetsContent', 'w3-container flex-center');
};

const assetCard = (name, i, qty, sub) => {
    let x = clientDOM.newEl(assetsContent, 'div', 'asset' + i, 'assets w3-card-4 w3-margin');
    el = clientDOM.newEl(x, 'header', '', 'w3-container w3-amber');
    el2 = clientDOM.newEl(el, 'h3');
    el2.textContent = name;
    el = clientDOM.newEl(x, 'div', '', 'w3-container');
    el2 = clientDOM.newEl(el, 'p');
    el2.textContent = 'Quantity:' + qty;
    el = clientDOM.newEl(x, 'footer', '', 'w3-container w3-amber');
    el2 = clientDOM.newEl(el, 'p');
    el2.textContent = 'Subscribed: ' + sub;
}
// setTimeout(() => {
    
// }, 200);

assetContent();