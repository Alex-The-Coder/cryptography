const BigInteger = require('big-integer');

function getLeastCommonMultiple(a, b) {
    const [iter, check] = (a > b) ? [a, b] : [b, a];

    for (let i = iter*2; i < Number.MAX_SAFE_INTEGER; i += iter) {
        if ( i % check === 0 ) {
            return i;
        }
    }

    return null;
}

function getFactors (num) {
    const factors = [num];

    for(let i = 2; i < num; i++) {
        if ( factors.indexOf(i) > -1 ) {
            continue;
        }

        if ( ( num % i ) === 0 ) {
            factors.push (i);
            factors.push (num / i);
        }
    }

    return factors;
}

Array.prototype.hasAnySameElements = function (other) {
    for (let i = 0; i < other.length; i++) {
        if ( this.indexOf(other[i]) > -1 ) {
            return true;
        }
    }

    return false;
};

function isCoprime(a, b) {
    return !(getFactors (a).hasAnySameElements (getFactors (b)));
}

function getCoprimes(n, limit) {
    const coprimes = [];
    for (let i = 2; i < n; i++) {
        if (isCoprime (n, i)) {
            coprimes.push (i);

            if (limit && coprimes.length >= limit) {
                break;
            }
        }
    }
    return coprimes;
}

/*
 * Euler's Totient Function
  * Returns: The number of numbers less than n which are relatively prime.
  * How: phi(n) = n * forEachPrimeDivisor((p1 - 1) / p1)
 */
function totient(n) {
    if (n < 1) return 0;
    if (n < 3) return 1;

    let tot = n;
    let p = 2;
    for (p; (p << 1) <= n; p++) {

        if ((n % p) === 0) {

            tot *= p -1;
            tot /= p;

            while (n % p === 0) {
                n /= p;
            }

        }

    }

    if (n > 1) {
        tot *= n - 1;
        tot /= n;
    }

    return tot;
}

function carmichael(n) {
    const a = getCoprimes(n, 1)[0];

    // We might be here for a while.
    for (let m = 1; m < Number.MAX_SAFE_INTEGER; m++) {
        if ( (Math.pow(a, m) % n) === 1 ) {
            return m;
        }
    }

    return null;
}

module.exports = { getLeastCommonMultiple, getFactors, isCoprime, getCoprimes, totient, carmichael };