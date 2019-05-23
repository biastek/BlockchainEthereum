import WalletRepo from '../repositories/WalletRepo';


/** */
var walletRepo=new WalletRepo();


class WalletService{
    constructor(){};
    async getAll(){
        const method="WalletService/getAll()";
        console.log(method+" -->start");

        try {
          let result= await walletRepo.getAll();
          console.log(method+" -->success");
          return result;  
        } catch (error) {
            console.log(method+" -->fail");
            return new Error(error);
        }
    };

    async insert(_account){
        let method="WalletService/insert";
        console.log(method+ " -->start");
        
        try {
            let result=await walletRepo.insert(_account);
            console.log(method+" -->success");
            return result;
        } catch (error) {
            console.log(method+" -->fail");
            return error;
        }
    };

    async delete(_accountID){
        const method="WalletService/delete()";
        console.log(method+" -->start");

        try {
          let result= await walletRepo.delete(_accountID);
          console.log(method+" -->success");
          return result;  
        } catch (error) {
            console.log(method+" -->fail");
            return new Error(error);
        }
    }; 

    async getByUser(_userID){
        const method="WalletService/getByUser()";
        console.log(method+" -->start");

        try {
          let result= await walletRepo.getByUser(_userID);
          console.log(method+" -->success");
          return result;  
        } catch (error) {
            console.log(method+" -->fail");
            return new Error(error);
        }
    };

   async getByID(_accountID){
        const method="WalletService/getByID()";
        console.log(method+" -->start");

        try {
          let result= await walletRepo.getByID(_accountID);
          console.log(method+" -->success");
          return result;  
        } catch (error) {
            console.log(method+" -->fail");
            return new Error(error);
        }
    };

    async update(_account){
        let method="WalletService/update";
        console.log(method+ " -->start");
        
        try {
            let result=await walletRepo.update(_account);
            console.log(method+" -->success");
            return result;
        } catch (error) {
            console.log(method+" -->fail");
            return error;
        }
    };

    
        
}

module.exports=WalletService;