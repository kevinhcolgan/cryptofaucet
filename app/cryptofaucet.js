var bitgo = require("../lib/bitgoclient");

var faucet_constants = require("../app/faucet_constants");
var cryptofaucet = require("../app/cryptofaucet");
var defaultCryptoSymbol = faucet_constants.TBTC_SYMBOL;


exports.getBalance = function(cryptoSymbol,onComplete) {

    var walletBalance = null;
    var useSymbol = cryptoSymbol || defaultCryptoSymbol;
    if(useSymbol === faucet_constants.TBTC_SYMBOL)
    {

        var useWalletId = faucet_constants.FAUCET_TBTC_WALLET_ID;

        bitgo.coin(useSymbol).wallets().get({ "id": useWalletId }, function callback(err, wallet) {
            //console.log("getBalance faucet_constants.FAUCET_TBTC_WALLET_ID = "+faucet_constants.FAUCET_TBTC_WALLET_ID);
            console.log("wallet._wallet.balance = "+wallet._wallet.balance);

            if (err) {
                console.log("err = "+err);
                throw err;
            }
            walletBalance = wallet._wallet.balance;
            onComplete(walletBalance);
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
                throw err;
            }


            console.log("Balance is: " + (wallet.balance() / 1e8).toFixed(4));
            console.log("Attempting to send : " + (params.amount / 1e8).toFixed(4));
            //console.log(JSON.stringify(wallet));

            wallet.send(params)
                .then(function(transaction) {
                    // print transaction details
                    console.dir(transaction);
                    txid = transaction.txid;
                    onComplete(txid);
                });
        });
    }
    else
    {
        onComplete(txid);
    }


}