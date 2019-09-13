//
const path = require('path');

let chainpath;

switch (process.platform) {
  case 'win32':
    chainpath = path.join(process.env.APPDATA, 'Multichain', '/');
    break;
  case 'linux':
    chainpath = path.join(process.env.HOME, '.multichain', '/');
    break;
  default:
    // add paths for darwin. need help
    break;
}

module.exports = chainpath;
