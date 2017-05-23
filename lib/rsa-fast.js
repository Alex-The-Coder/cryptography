const BigInteger = require('big-integer');

function getRandomPrime (bits = 16) {
    // Wikipedia has this as 33, but that's not right.
    const min = BigInteger(6074001000).shiftLeft(bits - 31);

    const max = BigInteger.one.shiftLeft(bits).minus(1);

    let p;

    do {
        p = BigInteger.randBetween(min, max);
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