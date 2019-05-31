const dom = require('../DOM');
// 
// 
dom.appendTop(document.body, 'div', 'errorModal','w3-modal alertModal');
dom.newEl(errorModal, 'div', 'errorContent',' w3-card-4 w3-container w3-white alertModalContent');
dom.newEl(errorContent, 'button', 'errorCloseBtn', 'w3-button fas fa-times w3-right');
errorCloseBtn.addEventListener('click', () => {
    errorModal.style.display = 'none';
});
dom.newEl(errorContent, 'h3', 'errorHeader','w3-center alertModalHeader','Something went wrong...');