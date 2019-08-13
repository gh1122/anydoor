const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
// const promisify = require('util').promisify;

const server = http.createServer((req, res) => {
  const url = req.url;
  const filePath = path.join(conf.root, url);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log(1);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
      res.end(`${filePath} is not find`);
      return;
    }
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end(files.join(','));
      });
    }
  });

  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  // res.end(filePath);
  // res.write('<html>');
  // res.write('<body>');
  // res.write('hello world');
  // res.write('</body>');

  // res.end('</html>');
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.log(`server started at ${chalk.red(addr)}`);
});
