Array.make = function (len, val) {
    const arr = [];

    let i = len;
    while(i--){
        arr.push(val);
    }

    return arr;
};

// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
function eratosthenes(n) {
    // Create an array of n length where all values are true (i.e. all values are set to prime at first)
    const arr = Array.make(n, true);

    // Start at the first prime number
    for(let i = 2; i <= Math.sqrt(arr.length); i++){
        // If it's prime, remove all multiples
        if(arr[i]){
            // Set j to i^2 so it's not repeating, remove multiples by adding by i
            for(let j = i << 1; j < arr.length; j += i){
                arr[j] = false;
            }
        }
    }

    // Since it needs to be mapped by index, uh... do that
    const out = [];

    for(let i = 2; i < arr.length; i++){
        if(arr[i]){
            out.push(i);
        }
    }

    return out;
}

exports.getPrimes = eratosthenes;