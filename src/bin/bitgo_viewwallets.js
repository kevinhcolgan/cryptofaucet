const cryptofaucet = require('../server/app/cryptofaucet');

const cryptoSymbol = 'tbtc';
cryptofaucet.getWallets(cryptoSymbol, (err, walletsList) => {
  if (err) {
    console.error(`err = ${err}`);
  }
  console.log(walletsList);
});
