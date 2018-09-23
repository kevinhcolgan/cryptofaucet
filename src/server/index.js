const express = require('express');

const app = express();

const cryptofaucet = require('./app/cryptofaucet');

const utils = require('../lib/utils');

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
    if (err) {
      retObj = { error: err };
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
    if (err) {
      retObj = { error: err };
    }

    console.dir(`sendCrypto returning = ${JSON.stringify(retObj)}`);
    res.json(retObj);
  });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
