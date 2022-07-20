const kava = require('@kava-labs/javascript-sdk');
const sig = require('@kava-labs/sig');

class Client extends kava.KavaClient {
  setWallet (mnemonic, password = '', hdPathCoinType = 118, prefix = 'cosmos') {
    if (!mnemonic) {
      throw new Error('mnemonic cannot be undefined');
    }
    const derivationPath = `m/44'/${hdPathCoinType}'/0'/0/0`;
    this.wallet = sig.createWalletFromMnemonic(
      mnemonic,
      password,
      prefix,
      derivationPath
    );
    return this;
  }
}

module.exports.Client = Client;
module.exports.tx = kava.tx;
