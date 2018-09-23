const bitgo = require('../lib/bitgoclient');
const constants = require('../lib/faucet_constants');

const faucetWalletId = constants.FAUCET_TBTC_WALLET_ID;

const wallets = bitgo.coin('tbtc').wallets();
const data = {
  type: 'bitcoin',
  id: faucetWalletId,
};
wallets.get(data, (err, wallet) => {
  if (err) {
    // handle error
  }
  // Use wallet object here
  console.dir(wallet);
  console.dir(wallet.balance());
});
