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