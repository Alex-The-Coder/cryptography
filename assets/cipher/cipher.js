/*
 To avoid issues with symbols, just make it all lowercase.
 a is charcode 97 and z is charcode 122, so we modulo on the difference and then add 97 to it.
 */
const letterRange = ('~'.charCodeAt(0) - ' '.charCodeAt(0));
const start = ' '.charCodeAt(0);

function shift(str, amount) {
    console.log(`Amount: ${amount}`);

    let newStr = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            newStr += ' ';
            continue;
        }

        let char = str.charCodeAt(i);

        console.log(`Start: ${char}`);

        let newChar = char + amount;

        console.log(`New: ${newChar}`);

        newChar -= start;

        console.log(`Relative to start: ${newChar}`);

        newChar = newChar % letterRange;

        console.log(`Modulo'd: ${newChar}`);

        if (newChar < 0) {
            newChar += letterRange;
        }

        newChar += start;

        console.log(`Put back to start: ${newChar}`);

        newStr += String.fromCharCode(newChar);
    }

    return newStr;
}

$(document).ready(function () {
    $('#encrypt').click(function () {
        let text = $('#text').val();

        let amount = parseInt($('#shiftCount').val());

        $('#output').val(shift(text, amount));
    });
});