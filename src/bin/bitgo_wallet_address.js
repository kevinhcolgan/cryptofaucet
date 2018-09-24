const bitgo = require('../lib/bitgoclient');

const optionDefinitions = [
  { name: 'wallet_id', type: String, defaultOption: true },

];

const commandLineArgs = require('command-line-args');

const options = commandLineArgs(optionDefinitions);
console.log(options);

const wallets = bitgo.coin('tbtc').wallets();

const walletId = options.wallet_id;
console.log(`walletId = ${walletId}`);

bitgo.coin('tbtc').wallets().get({ id: walletId }, (err, wallet) => {
  if (err) {
    console.error(`err = ${err}`);
    throw err;
  }
  wallet.createAddress({ chain: 0 }, (err, address) => {
    console.dir(address);
  });
});
