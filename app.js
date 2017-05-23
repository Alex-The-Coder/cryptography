const Logger = require('frozor-logger');
global.log = new Logger('CRYPTO');

const log = new Logger('APP');

const express = require('express');
const app = express();

const rsaSlow = require('./lib/rsa');
const rsaFast = require('./lib/rsa-fast');

app.use(express.static('assets'));

app.get('/key/gen/slow', (req, res) => {
    res.json(rsaSlow())
});

app.get('/key/gen/fast', (req, res) => {
    let {n, d, e} = rsaFast();
    n = n.toJSNumber();
    d = d.toJSNumber();
    e = e.toJSNumber();
    res.json({n, d, e});
});

app.use((req, res)=>{
    res.redirect('/404');
});

app.listen (80, () => {
    log.info(`${log.chalk.cyan(`Spencer's Amazing RSA Algorithm`)} ${log.chalk.red('v')}${log.chalk.magenta('1.0')}`);
    log.info(log.chalk.green('-------------------------------------'));
    log.info(`Ready for requests on port ${log.chalk.magenta(80)}!`);
});
