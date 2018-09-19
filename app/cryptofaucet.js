var bitgo = require("../lib/bitgoclient");

var faucet_constants = require("../lib/faucet_constants");
var cryptofaucet = require("../app/cryptofaucet");
var defaultCryptoSymbol = faucet_constants.TBTC_SYMBOL;


exports.getBalance = function(cryptoSymbol,onComplete) {

    var walletBalance = null;
    var useSymbol = cryptoSymbol || defaultCryptoSymbol;
    if(useSymbol === faucet_constants.TBTC_SYMBOL)
    {

        var useWalletId = faucet_constants.FAUCET_TBTC_WALLET_ID;
        console.log("useWalletId = "+useWalletId);
        bitgo.coin(useSymbol).wallets().get({ "id": useWalletId }, function callback(err, wallet) {
            //console.log("getBalance faucet_constants.FAUCET_TBTC_WALLET_ID = "+faucet_constants.FAUCET_TBTC_WALLET_ID);
            console.log("wallet = "+JSON.stringify(wallet));

            if (err) {
                console.log("err = "+err);
                onComplete(err);
            }
            walletBalance = wallet._wallet.balance;
            onComplete(null,walletBalance);
        });
    }
    else
    {
        onComplete(walletBalance);
    }
    //console.log("getBalance walletBalance = "+walletBalance);
    //TODO add implementation for other supported crypto symbols like tETH etc.

}

exports.sendCrypto = function(cryptoSymbol,rxAddress,onComplete) {
    //https://www.bitgo.com/api/v2/#send-transaction

    var txid = null;
    var useSymbol = cryptoSymbol || defaultCryptoSymbol;
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
                onComplete(err);
            }


            console.log("Balance is: " + (wallet._wallet.balance / 1e8).toFixed(4));
            console.log("Attempting to send : " + (params.amount / 1e8).toFixed(4));
            //console.log(JSON.stringify(wallet));

            wallet.send(params)
            .then(function(transaction) {
                // print transaction details
                console.dir(transaction);
                txid = transaction.txid;
                onComplete(null,txid);
            }).catch(function(e) {
                onComplete(e);
            });
        });
    }
    else
    {
        onComplete(null,txid);
    }


}