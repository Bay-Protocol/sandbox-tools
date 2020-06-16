const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  lcd_url: process.env.LCD_URL,
  mnemonic: process.env.MNEMONIC,
  auction_types: process.env.AUCTION_TYPES,
  ignored_addresses: process.env.IGNORED_ADDRESSES,
  collaterals: process.env.COLLATERALS,
  initial_bid_forward: process.env.INITIAL_BID_FORWARD,
  forward_bid_max: process.env.FORWARD_BID_MAX,
  forward_bid_margin: process.env.FORWARD_BID_MARGIN,
  reverse_bid_margin: process.env.REVERSE_BID_MARGIN,
  crontab: process.env.CRONTAB,
  legacy_hd_path: process.env.LEGACY_HD_PATH
};
