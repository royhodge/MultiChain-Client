const dom = require('../DOM');
// 
// 
dom.appendTop(document.body, 'div', 'comingSoonModal','w3-modal alertModal');
dom.newEl(comingSoonModal, 'div', 'comingSoonContent',' w3-card-4 w3-container w3-white alertModalContent');
dom.newEl(comingSoonContent, 'button', 'comingSoonCloseBtn', 'w3-button fas fa-times w3-right');
comingSoonCloseBtn.addEventListener('click', () => {
    comingSoonModal.style.display = 'none';
});
dom.newEl(comingSoonContent, 'h3', 'comingSoonHeader','w3-center alertModalHeader','Coming soon');
