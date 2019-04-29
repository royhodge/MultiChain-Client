// Assets
const listAssets = () => {
    multichain.listAssets((err, info) => {
        if (err) throw err;
        // Resolves an array
        // console.log(JSON.stringify(info));
        console.log(info);
    });
};


const issue = (add, ass, qty) => {
    multichain.issue({
        address: add,
        asset: ass,
        qty: qty,
    }, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
};