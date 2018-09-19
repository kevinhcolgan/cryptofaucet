var faucet_constants = require("../app/faucet_constants");
var cryptofaucet = require("../app/cryptofaucet");
var defaultCryptoSymbol = faucet_constants.TBTC_SYMBOL;

var tbtcWallets = bitgo.coin(faucet_constants.TBTC_SYMBOL).wallets();

var tbtcFaucetWallet = wallets.get({ "id": faucet_constants.FAUCET_TBTC_WALLET_ID }, function callback(err, wallet) {
    if (err) {
        throw err;
    }
});;
exports.getBalance = function(cryptoSymbol) {
    var useSymbol = cryptoSymbol || defaultCryptoSymbol;
    if(useSymbol === faucet_constants.TBTC_SYMBOL)
    {
        return tbtcFaucetWallet.balance();
    }
    //TODO add implementation for other supported crypto symbols like tETH etc.
}

exports.sendCrypto = function(cryptoSymbol,rxAddress) {
    //https://www.bitgo.com/api/v2/#send-transaction

    var useSymbol = cryptoSymbol || defaultCryptoSymbol;
    var tx = null;
    if(useSymbol === faucet_constants.TBTC_SYMBOL)
    {
        //the default granularity of amount for tBTC is satoshi
        let params = {
            amount: faucet_constants.FAUCET_SEND_AMOUNT_TBTC,
            address: '2NFfxvXpAWjKng7enFougtvtxxCJ2hQEMo4',
            walletPassphrase: 'secretpassphrase1a5df8380e0e30'
        };
        tbtcFaucetWallet.send(params)
            .then(function(transaction) {
                // print transaction details
                console.dir(transaction);
                tx = transaction;
            });
    }


}