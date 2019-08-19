const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk');
const path = require('path');

const route = require('./helper/route');

const openUrl = require('./helper/openUrl');
// console.log(chalk.green(process.cwd())); //返回当前工作目录
// console.log(chalk.green(__dirname)); //源码所在的目录

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }
  start() {
    const server = http.createServer((req, res) => {
      const url = req.url;
      const filePath = path.join(this.conf.root, url);
      route(req, res, filePath, this.conf);
    });

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      openUrl(addr);
      console.log(`server started at ${chalk.red(addr)}`);
    });
  }
}
module.exports = Server;
