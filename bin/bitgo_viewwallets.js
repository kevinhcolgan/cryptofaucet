var bitgo = require("../lib/bitgoclient");


var wallets = bitgo.coin('tbtc').wallets();
wallets.list({}, function callback(err, data) {
// handle error, do something with wallets
    for (var id in data.wallets) {
        //console.dir("data.wallets["+id+"] = "+JSON.stringify(data.wallets[id]));
        var wallet = data.wallets[id]._wallet;
        var shortenedObj = {
            "id":wallet.id,
            "label":wallet.label,
            //"latest_address":wallet.receiveAddress.address,
            "balance":wallet.balance
        };
        console.log(shortenedObj);
    }
});

