const yargs = require('yargs');

const argv = yargs
  .usage('anywhere [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: 9527
  })
  .option('h', {
    alias: 'hostname',
    describe: 'host'
  })
  .option('d', {
    alias: 'root',
    describe: 'root path'
  })
  .version()
  .alias('v', 'version')
  .help().argv;
