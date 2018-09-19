var bitgo = require("../lib/bitgoclient");

const optionDefinitions = [
    { name: "wallet_id", type: String, defaultOption: true },

]

const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);
console.log(options);

var wallets = bitgo.coin('tbtc').wallets();

var walletId = options.wallet_id;
console.log("walletId = "+walletId);

bitgo.coin('tbtc').wallets().get({ "id": walletId }, function callback(err, wallet) {
    if (err) {
        throw err;
    }
    wallet.createAddress({ "chain": 0 }, function callback(err, address) {
        console.dir(address);
    });
});
