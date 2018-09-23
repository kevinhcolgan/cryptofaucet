const BitGo = require('bitgo');
const faucetConstants = require('./faucet_constants');

const ACCESS_TOKEN = faucetConstants.BITGOTOKEN;


const bitgo = new BitGo.BitGo({
  accessToken: ACCESS_TOKEN,
  env: 'test'
}); // defaults to testnet. add env: 'prod' if you want to go against mainnet

module.exports = bitgo;
