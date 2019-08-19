const { exec } = require('child_process');

const opn = require('opn');
module.exports = url => {
  opn(url);
  // switch (process.platform) {
  //   case 'darwin':
  //     console.log(process.platform);
  //     exec(`open${url}`);
  //     break;
  //   case 'win32':
  //     exec(`open${url}`);
  //     break;
  //   case 'linux':
  //     exec(`xdg-open${url}`);
  //     break;
  //   default:
  //     exec(`open ${url}`);
  // }
};
