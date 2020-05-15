const loadCoinGeckoMarket = (marketID) => {
  switch (marketID.split(':')[0]) {
    case 'xrp':
      return 'ripple';
    case 'bnb':
      return 'binancecoin';
    case 'btc':
      return 'bitcoin';
    case 'atom':
      return 'cosmos';
    case 'kava':
      return 'kava';
    default:
      throw `invalid market id ${marketID}`
  }
};

const loadBinanceMarket = (marketID) => {
  switch (marketID.split(':')[0]) {
    case 'bnb':
      return 'BNBUSDT';
    case 'xrp':
      return 'XRPUSDT';
    case 'btc':
      return 'BTCUSDT';
    case 'kava':
      return 'KAVAUSDT';
    case 'atom':
      return 'ATOMUSDT';
    default:
      throw `invalid market id ${marketID}`
  }
};


const getPercentChange = (p1, p2) => {
  return Math.abs(p1-p2) / p1
}

const getPreviousPrice = (address, prices) => {
  var found = false
  var index = 0
  for (var i=0; i < prices.length; i++) {
    if (prices[i].oracle_address == address) {
      found = true
      index = i
      break
    }
  }
  if (found) {
    return prices[index]
  }
}

var checkPriceExpiring = (price) => {
  let d1 = Math.floor((new Date(price.expiry)).getTime() / 1000)
  let d2 = Math.floor(new Date().getTime() / 1000)
  return (d1 - d2 < Number.parseInt(process.env.EXPIRY_THRESHOLD))
}

exports.getPercentChange = getPercentChange
exports.loadCoinGeckoMarket = loadCoinGeckoMarket;
exports.loadBinanceMarket = loadBinanceMarket
exports.getPreviousPrice = getPreviousPrice
exports.checkPriceExpiring = checkPriceExpiring