const express = require('express');

const app = express();

const cryptofaucet = require('./app/cryptofaucet');

const utils = require('../lib/utils');

const faucetConstants = require('../lib/faucet_constants')

app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/getBalance', (req, res) => {
  console.info('/api/getBalance called');
  const { cryptoSymbol } = req.query;


  cryptofaucet.getBalance(cryptoSymbol, (err, balance) => {
    let retBalance = balance;
    console.dir(`first retBalance returning = ${retBalance}`);
    if (retBalance) {
      retBalance = utils.satashiToBtc(retBalance);
    }
    let retObj = { balance: retBalance };
    retObj.statusCode = faucetConstants.APP_STATUS.BALANCE_SUCCESS;
    if (err) {
      retObj = { error: err };
      retObj.statusCode = faucetConstants.APP_STATUS.BALANCE_FAILED;
    }

    console.dir(`getBalance returning = ${JSON.stringify(retObj)}`);
    res.json(retObj);
  });
});
app.get('/api/sendCrypto', (req, res) => {
  const { cryptoSymbol } = req.query;
  const { clientAddress } = req.query;

  cryptofaucet.sendCrypto(cryptoSymbol, clientAddress, (err, txid) => {

    let retObj = { txid };
    retObj.statusCode = faucetConstants.APP_STATUS.TX_SUCCESS;

    retObj.statusMessage = `Successfully sent ${faucetConstants.FAUCET_SEND_AMOUNT_TBTC} to ${clientAddress}`;
    retObj.address = clientAddress;
    if (err) {
      retObj.statusCode = faucetConstants.APP_STATUS.TX_FAILED;
      retObj.statusMessage = `There was a problem sending to ${clientAddress}, please try again later`;
      if(err.result.error === faucetConstants.TX_ERRORS.INVALID_ADDRESS)
      {
          retObj.statusMessage = `${clientAddress} does not seem to be a valid address for ${cryptoSymbol.toUpperCase()}, please check that it's correct and try again`;
      }
      console.error(retObj.statusMessage);
      retObj.error = err;
    }
    console.dir(`sendCrypto returning = ${JSON.stringify(retObj)}`);
      cryptofaucet.getBalance(cryptoSymbol, (err, balance) => {
          if (err) {

          }
          let retBalance = balance;
          console.dir(`first retBalance returning = ${retBalance}`);
          if (retBalance) {
              retBalance = utils.satashiToBtc(retBalance);
          }
          retObj.balance = retBalance;
          res.json(retObj);
      });

  });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
