const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const conf = require('../config/defaultConfig');
const Handlebars = require('handlebars');
// const chalk = require('chalk');
const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

const mine = require('./mime');

const compress = require('./compress');
// const iconv = require('iconv-lite');

module.exports = async function(req, res, filePath) {
  try {
    const stats = await stat(filePath);

    if (stats.isFile()) {
      const contentType = `${mine(filePath)};charset=utf-8`;
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);

      let rs = fs.createReadStream(filePath);

      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res);
      }

      // console.log(res);
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      const dir = path.relative(conf.root, filePath);
      const data = {
        files,
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : ''
      };
      res.end(template(data));
    }
  } catch (err) {
    console.log(err);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end(err);
    return;
  }
};
