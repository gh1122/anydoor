const path = require('path');
const mimeTypes = {
  txt: 'text/plain',
  html: 'text/html',
  js: 'text/javascript',
  jpg: 'image/jpeg',
  png: 'image/jpeg',
  css: 'text/css'
};

module.exports = filePath => {
  let ext = path
    .extname(filePath)
    .split('.')
    .pop()
    .toLowerCase();

  if (!ext) {
    ext = filePath;
  }

  return mimeTypes[ext] || mimeTypes['txt'];
};
