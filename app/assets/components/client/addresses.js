
// Addresses sections

const addressContent = () => {

    el = clientDOM.newEl(Addresses,'h3');
    el.textContent = `Address Management`;    
    clientDOM.newEl(Addresses,'div','addressDisplay','w3-container');    
    clientDOM.newEl(addressDisplay,'select','','w3-input');
    
};


// setTimeout(() => {
   
// }, 200);

addressContent();