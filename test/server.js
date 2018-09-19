var expect  = require("chai").expect;
var should = require('chai').should();
var request = require("request");
var JSSoup = require('jssoup').default;
var faucet_constants = require("../lib/faucet_constants");

describe("CryptoFaucet API", function() {
    //the tests take quite long, so increase the default to 10 seconds
    this.timeout(10000);
    describe("tBTC Faucet", function() {

        /*
        it("returns status 200", function() {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
            });
        });
        */
        it("returns the Balance of the Faucet", function(done) {
            var url = "http://localhost:3000/getBalance?cryptoSymbol=tbtc";
            request(url, function(error, response, body) {
                //add parsing of response to find transaction ID
                console.log("body = "+body);
                var retObj = JSON.parse(body);
                expect(retObj.balance).to.be.above(-1);
                done();
            });
        });

        it("returns the TX of a Faucet transction", function(done) {
            var url = "http://localhost:3000/sendCrypto?cryptoSymbol=tbtc&clientAddress="+faucet_constants.TBTC_CLIENT_WALLET_ADDRESS;
            request(url, function(error, response, body) {
                //add parsing of response to find transaction ID
                console.log("body = "+body);
                var retObj = JSON.parse(body);

                expect(retObj.txid.length).to.be.above(0);
                done();
            });
        });


    });

});