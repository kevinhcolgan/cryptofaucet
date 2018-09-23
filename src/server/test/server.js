/* global it, describe */
/* eslint-disable import/no-extraneous-dependencies,no-unused-expressions,no-shadow,max-len */
const { expect } = require('chai');
const request = require('request');
const faucetConstants = require('../../lib/faucet_constants');

const testPort = 8080;
describe('CryptoFaucet API', function () {
  // the tests take quite long, so increase the default to 10 seconds
  this.timeout(10000);
  describe('tBTC Faucet', () => {
    /*
        it("returns status 200", function() {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
            });
        });
        */
    it('returns the Balance of the Faucet', (done) => {
      const url = `http://localhost:${testPort}/app/getBalance?cryptoSymbol=tbtc`;
      request(url, (error, response, body) => {
        // add parsing of response to find transaction ID
        console.log(`body = ${body}`);
        const retObj = JSON.parse(body);
        expect(retObj.balance).to.be.above(-1);
        done();
      });
    });

    it('returns the TX of a Faucet transction', (done) => {
      const url = `http://localhost:${testPort}/app/sendCrypto?cryptoSymbol=tbtc&clientAddress=${faucetConstants.TBTC_CLIENT_WALLET_ADDRESS}`;
      request(url, (error, response, body) => {
        // add parsing of response to find transaction ID
        console.log(`body = ${body}`);
        const retObj = JSON.parse(body);

        expect(retObj.txid.length).to.be.above(0);
        done();
      });
    });
  });
});
