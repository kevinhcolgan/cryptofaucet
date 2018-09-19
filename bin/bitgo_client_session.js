var bitgo = require("../lib/bitgoclient");
bitgo.session({}, function(err,res) {
    console.dir(err);
    console.dir(res);
});