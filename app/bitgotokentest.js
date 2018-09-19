var ACCESS_TOKEN = process.env.BITGOTOKEN;
var BitGo = require('bitgo');
var bitgo = new BitGo.BitGo({
    accessToken: ACCESS_TOKEN,
    env: 'test'
}); // defaults to testnet. add env: 'prod' if you want to go against mainnet
bitgo.session({}, function(err,res) {
    console.dir(err);
    console.dir(res);
});