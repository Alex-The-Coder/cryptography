const Logger = require('frozor-logger');
const log = global.log = new Logger('CRYPTO');

log.info(`${log.chalk.cyan(`Spencer's Amazing RSA Algorithm`)} ${log.chalk.red('v')}${log.chalk.magenta('1.0')}`);
log.info(log.chalk.green('-------------------------------------'));

const crypto = require('./crypto');
const slowRSA = require('./lib/rsa');