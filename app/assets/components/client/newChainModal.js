// 
// 
// 
const newChainModal = () => {
    clientDOM.newEl(clientBody,'div', 'createChainModal', 'w3-modal');
    clientDOM.newEl(createChainModal,'div', 'modalContent', 'w3-modal-content w3-card-4 w3-container w3-center w3-padding-32');
    clientDOM.newEl(modalContent,'span', 'instCloseBtn', 'w3-button w3-hover-red w3-display-topright', 'X');
    instCloseBtn.setAttribute('onclick',`w3.hide('#createChainModal')`);
    clientDOM.newEl(modalContent,'h1', '', '',`Let's create a blockchain!`);
    clientDOM.newEl(modalContent,'input', 'chainNameInput', 'w3-input w3-twothird');
    chainNameInput.type = 'text';
    chainNameInput.placeholder = 'Enter a name for your blockchain';
    clientDOM.newEl(modalContent,'button', 'createChainBtn', 'w3-btn w3-round-large w3-ripple w3-border w3-green','Create');
    clientDOM.newEl(modalContent,'hr');
    clientDOM.newEl(modalContent,'div', 'paramsContainer', 'w3-center w3-container');
    clientDOM.newEl(paramsContainer,'h3', '', '',  'Blockchain parameters');
    clientDOM.newEl(paramsContainer,'p', '', '','(click true or false to switch value)');
    clientDOM.newEl(paramsContainer,'h4', 'chainTitle');
    clientDOM.newEl(paramsContainer,'ul', 'displayParams', 'w3-ul');
    clientDOM.newEl(modalContent,'button', 'applySettingsBtn', 'w3-btn w3-round-large w3-ripple w3-border w3-blue','Apply and Restart');
};
newChainModal();


