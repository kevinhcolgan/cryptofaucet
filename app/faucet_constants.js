/*

{ id: '5ba2010de7367cd5033b962a366980b5',
  label: 'KC Faucet Wallet 2',
  balance: 105031477 }
{ id: '5ba20e95e7367cd5033c43f48c620f3c',
  label: 'KC TBTC Faucet Wallet',
  balance: 0 }
{ id: '5ba22fd77dfbfab803d55d2910e3f30d',
  label: 'testwallet2',
  balance: 0 }
{ id: '5ba22fd795b7b7a90335ca8b2b60df24',
  label: 'testwallet1',
  balance: 5000000 }
{ id: '5ba232b6383a51be03c3f869a0c4b559',
  label: 'TBTC Faucet Wallet',
  balance: 9375000 }

 */
module.exports={
    TBTC_SYMBOL:"tbtc",
    FAUCET_TBTC_WALLET_ID:process.env.TBTC_FAUCET_WALLET_ID,
    FAUCET_TBTC_WALLET_ADDRESS:process.env.TBTC_FAUCET_WALLET_ADDRESS,
    TEST_TBTC_CLIENT_WALLET_ID:process.env.TBTC_CLIENT_WALLET_ID,
    FAUCET_SEND_AMOUNT_TBTC:1000,
};