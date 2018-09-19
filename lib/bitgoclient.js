var faucet_constants = require("./faucet_constants");
var ACCESS_TOKEN = faucet_constants.BITGOTOKEN;
var BitGo = require('bitgo');

var bitgo = new BitGo.BitGo({
    accessToken: ACCESS_TOKEN,
    env: 'test'
}); // defaults to testnet. add env: 'prod' if you want to go against mainnet

module.exports = bitgo;