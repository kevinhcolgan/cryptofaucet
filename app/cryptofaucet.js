var faucet_constants = require("../app/faucet_constants");
var cryptofaucet = require("../app/cryptofaucet");
var defaultCryptoSymbol = faucet_constants.TBTC_SYMBOL;


exports.getBalance = function(cryptoSymbol) {
    var useSymbol = cryptoSymbol || defaultCryptoSymbol;
    if(useSymbol === faucet_constants.TBTC_SYMBOL)
    {
        var tbtcWallets = bitgo.coin(faucet_constants.TBTC_SYMBOL).wallets();
        tbtcWallets.get({ "id": faucet_constants.FAUCET_TBTC_WALLET_ID }, function callback(err, wallet) {
            if (err) {
                throw err;
            }
            return wallet.balance();
        });

    }
    //TODO add implementation for other supported crypto symbols like tETH etc.
}

exports.sendCrypto = function(cryptoSymbol,rxAddress) {
    //https://www.bitgo.com/api/v2/#send-transaction

    var useSymbol = cryptoSymbol || defaultCryptoSymbol;
    var tx = null;
    if(useSymbol === faucet_constants.TBTC_SYMBOL)
    {
        var tbtcWallets = bitgo.coin(faucet_constants.TBTC_SYMBOL).wallets();
        //the default granularity of amount for tBTC is satoshi
        let params = {
            amount: faucet_constants.FAUCET_SEND_AMOUNT_TBTC * 1e8,
            address: rxAddress,
            walletPassphrase: process.env.TBTC_FAUCET_WALLET_PASSPHRASE
        };
        tbtcWallets.get({ "id": faucet_constants.FAUCET_TBTC_WALLET_ID }, function callback(err, wallet) {
            if (err) {
                throw err;
            }


            console.log("Balance is: " + (wallet.balance() / 1e8).toFixed(4));
            console.log("Attempting to send : " + (params.amount / 1e8).toFixed(4));
            //console.log(JSON.stringify(wallet));

            wallet.send(params)
                .then(function(transaction) {
                    // print transaction details
                    console.dir(transaction);
                });
        });
    }


}