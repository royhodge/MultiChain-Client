// Asset sections

el = client.newEl('h3', '', '', Assets);
el.textContent = `Asset Management`;


client.newEl('div', 'assetsContent', 'w3-container flex-center', Assets);

multichain.listAssets((err, info) => {
    if (err) {
        throw err;
    }
    
    info.forEach((val, i) => {
        client.newAssetCard(val.name, i, val.issueqty, val.subscribed);
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