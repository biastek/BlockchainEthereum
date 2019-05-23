import mysqldb_connection from '../utilities/mysqldb_connection';

class WalletRepo{
    constructor(){};
    getAll(){
        let method="WalletRepo/getAll()";
        console.log(method + " -->start");

        return new Promise((resolve,reject)=>{
            mysqldb_connection.query("SELECT * FROM tb_wallet",(error,result)=>{
                if(error){
                    console.log(method+" -->fail");
                    return reject(error+"");
                }else{
                    console.log(method+ " -->success");
                    return resolve(result);
                }
            });
        });
    };
    
    insert(_account){
        const method="WalletRepo/insert()";
        console.log(method+" -->start");

        return new Promise((resolve,reject)=>{
            mysqldb_connection.query("INSERT INTO tb_wallet(account_name,account_address,private_key,created,creator,ether_balance,token_balance) VALUES(?,?,?,?,?,?,?)",[_account.account_name,_account.account_address,_account.private_key,_account.created,_account.creator,_account.ether_balance,_account.token_balance],(error,result)=>{
                if(error){
                    console.log(method+" -->fail");
                    return reject(new Error(error));
                }else{
                    console.log(method+" -->success");
                    return resolve(result);
                }
            });
        });
    };

    delete(_accountID){
        let method="WalletRepo/delete()";
        console.log(method + " -->start");

        return new Promise((resolve,reject)=>{
            mysqldb_connection.query("DELETE FROM tb_wallet WHERE id=?",[_accountID],(error,result)=>{
                if(error){
                    console.log(method+" -->fail");
                    return reject(error+"");
                }else{
                    console.log(method+ " -->success");
                    return resolve(result);
                }
            });
        });
    };

    getByUser(_userID){
        let method="WalletRepo/getByUser()";
        console.log(method + " -->start");

        return new Promise((resolve,reject)=>{
            mysqldb_connection.query("SELECT * FROM tb_wallet WHERE creator=?",[_userID],(error,result)=>{
                if(error){
                    console.log(method+" -->fail");
                    return reject(error+"");
                }else{
                    console.log(method+ " -->success");
                    return resolve(result);
                }
            });
        });
    };

    getByID(_accountID){
        let method="WalletRepo/getByID()";
        console.log(method + " -->start");

        return new Promise((resolve,reject)=>{
            mysqldb_connection.query("SELECT * FROM tb_wallet WHERE id=?",[_accountID],(error,result)=>{
                if(error){
                    console.log(method+" -->fail");
                    return reject(error+"");
                }else{
                    console.log(method+ " -->success");
                    return resolve(result);
                }
            });
        });
    };

    update(_account){
        const method="WalletRepo/update()";
        console.log(method+" -->start");

        return new Promise((resolve,reject)=>{
            mysqldb_connection.query("UPDATE tb_wallet SET account_name=?,ether_balance=?,token_balance=? WHERE id=?",[_account.account_name,_account.ether_balance,_account.token_balance,_account.id],(error,result)=>{
                if(error){
                    console.log(method+" -->fail");
                    return reject(new Error(error));
                }else{
                    console.log(method+" -->success");
                    return resolve(result);
                }
            });
        });
    };
    

}

module.exports=WalletRepo;