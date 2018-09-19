var faucet_constants = require("../app/faucet_constants");
var expect    = require("chai").expect;
var bitgo = require("../lib/bitgoclient");

var TBTC_FAUCET_WALLET_ID="5ba2627ee7e9cec603301e649e9901df";
var TBTC_CLIENT_WALLET_ID="5ba22fd795b7b7a90335ca8b2b60df24";
var TBTC_FAUCET_WALLET_ADDRESS="2MsocUszkXN5nhtuMqB469jwqM15RfVHzDB";

faucet_constants.TBTC_SYMBOL = "tbtc";
faucet_constants.FAUCET_TBTC_WALLET_ID = TBTC_FAUCET_WALLET_ID;
faucet_constants.FAUCET_TBTC_WALLET_ADDRESS = TBTC_FAUCET_WALLET_ADDRESS;
faucet_constants.TEST_TBTC_CLIENT_WALLET_ID = TBTC_CLIENT_WALLET_ID;
faucet_constants.FAUCET_SEND_AMOUNT_TBTC = 0.0001;



var cryptofaucet = require("../app/cryptofaucet");

var tbtcSymbol = faucet_constants.TBTC_SYMBOL;
var tbtcWallets = bitgo.coin(tbtcSymbol).wallets();


describe("Crypto Faucet", function() {
    //the tests take quite long, so increase the default to 10 seconds
    this.timeout(10000);
    describe("tBTC Faucet initialisation", function() {
        it("checks the balance of the TBTC Faucet is greater than 0", function(done) {
            //check balance of wallet is available
            cryptofaucet.getBalance(tbtcSymbol,function(err,walletBalance)
            {
                console.log("walletBalance = "+walletBalance)
                expect(walletBalance).to.be.above(0);
                done();
            });
        });
    });

    describe("tBTC sending", function() {
        it("sends tBTC to a test tBTC address", function(done) {
            var cryptoSymbol = "tbtc";

            //initialise test wallet
            tbtcWallets.get({ "id": faucet_constants.TEST_TBTC_CLIENT_WALLET_ID }, function callback(err, testBtcWallet) {
                if (err) {
                    throw err;
                }
                //create a test wallet address to receive crypto to
                var rxAddress;
                //https://www.bitgo.com/api/v2/#create-wallet-address
                testBtcWallet.createAddress({ "chain": 0 }, function callback(err, address) {
                    expect(err).to.be.null;
                    console.dir(address);
                    rxAddress = address.address;

                    //send a small amount of tBTC from faucet wallet to test wallet address
                    //store the TX hash used
                    cryptofaucet.sendCrypto(cryptoSymbol,rxAddress,function callback(err,sendTx){
                        expect(err).to.be.null;

                        //open the faucet wallet and check the transactions
                        tbtcWallets.get({ "id": faucet_constants.FAUCET_TBTC_WALLET_ID }, function callback(err, faucetBtcWallet) {
                            expect(err).to.be.null;
                            var transactionId = sendTx;

                            console.log("transactionId = "+transactionId);
                            //https://www.bitgo.com/api/v2/#get-wallet-transfer
                            faucetBtcWallet.getTransfer({ id: transactionId })
                                .then(function(transfer) {
                                    // print the transfer object
                                    console.dir("faucetBtcWallet transfer.id = "+transfer.id);
                                    expect(transfer.id).to.equal(sendTx);

                                    //check that the transaction details are correct
                                    var txOutput = transfer.outputs[0];
                                    expect(txOutput.account).to.equal(rxAddress);
                                    expect(txOutput.value).to.equal(faucet_constants.FAUCET_SEND_AMOUNT_TBTC);

                                    //check that the transaction is correctly recorded for the test wallet too
                                    tbtcWallets.get({ "id": faucet_constants.TEST_TBTC_CLIENT_WALLET_ID }, function callback(err, testBtcWallet) {
                                        expect(err).to.be.null;
                                        testBtcWallet.getTransfer({ id: transactionId })
                                            .then(function(transfer) {
                                            console.dir("testBtcWallet transfer.id = "+transfer.id);

                                                //check that the transaction id is the same as the one that cryptofaucet returned
                                                expect(transfer.id).to.equal(sendTx);

                                                //check that the transaction details are correct
                                                var txEntries = transfer.entries[0];
                                                expect(txEntries.account).to.equal(rxAddress);
                                                expect(txEntries.value).to.equal(faucet_constants.FAUCET_SEND_AMOUNT_TBTC);
                                                done();
                                            }).catch(function(err) {
                                                expect(err).to.be.null;
                                                done();
                                            });
                                    });

                                }).catch(function(err) {
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