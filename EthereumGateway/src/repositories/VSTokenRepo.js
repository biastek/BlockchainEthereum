import Web3 from 'web3';
import TX from 'ethereumjs-tx';
import EtherScan from './etherScan';
import ether_config from '../../configs/ether_config.json';

// contract details
const provider = ether_config.provider;
const contractAddress = ether_config.contractAddress;

// khoi tao web3
const web3 = new Web3(provider);
var contract = null;
let etherScan=new EtherScan();

class VSTokenRepo {
  constructor() { };

  // Chuyen doi tu Wei toi Eth
  convertWeiToEth(stringValue) {
    if (typeof stringValue != 'string') {
      stringValue = String(stringValue);
    }
    return web3.utils.fromWei(stringValue, "ether");
  }

  //khoi tao Contract
  getContract() {
    if (contract === null) {
      var abi = ether_config.abi;
      var c = new web3.eth.Contract(abi, contractAddress);
      contract = c.clone();
      console.log("init smartcontract success");
    }
    return contract;
  }

  // Dang ky Transaction
  async sendSignTransaction(rawTrans,theAccount,thePrivateKey) {
    // Initiate values required by the dataTrans
    if (rawTrans) {
      var txCount = await web3.eth.getTransactionCount(theAccount);
      var abiTrans = rawTrans.encodeABI();

      var gas = await rawTrans.estimateGas();
      var gasPrice = await web3.eth.getGasPrice();
      gasPrice = Number(gasPrice);
      gasPrice = gasPrice * 2;
      var gasLimit = gas * 4;

      // Initiate the transaction data
      var dataTrans = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
        to: contractAddress,
        data: abiTrans
      }

      // sign transaction
      var tx = new TX(dataTrans);
      tx.sign(new Buffer(thePrivateKey,'hex'));

      // after signing send the transaction
      return await etherScan.sendSigned(tx);
    } else {
      throw new console.error('Encoded raw transaction was not given.');
    }

  }

}


module.exports = VSTokenRepo;