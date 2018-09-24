const cryptofaucet = require('../server/app/cryptofaucet');

cryptofaucet.testSession((err, res) => {
  if (err) {
    console.error(`err = ${err}`);
  }
  console.log(res);
});
