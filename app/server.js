var express = require("express");
var app = express();
var cryptofaucet = require("./cryptofaucet");

app.get("/getBalance", function(req, res) {
    var cryptoSymbol = req.query.cryptoSymbol;
    var clientAddress = req.query.clientAddress;


    cryptofaucet.getBalance(cryptoSymbol,function(err,balance){
        var retObj ={ balance: balance };
        if(err)
        {
            var retObj ={ error: err };
        }

        var retObj ={ balance: balance };
        console.dir("getBalance returning = "+JSON.stringify(retObj));
        res.json(retObj);
    });
});
app.get("/sendCrypto", function(req, res) {
    var cryptoSymbol = req.query.cryptoSymbol;
    var clientAddress = req.query.clientAddress;

    cryptofaucet.sendCrypto(cryptoSymbol,clientAddress,function(err,txid){
        var retObj ={ txid: txid };
        if(err)
        {
            var retObj ={ error: err };
        }

        console.dir("sendCrypto returning = "+JSON.stringify(retObj));
        res.json(retObj);
    });
});
var port = 3000;
app.listen(port,() => console.log(`CryptoFaucet app listening on port ${port}!`));