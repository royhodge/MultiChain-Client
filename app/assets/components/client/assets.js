// Asset sections

el = clientDOM.newEl('h3', '', '', Assets);
el.textContent = `Asset Management`;


clientDOM.newEl('div', 'assetsContent', 'w3-container flex-center', Assets);

multichain.listAssets((err, info) => {
    if (err) {
        throw err;
    }
    
    info.forEach((val, i) => {
        clientDOM.newAssetCard(val.name, i, val.issueqty, val.subscribed);
    });   

});

function issueAssets(address, asset, qty) {
    multichain.issue({
        address: address,
        asset: asset,
        qty: qty,
        units: 0.01
    }, (err, res) => {
        if (err) {
            throw err;
        }        
    });
}

newAssetCard= (name, i, qty, sub) => {
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