let keyLoading;
let privateKey;
let publicKey;

class LoadingButton {
    constructor (button, loading) {
        this.button = button;
        this.loading = loading;
    }

    setLoading (isLoading = true, hideButton = true) {
        if (isLoading) {
            if (hideButton) this.button.hide();
            this.loading.show();
        } else {
            this.loading.hide();
            this.button.show();
        }
    }
}

String.prototype.splitEvery = function (n = 1) {
    if (n < 1) return [this];
    if (n === 1) return this.split('');

    const chunks = [];

    for (let i = 0; i < this.length; i += n) {
        chunks.push(this.substr(i, i + n));
    }

    return chunks;
};

Number.prototype.padStart = function (len = 3) {
    let thisStr = this.toString();

    if (thisStr.length <= len) {
        let padCount = len - thisStr.length;

        for (let i = 0; i < padCount; i++) {
            thisStr = '0' + thisStr;
        }
    }

    return thisStr;
};

const transform = {
    numberify(str) {
        const nums = [];

        for (let i = 0; i < str.length; i++) {
            nums.push(str.charCodeAt(i));
        }

        return nums;
    },

    stringify(nums) {
        const letters = [];

        for (let num of nums) {
            letters.push(String.fromCharCode(parseInt(num)));
        }

        return letters;
    }
};

function encryptNumber(m) {
    return bigInt(m).modPow(publicKey.e, publicKey.n);
}

function decryptNumber(c) {
    return bigInt(c).modPow(privateKey.d, privateKey.n);
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
    if (!isNaN(toDecrypt)) {
        if (typeof toDecrypt !== 'number') {
            toDecrypt = parseInt(toDecrypt);
        }
    }

    const type = typeof toDecrypt;

    console.log(`Decrypting ${type} ${toDecrypt}...`);

    let decrypted;

    if (type === 'number') {
        decrypted = decryptNumber(toDecrypt);
    } else if (type === 'string') {
        decrypted = decryptString(toDecrypt);
    } else {
        if (bigInt.isInstance(toDecrypt)) {

        } else {
            throw new Error (`Can't decrypt ${type}`);
        }
    }

    console.log(`Decrypted value: ${decrypted}`);

    return decrypted;
}

function encrypt(toEncrypt) {
    if (!isNaN(toEncrypt)) {
        if (typeof toEncrypt !== 'number') {
            toEncrypt = parseInt(toEncrypt);
        }
    }

    const type = typeof toEncrypt;

    console.log(`Encrypting ${type} ${toEncrypt}...`);

    let encrypted;

    if (type === 'number') {
        encrypted = encryptNumber(toEncrypt);
    } else if (type === 'string') {
        encrypted = encryptString(toEncrypt);
    } else {
        throw new Error (`Can't encrypt ${type}`);
    }

    console.log(`Encrypted value: ${encrypted}`);

    return encrypted;
}

$(document).ready(function () {
    keyLoading = new LoadingButton ($('#key-load-button'), $('#key-load-icon'));

    function go(method) {
        let input = $('#text').val().trim();

        if (input === '') return;

        $('#output').val(method(input));
    }

    function handler(method) {
        return function () {
            go(method);
        }
    }

    $('#encrypt').click(handler(encrypt));
    $('#decrypt').click(handler(decrypt));

    $('#up').click(function () {
        $('#text').val($('#output').val());
    });

    keyLoading.button.click(function () {
        keyLoading.setLoading(true, false);

        generateKeyFast( function (err, res) {
            if (err) {
                $('.ifGenerated').hide();
                keyLoading.loading.html('<i class="material-icons warning" title="Could not generate keys.">warning</i>');
            } else {
                $('.ifGenerated').show();

                keyLoading.setLoading(false);

                const {n, e, d} = res;

                $('#n').html(n);
                $('#e').html(e);
                $('#d').html(d);

                publicKey = {n, e};
                privateKey = {n, d};
            }
        } )
    });
});