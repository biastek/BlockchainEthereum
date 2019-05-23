import User from '../models/UserModel';
import UserRepo from '../repositories/UserRepo';
import bcrypt from 'bcryptjs';

/** */
var userRepo=new UserRepo();

/** */
class UserService{
    constructor(){};
    async getAll(){
        let method="UserService/getAll";
        console.log(method+ "  -->start");
        try {
            let result= await userRepo.getAll();
            console.log(method+" -->success");
            return result; 
        } catch (error) {
            console.log(method+" -->fail");
            return error;
        }
       
    };

    async getByID(_UserID){
        let method="UserService/getByID: "+_UserID;
        console.log(method+ "  -->start");
        try {
            let result=await userRepo.getByID(_UserID);
            console.log(method+" -->success");
            return new User(result[0].username,result[0].password,result[0].FirstName,result[0].LastName,result[0].birthday,result[0].address,result[0].phone,result[0].enabled,result[0].RegisterDate);
        } catch (error) {
            console.log(method+" -->fail");
            return error;
        }

    }

    async insert(_User){
        let method="UserService/insert: "+_User.username;
        console.log(method+ " -->start");
        
        try {
            let result=await userRepo.insert(_User);
            console.log(method+" -->success");
            return result;
        } catch (error) {
            console.log(method+" -->fail");
            return error;
        }
    };

    async update(_User){
        let method="UserService/update: "+_User.username;
        console.log(method+ " -->start");
        
        try {
            let result=await userRepo.update(_User);
            console.log(method+" -->success");
            return result;
        } catch (error) {
            console.log(method+" -->fail");
            return error;
        }
    };

    async delete(_UserID){
        let method="UserService/delete: "+_UserID;
        console.log(method+" -->start");

        try {
          let result=await userRepo.delete(_UserID);
            console.log(method+" -->success");
            return result;
        } catch (error) {
            console.log(method+" -->fail");
            return error;
        }
    };

    comparePassword(password, hash, callback){
        bcrypt.compare(password, hash, function(err, isMatch){
            if(err) throw err;
            callback(null, isMatch);
        });
    };
}

/** */
module.exports=UserService;