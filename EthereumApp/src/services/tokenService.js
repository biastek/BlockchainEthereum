import TokenRepo from '../repositories/tokenRepo';
import EtherAccount from '../models/etherAccount';

/** */
let tokenRepo=new TokenRepo();
let etherAccount=new EtherAccount(null,null,null);

class TokenService{
    constructor(){};

    async getBalance(_address){
        const method='TokenService/getBalance';
        console.log(method+' -->start');

        try {
            let balance=await tokenRepo.getBalance(_address);

            etherAccount.address=_address;
            etherAccount.ethBalance=balance.ethBalance;
            etherAccount.tokenBalance=balance.tokenBalance;

            console.log(method+' -->success');
            return etherAccount;
        } catch (error) {
            console.log(method+' -->fail');
            return {"errCode":500};
        }
    };
    
    async transferFrom(_addressfrom,_privatekey,_addressto,_value){
        const method='TokenService/transferFrom';
        console.log(method+' -->start');

        try {
            let result=await tokenRepo.transferFrom(_addressfrom,_privatekey,_addressto,_value);

            console.log(method+' -->success');
            return result;
        } catch (error) {
            console.log(method+' -->fail');
            return {"errCode":500};
        }
    };

    async createAccount(){
        const method='TokenService/createAccount';
        console.log(method+' -->start');

        try {
            let account=await tokenRepo.createAccount();           

            console.log(method+' -->success');
            return account;
        } catch (error) {
            console.log(method+' -->fail');
            return {"errCode":500};
        }
    };
};

module.exports=TokenService;