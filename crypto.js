const rsa = require('./lib/rsa-fast');
const BigInteger = require('big-integer');
const transform = require('./lib/transform');

module.exports = function () {
    const {d, e, n, p, q} = rsa();

    const publicKey = {n, e};
    const privateKey = {n, d};

    function encryptNumber(m) {
        return BigInteger(m).modPow(publicKey.e, publicKey.n);
    }

    function decryptNumber(c) {
        return BigInteger(c).modPow(privateKey.d, privateKey.n);
    }

    function encryptString(str) {
        const numChunks = transform.numberify(str);
        const encryptedChunks = [];

        for (let chunk of numChunks) {
            encryptedChunks.push(encryptNumber(chunk));
        }

        return encryptedChunks.join(' ');
    }

    function decryptString(str) {
        const numChunks = str.split(' ').map(i => parseInt(i));
        const decryptedChunks = [];

        for (let chunk of numChunks) {
            decryptedChunks.push(decryptNumber(chunk));
        }

        return transform.stringify(decryptedChunks).join('');
    }

    function decrypt(toDecrypt) {
        const type = typeof toDecrypt;

        log.info(`Decrypting ${log.chalk.cyan(type)} ${log.chalk.magenta(toDecrypt)}...`);

        let decrypted;

        if (type === 'number') {
            decrypted = decryptNumber(toDecrypt);
        } else if (type === 'string') {
            decrypted = decryptString(toDecrypt);
        } else {
            if (BigInteger.isInstance(toDecrypt)) {

            } else {
                throw new Error (`Can't decrypt ${type}`);
            }
        }

        log.info(`Decrypted value: ${log.chalk.magenta(decrypted)}`);

        return decrypted;
    }

    function encrypt(toEncrypt) {
        const type = typeof toEncrypt;

        log.info(`Encrypting ${log.chalk.cyan(type)} ${log.chalk.magenta(toEncrypt)}...`);

        let encrypted;

        if (type === 'number') {
            encrypted = encryptNumber(toEncrypt);
        } else if (type === 'string') {
            encrypted = encryptString(toEncrypt);
        } else {
            throw new Error (`Can't encrypt ${type}`);
        }

        log.info(`Encrypted value: ${log.chalk.magenta(encrypted)}`);

        return encrypted;
    }

    return {encryptNumber, decryptNumber, encryptString, decryptString, encrypt, decrypt, publicKey, privateKey};
};