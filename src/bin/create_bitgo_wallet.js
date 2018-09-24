const bitgo = require('../lib/bitgoclient');

const optionDefinitions = [
  { name: 'passphrase', type: String },
  { name: 'label', type: String },

];

const commandLineArgs = require('command-line-args');

const options = commandLineArgs(optionDefinitions);
console.log(options);

let wallet;
const params = {
  passphrase: options.passphrase,
  label: options.label
};
console.log(`attempting to create Faucet tbtc wallet: ${params.label}`);
bitgo.coin('tbtc').wallets()
  .generateWallet({ label: params.label, passphrase: params.passphrase })
  .then((wallet) => {
    // print the new wallet
    console.dir(wallet);
  });
