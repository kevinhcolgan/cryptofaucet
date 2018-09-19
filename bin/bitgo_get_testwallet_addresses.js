var bitgo = require("../lib/bitgoclient");
var constants = require("../app/faucet_constants");


var id = constants.TEST_CLIENT_WALLET_ID;
bitgo.coin('tbtc').wallets().get({ "id": id }, function callback(err, wallet) {
    if (err) {
        throw err;
    }
    wallet.createAddress({ "chain": 0 }, function callback(err, address) {
        console.dir(address);
    });
});
