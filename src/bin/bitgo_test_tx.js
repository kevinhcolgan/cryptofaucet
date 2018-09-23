const bitgo = require('../lib/bitgoclient');

const faucet_constants = require('../lib/faucet_constants');

const tbtcSymbol = faucet_constants.TBTC_SYMBOL;
const tbtcWallets = bitgo.coin(tbtcSymbol).wallets();

const faucetBtcWallet = tbtcWallets.get({ id: faucet_constants.FAUCET_TBTC_WALLET_ID }, (err, wallet) => {
  if (err) {
    throw err;
  }

  let rxAddress;
  const testBtcWallet = tbtcWallets.get({ id: faucet_constants.TEST_TBTC_CLIENT_WALLET_ID }, (err, wallet) => {
    if (err) {
      throw err;
    }
    // create a test wallet address to receive crypto to

    wallet.createAddress({ chain: 0 }, (err, address) => {
      console.dir(address);
      rxAddress = address.address;
      console.log(`rxAddress = ${JSON.stringify(rxAddress)}`);
      const params = {
        // amount: faucet_constants.FAUCET_SEND_AMOUNT_TBTC,
        amount: 0.01 * 1e8,
        address: rxAddress,
        walletPassphrase: process.env.TBTC_FAUCET_WALLET_PASSPHRASE
      };
      sendTX(params);
    });
  });
});

function sendTX(params) {
  bitgo.coin(tbtcSymbol).wallets().get({ id: faucet_constants.FAUCET_TBTC_WALLET_ID }, (err, wallet) => {
    if (err) { console.log('Error getting wallet!'); console.dir(err); return process.exit(-1); }
    console.log(`Balance is: ${(wallet.balance() / 1e8).toFixed(4)}`);
    console.log(`Attempting to send : ${(params.amount / 1e8).toFixed(4)}`);
    // console.log(JSON.stringify(wallet));

    wallet.send(params)
      .then((transaction) => {
        // print transaction details
        console.dir(transaction);
      });
  });
}
