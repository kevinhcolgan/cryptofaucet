var cryptofaucet = require("../app/cryptofaucet");

var cryptoSymbol = "tbtc";
cryptofaucet.getWallets(cryptoSymbol,(err,walletsList) => {
    if (err) {
        console.log("err = "+err);
        onComplete(err);
    }
    console.log(walletsList);
});


