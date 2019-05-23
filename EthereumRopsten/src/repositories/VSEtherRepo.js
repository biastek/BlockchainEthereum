import Web3 from 'web3';
import TX from 'ethereumjs-tx';
import EtherScan from './etherScan';
import ether_config from '../../configs/ether_config.json';

// contract details
const provider = ether_config.provider;

// khoi tao web3
const web3 = new Web3(provider);
let etherScan = new EtherScan();

class VSEtherRepo {
  constructor() { };

  // Chuyen doi tu Wei toi Eth
  convertWeiToEth(stringValue) {
    if (typeof stringValue != 'string') {
      stringValue = String(stringValue);
    }
    return web3.utils.fromWei(stringValue, "ether");
  }

  
/**
 * chuyen Eth giua hai tai khoan
 * @param {tai khoan gui} _addressFrom 
 * @param {private key tai gui} _thePrivateKey 
 * @param {tai khoan nhan} _addressTo 
 * @param {so luong Eth} _value 
 */
  async transferEther(_addressFrom, _thePrivateKey, _addressTo, _value) {
    let method="vsEtherRepo/transferEther";
    console.log(method+" -->start");
    try {      
      var txValue = web3.utils.numberToHex(web3.utils.toWei(_value + '', 'ether'));
      var txCount = await web3.eth.getTransactionCount(_addressFrom);
      var txData = web3.utils.asciiToHex('data');

      var gasPrice = await web3.eth.getGasPrice();
      gasPrice = Number(gasPrice);
      
      var block=await web3.eth.getBlock("latest");
      var gasLimit=Number(block.gasLimit);

      var rawTx = {
        nonce: web3.utils.toHex(txCount),
        gasPrice: web3.utils.toHex(gasPrice), // Normal is '0x14f46b0400' or 90 GWei
        gasLimit: web3.utils.toHex(gasLimit), //default is '0x55f0' or 22000 GWei
        from: _addressFrom, 
        to: _addressTo,
        value: txValue,
        data: txData
      }

      var tx = new TX(rawTx);
      tx.sign(new Buffer(_thePrivateKey, 'hex'));
      console.log(method+" -->success");
      return await etherScan.sendSigned(tx);
    } catch (error) {
      console.log(method+" -->failed");
      return "" + error;
    }
  }


}

module.exports = VSEtherRepo;