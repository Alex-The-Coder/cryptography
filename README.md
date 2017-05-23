# Cryptography

This is a final project for my AP Calculus AB class. It features two RSA implementations, one of which I wrote on my own based on very loose steps outlined on the internet, and one I referenced the working example on wikipedia for (but made some changes). The wikipedia one is much faster, and actually works...

Additionally, this repository houses a Cesarean cipher.

## Directories

### assets/

This houses the webpages that are used to display the cesarean cipher and RSA implementation.

### lib/

This houses both RSA implementations, along with some helper functions for the slow one.

### app.js

This houses the express app that runs the web pages.

### crypto.js

This isn't used, but holds functions for encrypting/decrypting text/numbers.

### main.js

This also isn't used, but called crypto.