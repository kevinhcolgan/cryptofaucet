exports.btcToSatashi = function (btc) {
  return btc * 1e8;
};

exports.satashiToBtc = function (satashi) {
  return (satashi / 1e8).toFixed(4);
};
