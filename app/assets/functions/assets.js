
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



const listAssets = () => {
    multichain.listAssets((err, info) => {
        if (err) {
            throw err;
        }

        info.forEach((val, i) => {
            console.log(val)
        });
        assetCard(name, i, qty, sub);

    });
};