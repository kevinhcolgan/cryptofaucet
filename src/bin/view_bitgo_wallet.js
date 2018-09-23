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
const data = {
  type: 'bitcoin',
  id: walletId,
};
wallets.get(data, (err, wallet) => {
  if (err) {
    // handle error
  }
  // Use wallet object here
  console.dir(wallet);
  console.dir(`Balance = ${wallet.balance()}`);
});
