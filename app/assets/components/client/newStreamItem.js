// 
// 
// 
// Streams section
const newStreamItem = () => {
    clientDOM.newEl(clientBody, 'div', 'streamPostModal', 'w3-modal');
    clientDOM.newEl(streamPostModal, 'div', 'chatModalContent', 'w3-modal-content w3-container w3-center');
    clientDOM.newEl(chatModalContent, 'h3', '', '', 'Publish new content');
    clientDOM.newEl(chatModalContent, 'input', 'streamItemKeys', '');
    streamItemKeys.style.width = '300px';
    streamItemKeys.placeholder = 'only 1 key at a time...for now.';
    clientDOM.newEl(chatModalContent, 'textarea', 'chatInput', '');
    chatInput.placeholder = 'Inner Text';
    chatInput.cols = '60';
    chatInput.rows = '10';
    chatInput.placeholder = 'Add your content';
    clientDOM.newEl(chatModalContent, 'div', 'chatModalFooter', '');
    clientDOM.newEl(chatModalFooter, 'button', 'streamPost', 'w3-btn', 'Submit');
    clientDOM.newEl(chatModalFooter, 'button', 'streamPostCloseBtn', 'w3-btn', 'Close');
};
newStreamItem();
// Chat modal
