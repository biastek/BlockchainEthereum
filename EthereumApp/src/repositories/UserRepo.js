import bcrypt from 'bcryptjs';
/** */
import mysqldb_connection from '../utilities/mysqldb_connection';
import Seller from '../models/UserModel';

/** */
class UserRepo {
    constructor() { };

    getAll() {
        let method = "productRepo/getAll";
        console.log(method + " -->start");

        return new Promise((resolve, reject) => {
            mysqldb_connection.query("SELECT * FROM tb_user", (error, result, fiels) => {
                if (error) {
                    console.log(method + " -->fail");
                    return reject(error + "");
                } else {
                    console.log(method + " -->success");
                    return resolve(result);
                }
            });
        });

    };

    getByID(_UserID) {
        let method = "UserRepo/getByID/UserID: " + _UserID;
        console.log(method + " -->start");

        return new Promise((resolve, reject) => {
            mysqldb_connection.query("SELECT * FROM tb_user WHERE username=?", [_UserID], (error, result) => {
                if (error) {
                    console.log(method + " -->fail");
                    return reject(error + "");
                } else {
                    console.log(method + " -->success");
                    return resolve(result);
                }
            });
        });
    };

    insert(_User) {
        let method = "UserRepo/insert";
        console.log(method + " -->start");

        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(_User.password, salt, function (err, hash) {
                    mysqldb_connection.query("INSERT INTO tb_user(username,password,FirstName,LastName,birthday,address,phone,enabled,RegisterDate) VALUES(?,?,?,?,?,?,?,?,?)", [_User.username, hash, _User.firstname, _User.lastname, _User.birthday, _User.address, _User.phone, _User.enabled, _User.registerdate], (error, result) => {
                        if (error) {
                            console.log(method + " -->fail");
                            return reject(error + "");
                        } else {
                            console.log(method + " -->success");
                            return resolve(result);
                        }
                    });
                });
            });

        });
    };

    update(_User) {
        let method = "UserRepo/Update/UserID: " + _User.username;
        console.log(method + " -->start");

        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(_User.password, salt, function (err, hash) {
                    mysqldb_connection.query("UPDATE tb_user SET password=?,FirstName=?,LastName=?,birthday=?,address=?,phone=?,enabled=?,RegisterDate=? WHERE username=?", [hash, _User.firstname, _User.lastname, _User.birthday, _User.address, _User.phone, _User.enabled, _User.registerdate, (_User.username).trim()], (error, result) => {
                        if (error) {
                            console.log(method + " -->fail");
                            return reject(error + "");
                        } else {
                            console.log(method + " -->success");
                            return resolve(result);
                        }
                    });
                });
            });
        });
    };

    delete(_UserID) {
        let method = "UserRepo/getByID/UserID: " + _UserID;
        console.log(method + " -->start");

        return new Promise((resolve, reject) => {
            mysqldb_connection.query("DELETE FROM tb_user WHERE username=?", [_UserID], (error, result) => {
                if (error) {
                    console.log(method + " -->fail");
                    return reject(error + "");
                } else {
                    console.log(method + " -->success");
                    return resolve(result);
                }
            });
        });
    };

}

/** */
module.exports = UserRepo;