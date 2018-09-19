var expect    = require("chai").expect;
var faucet_constants = require("../app/faucet_constants");
var cryptofaucet = require("../app/cryptofaucet");

var tbtcSymbol = faucet_constants.TBTC_SYMBOL;
var tbtcWallets = bitgo.coin(tbtcSymbol).wallets();


describe("Crypto Faucet", function() {
    describe("tBTC Faucet initialisation", function() {
        it("checks the balance of the TBTC Faucet is greater than 0", function(done) {
            //check balance of wallet is available
            var initialBalance = cryptofaucet.getBalance(tbtcSymbol);
            expect(initialBalance).to.be.above(0);

            done();
        });
    });
    describe("tBTC sending", function() {
        it("sends tBTC to a test tBTC address", function(done) {
            var cryptoSymbol = "tbtc";

            //initialise test wallet
            var testBtcWallet = tbtcWallets.get({ "id": faucet_constants.TEST_TBTC_CLIENT_WALLET_ID }, function callback(err, wallet) {
                if (err) {
                    throw err;
                }
            });;


            //create a test wallet address to receive crypto to
            var rxAddress;
            testBtcWallet.createAddress({ "chain": 0 }, function callback(err, address) {
                console.dir(address);
                rxAddress = address;
            });

            //send a small amount of tBTC from faucet wallet to test wallet address
            //store the TX hash used
            var sendTx = cryptofaucet.sendCrypto(cryptoSymbol,rxAddress);

            //check that the faucet wallet has a pending transaction for the testAddress
            var faucetBtcWallet = tbtcWallets.get({ "id": faucet_constants.FAUCET_TBTC_WALLET_ID }, function callback(err, wallet) {
                if (err) {
                    throw err;
                }
            });
            var transactionId = sendTx;

            //https://bitgo.github.io/bitgo-docs/#get-wallet-transaction
            faucetBtcWallet.getTransaction({ "id": transactionId }, function callback(err, transaction) {
                console.log(JSON.stringify(transaction, null, 4));

                //check that the transaction id is the same as the one that cryptofaucet returned
                expect(transaction.id).to.equal(sendTx);

                //check that the transaction details are correct
                var txOutput = transaction.outputs[0];
                expect(txOutput.account).to.equal(rxAddress);
                expect(txOutput.value).to.equal(faucet_constants.FAUCET_SEND_AMOUNT_TBTC);
            });

            //check that the transaction is correctly recorded for the test wallet
            testBtcWallet.getTransaction({ "id": transactionId }, function callback(err, transaction) {
                console.log(JSON.stringify(transaction, null, 4));

                //check that the transaction id is the same as the one that cryptofaucet returned
                expect(transaction.id).to.equal(sendTx);

                //check that the transaction details are correct
                var txEntries = transaction.entries[0];
                expect(txEntries.account).to.equal(rxAddress);
                expect(txEntries.value).to.equal(faucet_constants.FAUCET_SEND_AMOUNT_TBTC);
            });

            done();
        });
    });

});