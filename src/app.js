const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk');
const path = require('path');
// const fs = require('fs');
// const promisify = require('util').promisify;

// const stat = promisify(fs.stat);
// const readdir = promisify(fs.readdir);

const route = require('./helper/route');
// console.log(chalk.green(process.cwd())); //返回当前工作目录
// console.log(chalk.green(__dirname)); //源码所在的目录
const server = http.createServer((req, res) => {
  const url = req.url;
  const filePath = path.join(conf.root, url);
  route(req, res, filePath);

  // try {
  //   const stats =await stat(filePath);
  //   if (stats.isFile()) {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  //     fs.createReadStream(filePath).pipe(res);
  //   } else if (stats.isDirectory()) {
  //     fs.readdir(filePath, (err, files) => {
  //       res.statusCode = 200;
  //       res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  //       res.end(files.join(','));
  //     });
  //   }
  // } catch (err) {
  //   res.statusCode = 404;
  //   res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  //   res.end(`${filePath} is not find`);
  //   return;
  // }
  // fs.stat(filePath, (err, stats) => {
  //   if (err) {

  //     res.statusCode = 404;
  //     res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  //     res.end(`${filePath} is not find`);
  //     return;
  //   }
  //   if (stats.isFile()) {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  //     fs.createReadStream(filePath).pipe(res);
  //   } else if (stats.isDirectory()) {
  //     fs.readdir(filePath, (err, files) => {
  //       res.statusCode = 200;
  //       res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  //       res.end(files.join(','));
  //     });
  //   }
  // });
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.log(`server started at ${chalk.red(addr)}`);
});
