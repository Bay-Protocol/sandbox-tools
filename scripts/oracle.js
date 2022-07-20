require('dotenv').config({ path: process.env.ENV_FILE });
const PriceOracle = require('..').PriceOracle;
const cron = require('node-cron');

const main = async () => {
  // Load environment variables
  const lcdURL = process.env.LCD_URL;
  const mnemonic = process.env.MNEMONIC;
  const marketIDs = process.env.MARKET_IDS.split(',');
  const expiry = process.env.EXPIRY;
  const expiryThreshold = process.env.EXPIRY_THRESHOLD;
  const deviation = process.env.DEVIATION;
  const feeDenom = process.env.FEE_DENOM;
  const feeAmount = process.env.FEE;
  const coinType = process.env.COIN_TYPE
  const prefix = process.env.ADDR_PREFIX;
  let fee = { amount: [], gas: String(150000) };
  if (feeAmount !== '') {
    fee = {
      amount: [{ denom: feeDenom, amount: feeAmount }],
      gas: String(150000),
    };
  }

  // Initiate price oracle
  const oracle = new PriceOracle(marketIDs, expiry, expiryThreshold, deviation, fee);
  await oracle.initClient(lcdURL, mnemonic, coinType, prefix);

  // Start cron job
  cron.schedule(process.env.CRONTAB, () => {
    oracle.postPrices();
  });
};

main();
