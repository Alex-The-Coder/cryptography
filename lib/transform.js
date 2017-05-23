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

function numberify(str) {
    const nums = [];

    for (let i = 0; i < str.length; i++) {
        nums.push(str.charCodeAt(i));
    }

    return nums;
}

function stringify(nums) {
    const letters = [];

    for (let num of nums) {
        letters.push(String.fromCharCode(parseInt(num)));
    }

    return letters;
}

module.exports = { numberify, stringify };