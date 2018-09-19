var bitgo = require("../lib/bitgoclient");

const optionDefinitions = [
    { name: "wallet_id", type: String, defaultOption: true },

]

const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);
console.log(options);

var wallets = bitgo.coin('tbtc').wallets();

var walletId = options.wallet_id;
console.log("walletId = "+walletId)
var data = {
    "type": "bitcoin",
    "id": walletId,
};
wallets.get(data, function callback(err, wallet) {
    if (err) {
        // handle error
    }
    // Use wallet object here
    console.dir(wallet);
    console.dir("Balance = "+wallet.balance());
});