const bitgo = require('../../lib/bitgoclient');

const faucet_constants = require('../../lib/faucet_constants');
const cryptofaucet = require('../app/cryptofaucet');

const defaultCryptoSymbol = faucet_constants.TBTC_SYMBOL;


exports.testSession = function (onComplete) {
  bitgo.session({}, (err, res) => {
    if (err) {
      console.error(`err = ${err}`);
      onComplete(err);
    } else {
      onComplete(null, res);
    }
  });
};
exports.getWallets = function (cryptoSymbol, onComplete) {
  const walletsList = [];
  bitgo.coin(cryptoSymbol).wallets().list({}, (err, data) => {
    if (err) {
      console.error(`err = ${err}`);
      onComplete(err);
    }
    for (const id in data.wallets) {
      // console.dir("data.wallets["+id+"] = "+JSON.stringify(data.wallets[id]));
      const wallet = data.wallets[id]._wallet;
      const shortenedObj = {
        id: wallet.id,
        label: wallet.label,
        // "latest_address":wallet.receiveAddress.address,
        balance: wallet.balance
      };
      walletsList.push(shortenedObj);
      // console.log(shortenedObj);
    }
    onComplete(null, walletsList);
  });
};
exports.getBalance = function (cryptoSymbol, onComplete) {
  let walletBalance = null;
  const useSymbol = cryptoSymbol || defaultCryptoSymbol;
  if (useSymbol === faucet_constants.TBTC_SYMBOL) {
    const useWalletId = faucet_constants.FAUCET_TBTC_WALLET_ID;
    console.log(`useWalletId = ${useWalletId}`);
    bitgo.coin(useSymbol).wallets().get({ id: useWalletId }, (err, wallet) => {
      console.log(`wallet = ${JSON.stringify(wallet)}`);

      if (err) {
        console.log(`err = ${err}`);
        onComplete(err);
      }
      walletBalance = wallet._wallet.balance;
      onComplete(null, walletBalance);
    });
  } else {
    onComplete(walletBalance);
  }
  // console.log("getBalance walletBalance = "+walletBalance);
  // TODO add implementation for other supported crypto symbols like tETH etc.
};

exports.sendCrypto = function (cryptoSymbol, rxAddress, onComplete) {
  // https://www.bitgo.com/api/v2/#send-transaction

  const useSymbol = cryptoSymbol || defaultCryptoSymbol;
  if (useSymbol === faucet_constants.TBTC_SYMBOL) {
    const tbtcWallets = bitgo.coin(faucet_constants.TBTC_SYMBOL).wallets();
    // the default granularity of amount for tBTC is satoshi
    const params = {
      amount: faucet_constants.FAUCET_SEND_AMOUNT_TBTC * 1e8,
      address: rxAddress,
      walletPassphrase: process.env.TBTC_FAUCET_WALLET_PASSPHRASE
    };
    tbtcWallets.get({ id: faucet_constants.FAUCET_TBTC_WALLET_ID }, (err, wallet) => {
      if (err) {
        onComplete(err);
      }


      console.log(`Balance is: ${(wallet._wallet.balance / 1e8).toFixed(4)}`);
      console.log(`Attempting to send : ${(params.amount / 1e8).toFixed(4)}`);
      // console.log(JSON.stringify(wallet));

      wallet.send(params)
        .then((transaction) => {
          // print transaction details
          console.dir(transaction);
          const { txid } = transaction;
          onComplete(null, txid);
        }).catch((e) => {
          onComplete(e);
        });
    });
  } else {
    onComplete(null, null);
  }
};
