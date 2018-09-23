var cryptofaucet = require("../app/cryptofaucet");

cryptofaucet.testSession((err,res) => {
    if (err) {
        console.log("err = "+err);
        onComplete(err);
    }
    console.log(res);
});
