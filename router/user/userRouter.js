const express = require("express");
const app = express();
const AuthenticateControler = require("../../controler/user/AuthenticateControler");

app.get('/',function(req,res){
    let page = {
        title: "home page",
        pageName:'home'
    }
    res.render('user/template',page)
})
app.get('/login', AuthenticateControler.loginPage);

app.post('/login',AuthenticateControler.userLogin);

app.get('/register', AuthenticateControler.singupPage);

app.post('/register', AuthenticateControler.userRegister);


module.exports = app;