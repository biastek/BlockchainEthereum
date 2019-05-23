import Web3 from 'web3';
import ether_config from '../../configs/ether_config.json';

// contract details
const provider = ether_config.provider;
const etherscanLink = ether_config.etherscanLink;

// khoi tao web3
const web3 = new Web3(provider);

class EtherScan {
  constructor() { };

 
  sendSigned(tx) {
    return new Promise(function (resolve, reject) {
      // send the signed transaction
      web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
        .once('transactionHash', function (hash) {
          var result = {
            'status': 'sent',
            'url': etherscanLink + hash,
            'message': 'click the given url to verify status of transaction'
          }
          resolve(result)
        })
        .then(out => { console.log(out) })
        .catch(err => {
          reject(err)
        })
    })
  }

}


module.exports = EtherScan;