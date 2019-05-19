// //
const rimraf = require('rimraf');

const displayInfo = () => {
  multichain.getInfo((err, info) => {
    ChainNameDisplay.textContent = info.chainname;
    NodeAddressDisplay.textContent = info.nodeaddress;
    VersionDisplay.textContent = info.version;
    switch (process.platform) {
      case 'win32':
        OSDisplay.textContent = 'Windows';
        break;
      case 'darwin':
        OSDisplay.textContent = 'MacOS';
        break;
      default:
        OSDisplay.textContent = 'Linux';

    }
    UsernameDisplay.textContent = process.env.USERNAME;
  });
};
// Blockchain Params are more useful than getInfo in most cases
const displayBlockchainParams = () => {
  let params = [
    'anyone-can-connect',
    'anyone-can-create',
    'anyone-can-issue',
    'anyone-can-send',
    'anyone-can-receive',
    'anyone-can-mine',
    'anyone-can-admin',
    'anyone-can-activate',
  ];

  paramsList.textContent = '';
  multichain.getBlockchainParams((err, info) => {
    if (err) {
      throw err;
    }
    params.forEach((val) => {
      dom.newEl(paramsList, 'li', '', '', val + ': ' + info[val]);
    });
  });
};

const showInfo = () => {
  displayInfo();
  displayBlockchainParams();
};

const deleteChain = () => {
  let name = ChainNameDisplay.textContent;
  if(name === 'app'){
    alert('You may not delete app chain.');
    return;
  }
  let folder = path.join(chainsPath, name)
  let x = confirm(`Are you sure you want to delete this chain? \n This action cannot be undone`);
  if (x) {
    multichain.stop((err, res) => {
      if (err) {console.log(err);}
      console.log(res);
    });
    setTimeout(() => {
      rimraf(folder, (err, res) => {
        if (err) {console.log(err);}
        console.log(res);
        location.reload();
      })
    }, 300);
  }
}

deleteChainBtn.addEventListener('click', () => {
  deleteChain()
});

Infobtn.addEventListener('click', () => {
  showInfo();
});

module.exports = showInfo;