import Web3 from 'web3';
import VSTokenRepo from '../repositories/VSTokenRepo';
import ether_config from '../../configs/ether_config';

const provider = ether_config.provider;
const defaultAccount = ether_config.defaultAccount;
const defaultPrivateKey = new Buffer(ether_config.defaultPrivateKey, 'hex');

// khoi tao web3
const web3 = new Web3(provider);
let vsTokenRepo = new VSTokenRepo();


class VSTokenService {
  constructor() { };

  async createAccount() {
    let method = "vsTokenService/createAccount";
    console.log(method);

    try {
      var wallet = await web3.eth.accounts.create();
      var AccountAddress = wallet.address;
      var PrivateKey = wallet.privateKey;

      return { "AccountAddress": AccountAddress, "PrivateKey": PrivateKey.slice(2) };
    } catch (error) {
      console.log(method + " -->failed" + error);
    }
  }

  async getBalance(_address) {
    let method = "vsTokenService/getBalance";
    console.log(method + "/address at: " + _address + "  -->start");

    if (_address) {
      try {
        let ethBalance = vsTokenRepo.convertWeiToEth(await web3.eth.getBalance(_address));
        let tokenBalance = await vsTokenRepo.getContract().methods.balanceOf(_address).call();

        console.log(method + " -->success");
        return { "ethBalance": ethBalance, "tokenBalance": tokenBalance };
      } catch (error) {
        console.log(method + " -->failed" + error);
      }
    }
  }

  // gui token
  // @addressFrom
  // @addressTo
  // @value
  async transferTo(_addressTo, _value) {
    let method = "vsTokenService/transferTo";
    console.log(method + " -->start");
    if (_addressTo && _value) {

      const rawTrans = await vsTokenRepo.getContract().methods.transferTo(_addressTo, Number(_value));
      console.log(method + " -->success");
      return await vsTokenRepo.sendSignTransaction(rawTrans, defaultAccount, defaultPrivateKey);
    } else {
      console.log(method + " -->failed");
      return {
        'message': 'Wallet address or no. of tokens is missing.'
      };
    }

  }

  // gui token
  // @addressFrom
  // @addressTo
  // @value
  async transferFrom(_addressFrom, _thePrivateKey, _addressTo, _value) {
    let method = "vsTokenService/transferTo";
    console.log(method + " -->start");
    if (_addressTo && _value) {

      const rawTrans = await vsTokenRepo.getContract().methods.transferFrom(_addressFrom, _addressTo, Number(_value));
      console.log(method + " -->success");
      return await vsTokenRepo.sendSignTransaction(rawTrans, _addressFrom, _thePrivateKey);
    } else {
      console.log(method + " -->failed");
      return {
        'message': 'Wallet address or no. of tokens is missing.'
      };
    }

  }

}


module.exports = VSTokenService;