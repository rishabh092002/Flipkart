const { connection } = require("../../config/MysqlConfig");

class CategoryModel {
    constructor() { }

    async insertCategory(data){
        return new Promise(function (resolve,reject){
            let query = `INSERT INTO category (title, description, category_id) VALUES ('${data.title}','${data.description}','${data.categoryId}')`;
            connection.query(query, function(error,result){
                if(error){
                    reject(error);
                } else{ 
                   resolve(result);
                };
            });
        })
    }

    async getAllCategories(categoryId = null){
        return new Promise(function(resolve,reject){
            let getQuery = "";
            if(categoryId){
                getQuery = `SELECT * FROM category WHERE id!='${categoryId}'`;
            } else {
                getQuery = `SELECT * FROM category`;
            }
            connection.query(getQuery,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });
    }

    async getCategoryById(id){
        return new Promise(function(resolve,reject){
            let getQuery = `SELECT * FROM category WHERE id = '${id}'`;
            connection.query(getQuery,function(error,result){
                if(error){
                    reject(error);
                } else{
                    let category = null;
                    if(result && result.length > 0){
                        category = result[0];
                    }
                    resolve(category);
                }
            });
        });
    }

    async updateCategoryById(id,category){
        return new Promise(function(resolve,reject){
            let query = `UPDATE category SET title ='${category.title}',description='${category.description}',category_id='${category.categoryId}' WHERE id = '${id}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });
    }

    async deleteCategoryById(id){
        return new Promise(function(resolve,reject){
            let query = `DELETE FROM category WHERE id ='${id}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });

    }
}
module.exports = new CategoryModel();