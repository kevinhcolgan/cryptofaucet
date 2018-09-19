var bitgo = require("../lib/bitgoclient");
var constants = require("../app/faucet_constants");

let faucetWalletId = constants.FAUCET_TBTC_WALLET_ID;

var wallets = bitgo.coin('tbtc').wallets();
var data = {
    "type": "bitcoin",
    "id": faucetWalletId,
};
wallets.get(data, function callback(err, wallet) {
    if (err) {
        // handle error
    }
    // Use wallet object here
    console.dir(wallet);
    console.dir(wallet.balance());
});
