/* global it, describe */
/* eslint-disable import/no-extraneous-dependencies,no-unused-expressions,no-shadow,max-len */
const { expect } = require('chai');
const bitgo = require('../../lib/bitgoclient');
const faucetConstants = require('../../lib/faucet_constants');

require('dotenv').config();

const TBTC_FAUCET_WALLET_ID = '5ba2627ee7e9cec603301e649e9901df';
const TBTC_CLIENT_WALLET_ID = '5ba22fd795b7b7a90335ca8b2b60df24';
const TBTC_FAUCET_WALLET_ADDRESS = '2MsocUszkXN5nhtuMqB469jwqM15RfVHzDB';

faucetConstants.TBTC_SYMBOL = 'tbtc';
faucetConstants.FAUCET_TBTC_WALLET_ID = TBTC_FAUCET_WALLET_ID;
faucetConstants.FAUCET_TBTC_WALLET_ADDRESS = TBTC_FAUCET_WALLET_ADDRESS;
faucetConstants.TEST_TBTC_CLIENT_WALLET_ID = TBTC_CLIENT_WALLET_ID;
faucetConstants.FAUCET_SEND_AMOUNT_TBTC = 0.0001;


const cryptofaucet = require('../app/cryptofaucet');

const tbtcSymbol = faucetConstants.TBTC_SYMBOL;
const tbtcWallets = bitgo.coin(tbtcSymbol).wallets();


describe('Crypto Faucet', function () {
  // the tests take quite long, so increase the default to 10 seconds
  this.timeout(20000);
  describe('tBTC Faucet initialisation', () => {
    it('checks the balance of the TBTC Faucet is greater than 0', (done) => {
      // check balance of wallet is available
      cryptofaucet.getBalance(tbtcSymbol, (err, walletBalance) => {
        console.log(`walletBalance = ${walletBalance}`);
        expect(walletBalance).to.be.above(0);
        done();
      });
    });
  });

  describe('tBTC sending', () => {
    it('sends tBTC to a test tBTC address', (done) => {
      const cryptoSymbol = 'tbtc';

      // initialise test wallet
      tbtcWallets.get({ id: faucetConstants.TEST_TBTC_CLIENT_WALLET_ID }, (err, testBtcWallet) => {
        if (err) {
          throw err;
        }
        // create a test wallet address to receive crypto to
        let rxAddress;
        // https://www.bitgo.com/api/v2/#create-wallet-address
        testBtcWallet.createAddress({ chain: 0 }, (err, address) => {
          expect(err).to.be.null;
          console.dir(address);
          rxAddress = address.address;

          // send a small amount of tBTC from faucet wallet to test wallet address
          // store the TX hash used
          cryptofaucet.sendCrypto(cryptoSymbol, rxAddress, (err, sendTx) => {
            expect(err).to.be.null;

            // open the faucet wallet and check the transactions
            tbtcWallets.get({ id: faucetConstants.FAUCET_TBTC_WALLET_ID }, (err, faucetBtcWallet) => {
              expect(err).to.be.null;
              const transactionId = sendTx;

              console.log(`transactionId = ${transactionId}`);
              console.log(`faucetBtcWallet = ${JSON.stringify(faucetBtcWallet)}`);
              // https://www.bitgo.com/api/v2/#get-wallet-transfer
              faucetBtcWallet.getTransfer({ id: transactionId })
                .then((transfer) => {
                  // print the transfer object
                  console.dir(`faucetBtcWallet transfer.id = ${transfer.id}`);
                  expect(transfer.id).to.equal(sendTx);

                  // check that the transaction details are correct
                  const txOutput = transfer.outputs[0];
                  expect(txOutput.account).to.equal(rxAddress);
                  expect(txOutput.value).to.equal(faucetConstants.FAUCET_SEND_AMOUNT_TBTC);

                  // check that the transaction is correctly recorded for the test wallet too
                  console.dir(`testing that the trasaction ${transfer.id} is in test wallet too`);
                  bitgo.coin(tbtcSymbol).wallets().get({ id: faucetConstants.TEST_TBTC_CLIENT_WALLET_ID }, (err, testBtcWallet) => {
                    expect(err).to.be.null;
                    console.log(`testBtcWallet = ${JSON.stringify(testBtcWallet)}`);
                    testBtcWallet.getTransfer({ id: transactionId })
                      .then((transfer) => {
                        console.dir(`testBtcWallet transfer.id = ${transfer.id}`);

                        // check that the transaction id is the same as the one that cryptofaucet returned
                        expect(transfer.id).to.equal(sendTx);

                        // check that the transaction details are correct
                        const txEntries = transfer.entries[0];
                        expect(txEntries.account).to.equal(rxAddress);
                        expect(txEntries.value).to.equal(faucetConstants.FAUCET_SEND_AMOUNT_TBTC);
                        done();
                      }).catch((err) => {
                        expect(err).to.be.null;
                        done();
                      });
                  });
                }).catch((err) => {
                  expect(err).to.be.null;
                  done();
                });
            });
          });
        });
      });
    });
  });
});
