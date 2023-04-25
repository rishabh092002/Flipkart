const { connection } = require("../../config/MysqlConfig");

class AuthModel {
    constructor(){ }
     
    async insertUser(user){
        return new Promise(function(resolve,reject){
            let newQuery = `INSERT INTO user(first_name, last_name, email, contact, password, address, city, pincode) VALUES ('${user.firstName}','${user.lastName}','${user.email}','${user.contact}','${user.password}','${user.address}','${user.city}','${user.pincode}')`;
            connection.query(newQuery,function(error,result){
                if(error){
                    reject(resolve);
                } else{
                    resolve(result);
                }
            });
        });
    }

    async getUserByEmail(email){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM user WHERE email = '${email}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    let user = null;
                    if( result && result.length){
                        user = result;
                    }
                    resolve(user)
                }
            });
        });
    }

}

module.exports = new AuthModel();