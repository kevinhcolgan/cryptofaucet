var bitgo = require("../lib/bitgoclient");

var wallet;
var params = {
    "passphrase": "76YB2T5GZYL4D615KWAP",
    "label": "TBTC Faucet Wallet"
}
console.log("attempting to create Faucet tbtc wallet: "+params.label);
bitgo.coin('tbtc').wallets()
    .generateWallet({ label: params.label, passphrase: params.passphrase })
    .then(function(wallet) {
        // print the new wallet
        console.dir(wallet);
    });
