const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// const conf = require('../config/defaultConfig');
const Handlebars = require('handlebars');
// const chalk = require('chalk');
const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

const mine = require('./mime');

const compress = require('./compress');

const range = require('./range');

// const isFresh = require('./cache');

module.exports = async function(req, res, filePath, conf) {
  try {
    const stats = await stat(filePath);

    if (stats.isFile()) {
      const contentType = `${mine(filePath)};charset=utf-8`;

      res.setHeader('Content-Type', contentType);
      // if (isFresh(stats, req, res)) {
      //   res.statusCode = 304;
      //   res.end();
      //   return;
      // }

      let rs;
      const { code, start, end } = range(stat.size, req, res);

      if (code == 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {
          start,
          end
        });
      }
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
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end(err);
    return;
  }
};
