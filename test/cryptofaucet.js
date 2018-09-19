var expect    = require("chai").expect;
var faucet_constants = require("../app/faucet_constants");
var cryptofaucet = require("../app/cryptofaucet");

var wallets = bitgo.coin("tbtc").wallets();


describe("Crypto Faucet", function() {
    describe("Faucet initialisation", function() {
        it("checks the balance of the Faucet is greater than 0", function() {
            //check balance of wallet is available
            var initialBalance = cryptofaucet.getBalance();
            expect(initialBalance).to.be.above(0);
        });
    });
    describe("tBTC sending", function() {
        it("sends tBTC to a valid tBTC address", function() {
            var cryptoSymbol = "tbtc";

            //initialise test wallet
            var testWallet = wallets.get({ "id": faucet_constants.TEST_CLIENT_WALLET_ID }, function callback(err, wallet) {
                if (err) {
                    throw err;
                }
            });;


            //create a test wallet address to receive crypto to
            var rxAddress;
            testWallet.createAddress({ "chain": 0 }, function callback(err, address) {
                console.dir(address);
                rxAddress = address;
            });

            //send a small amount of tBTC from faucet wallet to test wallet address
            //store the TX hash used
            var sendTx = cryptofaucet.sendCrypto(cryptoSymbol,rxAddress);

            //check that the faucet wallet has a pending transaction for the testAddress
            var faucetWallet = wallets.get({ "id": faucet_constants.FAUCET_WALLET_ID }, function callback(err, wallet) {
                if (err) {
                    throw err;
                }
            });;
            var transactionId = sendTx;

            //https://bitgo.github.io/bitgo-docs/#get-wallet-transaction
            faucetWallet.getTransaction({ "id": transactionId }, function callback(err, transaction) {
                console.log(JSON.stringify(transaction, null, 4));

                //check that the transaction id is the same as the one that cryptofaucet returned
                expect(transaction.id).to.equal(sendTx);

                //check that the transaction details are correct
                var txOutput = transaction.outputs[0];
                expect(txOutput.account).to.equal(rxAddress);
                expect(txOutput.value).to.equal(faucet_constants.FAUCET_SEND_AMOUNT_TBTC);
            });

            //check that the transaction is correctly recorded for the test wallet
            testWallet.getTransaction({ "id": transactionId }, function callback(err, transaction) {
                console.log(JSON.stringify(transaction, null, 4));

                //check that the transaction id is the same as the one that cryptofaucet returned
                expect(transaction.id).to.equal(sendTx);

                //check that the transaction details are correct
                var txEntries = transaction.entries[0];
                expect(txEntries.account).to.equal(rxAddress);
                expect(txEntries.value).to.equal(faucet_constants.FAUCET_SEND_AMOUNT_TBTC);
            });
        });
    });

    describe("tETH sending", function() {
        it("sends tETH to a valid tETH address", function() {

        });
    });
});