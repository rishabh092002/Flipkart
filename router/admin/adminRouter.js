const express = require("express");
const app = express();
const categoryControler = require("../../controler/admin/CategoryControler");
const ProductControler = require("../../controler/admin/ProductControler");

app.get('/',function(req,res){
    let page = {
        title: "home page",
        pageName: 'home'
    }
    res.render("admin/home",page);
});

app.get('/login',function(req,res){
    let page ={
        title:"login",
        pageName:'login'
    }
    res.render('admin/login',page);
})

app.get('/category', categoryControler.categoryPage);

app.post('/category', categoryControler.createCategory);

app.get('/product', ProductControler.getProduct);

app.post('/product', ProductControler.createProduct);

app.get('/edit-product', ProductControler.editproduct);

app.post('/update-product', ProductControler.productUpdate);

app.get('/delete-product', ProductControler.deleteProduct);

app.get('/edit-category',categoryControler.editCategory);

app.post('/update-category', categoryControler.updateCategory);

app.get('/delete-cetegory', categoryControler.deleteCategory);


module.exports = app;