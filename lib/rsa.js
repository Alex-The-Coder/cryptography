const BigInteger = require('big-integer');
const crypto = require('crypto');
const prime = require('./prime');
const math = require('./math');
const fs = require('fs');
const path = require('path');

const range = [128, 512];

const primesInRange = prime.getPrimes(range[1]).filter(n => n >= range[0]);

function getRandomPrimeIndex () {
    return Math.floor(Math.random() * primesInRange.length);
}

function getRandomPrime () {
    return primesInRange [ getRandomPrimeIndex () ];
}

function getDistinctPrimes () {
    log.info(`Getting ${log.chalk.cyan('p')} and ${log.chalk.cyan('q')}...`);
    const p = getRandomPrime ();
    const q = getRandomPrime ();

    log.info('p: ' + log.chalk.magenta(p));
    log.info('q: ' + log.chalk.magenta(q));

    log.info('Calculating n...');

    const n = p * q;

    log.info('n: ' + log.chalk.magenta(n));

    return {n, p, q};
}

Number.prototype.truncate = function (len) {
    return parseInt(this.toString().slice(0, len));
};

String.prototype.truncate = function (len) {
    return this.slice(0, len);
};

function rsa () {
    const {n, p, q} = getDistinctPrimes();

    log.info(`Finding LCM of ${log.chalk.cyan('p')} and ${log.chalk.cyan('q')} (${log.chalk.cyan('lmN')})...`);

    const lambdaN = math.getLeastCommonMultiple(p - 1, q - 1);

    log.info('lmN: ' + log.chalk.magenta(lambdaN));

    let e = lambdaN.truncate(Math.floor(Math.random()*2)+4);

    log.info('e (start): ' + log.chalk.magenta(e));

    /*// This might turn out badly.
     for(e; e > 0; e--) {
     if (math.isCoprime(lambdaN, e)) {
     break;
     }
     }*/

    log.info(`Getting coprimes of ${log.chalk.cyan('e')}...`);

    let eCos = math.getCoprimes(e);

    log.info(`Got coprimes of ${log.chalk.cyan('e')}, calculating final value...`);

    e = eCos[Math.floor(Math.random()*eCos.length / 3) + Math.floor(eCos.length / 2.5)];

    log.info('e (final): ' + log.chalk.magenta(e));

    //log.debug('Finding factors for lmN');
    //log.debug(math.getFactors(lambdaN));

    log.info(`Finding the value of ${log.chalk.cyan('d')} by finding a totient: `);

    let tot = math.totient(lambdaN);

    log.info(`Totient: ${log.chalk.magenta(tot)}`);
    log.info(`Calculating the final value of ${log.chalk.cyan('d')}...`);


    let d = BigInteger(e).modInv(lambdaN);

    log.info('d: ' + log.chalk.magenta(d));

    return {
        exponent: {
            e,
            d,
            public: e,
            private: d
        },
        e,
        d,
        n,
        modulus: n,
        p,
        q,
        lambdaN
    }
}

module.exports = rsa;