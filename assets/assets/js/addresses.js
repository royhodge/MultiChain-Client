
// Addresses sections

el = client.newEl('h3', '', '', Addresses);
el.textContent = `Address Management`;

el = client.newEl('div','addressContent','w3-container',Addresses);
client.newEl('select','','w3-input',addressContent);



function listAddresses() {
    var obj = {};
    multichain.listAddresses((err, info) => {
        if (err) {
            throw err;
        }
        // put array into empty object
        obj.info = info;
        w3.displayObject("addresses", obj);
    });
}


function listPermissions() {
    multichain.listPermissions((err, info) => {
        if (err) {
            throw err;
        }
        // info is an array
        info.forEach(element => {
            var newEl = create.newEl('h6', '', '', display);
            newEl.textContent = `Address: ${element.address} has permission ${element.type}`;
        });

    });

}