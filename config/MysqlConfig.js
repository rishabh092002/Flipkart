const mysql = require("mysql");

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        database: "flipkart",
        password: "admin",
        port: 3306
        
    }
);

connection.connect(function(error){
    if(error){
        console.log("failed to connect databse",error);
    } else{
        console.log("database connected...")
    }
});

module.exports.connection = connection;