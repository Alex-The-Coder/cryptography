const BigInteger = require('big-integer');
const SecureRandom = require('secure-random')

function intFromBytes(x) {
    var val = 0;
    for (var i = 0; i < x.length; ++i) {        
        val += x[i];        
        if (i < x.length-1) {
            val = val << 8;
        }
    }
    return val;
}

function getRandomPrime (bits = 16) {
    let p;

    do {
        p = intFromBytes(secureRandom(bits));
    } while (!p.isProbablePrime(256));

    return p;
}

function rsa(keySize = 32) {
    log.info(`Performing RSA generation for a key of size ${log.chalk.magenta(keySize)}`);

    const p = getRandomPrime(keySize / 2);
    const q = getRandomPrime(keySize / 2);
    const n = p.multiply(q);

    log.info(`${log.chalk.cyan('p')}: ${log.chalk.magenta(p)}`);
    log.info(`${log.chalk.cyan('q')}: ${log.chalk.magenta(q)}`);
    log.info(`${log.chalk.cyan('n')}: ${log.chalk.magenta(n)}`);

    const lambda = BigInteger.lcm(p.minus(1), q.minus(1));

    log.info(`${log.chalk.cyan('lambda')}: ${log.chalk.magenta(lambda)}`);

    let e;

    do {
        e = BigInteger.randBetween(1, lambda);
    } while (BigInteger.gcd(lambda, e).neq(1));

    log.info(`${log.chalk.cyan('e')}: ${log.chalk.magenta(e)}`);

    const d = e.modInv(lambda);

    log.info(`${log.chalk.cyan('d')}: ${log.chalk.magenta(d)}`);

    return {p, q, n, e, d};
}

module.exports = rsa;
