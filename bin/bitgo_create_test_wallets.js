var bitgo = require("../lib/bitgoclient");

var wallet;
var params = {
    "passphrase": "CafswCOoSTyzYiagDpeU",
    "label": "testwallet1"
}
console.log("attempting to create tbtc wallet "+params.label);
bitgo.coin('tbtc').wallets()
    .generateWallet({ label: params.label, passphrase: params.passphrase })
    .then(function(wallet) {
        // print the new wallet
        console.dir(wallet);
    });

params = {
    "passphrase": "LsiaBVCx1eKJBccnQD1l",
    "label": "testwallet2"
}

console.log("attempting to create tbtc wallet "+params.label);
bitgo.coin('tbtc').wallets()
    .generateWallet({ label: params.label, passphrase: params.passphrase })
    .then(function(wallet) {
        // print the new wallet
        console.dir(wallet);
    });
