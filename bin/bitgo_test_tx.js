var bitgo = require("../lib/bitgoclient");

var faucet_constants = require("../app/faucet_constants");

var tbtcSymbol = faucet_constants.TBTC_SYMBOL;
var tbtcWallets = bitgo.coin(tbtcSymbol).wallets();

var faucetBtcWallet = tbtcWallets.get({ "id": faucet_constants.FAUCET_TBTC_WALLET_ID }, function callback(err, wallet) {
    if (err) {
        throw err;
    }

    var rxAddress;
    var testBtcWallet = tbtcWallets.get({ "id": faucet_constants.TEST_TBTC_CLIENT_WALLET_ID }, function callback(err, wallet) {
        if (err) {
            throw err;
        }
        //create a test wallet address to receive crypto to

        wallet.createAddress({ "chain": 0 }, function callback(err, address) {
            console.dir(address);
            rxAddress = address.address;
            console.log("rxAddress = "+JSON.stringify(rxAddress));
            let params = {
                //amount: faucet_constants.FAUCET_SEND_AMOUNT_TBTC,
                amount:100000,
                address: rxAddress,
                walletPassphrase: process.env.TBTC_FAUCET_WALLET_PASSPHRASE
            };
            sendTX(params);
        });
    });
});

function sendTX(params)
{

    bitgo.coin(tbtcSymbol).wallets().get({id: faucet_constants.FAUCET_TBTC_WALLET_ID}, function(err, wallet) {
        if (err) { console.log("Error getting wallet!"); console.dir(err); return process.exit(-1); }
        console.log("Balance is: " + (wallet.balance() / 1e8).toFixed(4));
        //console.log(JSON.stringify(wallet));

        wallet.send(params)
            .then(function(transaction) {
                // print transaction details
                console.dir(transaction);
            });
    });

}


