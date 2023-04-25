const AuthModel = require("../../model/user/AuthModel");
const joi = require("joi");

class AuthenticateControler {
    constructor(){}

   async loginPage(req,res){
        let page = {
            title: "login page",
            pageName: 'login',
            status: "",
            message: "",
            isUserLoggedIn: false
        }
        if(req.session.isUserLoggedIn){
            page.status = req.session.status;
            page.message = req.session.message;
        }
        if (req.session.status && req.session.message) {
            page.status = req.session.status;
            page.message = req.session.message;
            delete req.session.status,req.session.message;
        }
        res.render('user/login',page)
    }

    async userLogin(req,res){
        try {
            let schema = joi.object({
                userName: joi.string().required(),
                password: joi.string().required(),
            })
            let validateRes = schema.validate(req.body);
            if(validateRes && validateRes.error && validateRes.error.details){
                req.session.status = "Error"
                req.session.message = validateRes.error.details[0].message;
                res.redirect("/login");
                return false;
            }
            const userName = req.body.userName
            const password = req.body.password
            let userData = await AuthModel.getUserByEmail(userName);
            console.log("userData",userData);
            if(userData){
                let user = userData[0];
                if( user.password == password){
                    res.cookie('userLogin',user.id);
                    res.redirect("/");
                }else{
                    req.session.status = "error",
                    req.session.message = "incorrect password"
                    res.redirect("/login");
                }
            } else{
                req.session.status = "error",
                req.session.message = "incorrect Email Address",
                res.redirect("/login");
            }
        } catch (error) {
            console.log("login error",error);
        }
    }

    async singupPage(req,res){
        try {
            let page ={
                title: "signup",
                pageName: "register",
                status: "",
                message: ""
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
                delete req.session.status,req.session.message;
            }
            res.render("user/template",page)
        } catch (error) {
            console.log("signup page error",error)
        }
    }

    async userRegister(req,res){
        try {
            let schema = joi.object({
                firstName: joi.string().required(),
                lastName: joi.string().required(),
                email: joi.string().required(),
                contact: joi.number().required(),
                password: joi.string().required(),
                address: joi.string().required(),
                city: joi.string().required(),
                pincode: joi.number().required()
            })
            let validateRes = schema.validate(req.body);
            if(validateRes && validateRes.error && validateRes.error.details){
                req.session.status = "Error";
                req.session.message =  validateRes.error.details[0].message;
                res.redirect("/register");
                return false;
            }
            let userInfo = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                contact: req.body.contact,
                password: req.body.password,
                address: req.body.address,
                city: req.body.city,
                pincode: req.body.pincode,
            }
            await AuthModel.insertUser(userInfo);
            res.redirect("/login");
        } catch (error) {
            console.log("register error",error);
        }
    }
}
module.exports = new AuthenticateControler();