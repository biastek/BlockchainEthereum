import Web3 from 'web3';
import VSEtherRepo from '../repositories/VSEtherRepo';
import ether_config from '../../configs/ether_config';

const provider = ether_config.provider;

// khoi tao web3
const web3 = new Web3(provider);
let vsEtherRepo = new VSEtherRepo();


class VSEtherService {
  constructor() { };
/**
 * Tao tai khoan moi
 */
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


/**
 * chuyen Eth giua hai tai khoan
 * @param {tai khoan gui} _addressFrom 
 * @param {private key tai gui} _thePrivateKey 
 * @param {tai khoan nhan} _addressTo 
 * @param {so luong Eth} _value 
 */
  async transferEther(_addressFrom, _thePrivateKey, _addressTo, _value) {
    let method = "vsEtherService/transferEther";
    console.log(method + " -->start");
    try {
      let result = await vsEtherRepo.transferEther(_addressFrom, _thePrivateKey, _addressTo, _value);
      console.log(method + " -->success");
      return result;
    } catch (error) {
      console.log(method + " -->failed");
      return "" + error;
    }
  }
}


module.exports = VSEtherService;