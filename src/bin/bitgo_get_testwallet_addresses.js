const bitgo = require('../lib/bitgoclient');
const constants = require('../lib/faucet_constants');


const id = constants.TEST_TBTC_CLIENT_WALLET_ID;
bitgo.coin('tbtc').wallets().get({ id }, (err, wallet) => {
  if (err) {
    throw err;
  }
  wallet.createAddress({ chain: 0 }, (err, address) => {
    console.dir(address);
  });
});
