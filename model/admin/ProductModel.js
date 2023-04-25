const { connection } = require("../../config/MysqlConfig");

class ProductModel {
    constructor() { }

    async insertProduct(data) {
        return new Promise(function (resolve, reject) {
            let query = `INSERT INTO product( title, price, quantity, category, description, image) VALUES ('${data.title}','${data.price}','${data.quantity}','${data.category}','${data.description}','${data.image}')`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                };
            });
        });
    }

    async getAllProducts(data) {
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM product`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async getProductById(id) {
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM product WHERE id ='${id}'`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    async updateProduct(id, products) {
        return new Promise(function (resolve, reject) {
            let query = `UPDATE product SET title='${products.title}',price='${products.price}',quantity='${products.quantity}',description='${products.description}',image='${products.image}' WHERE id = '${id}' `;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async deleteProductById(id) {
        return new Promise(function (resolve, reject) {
            let query = `DELETE FROM product WHERE id = '${id}'`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new ProductModel();