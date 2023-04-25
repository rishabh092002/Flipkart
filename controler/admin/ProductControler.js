const ProductModel = require("../../model/admin/ProductModel");
const CategoryModel = require("../../model/admin/CategoryModel");
const CommonService = require("../../services/CommonService");
const Joi = require("joi");

class ProductControler {
    constructor() { }

    async getProduct(req, res) {
        try {
            let page = {
                title: "product page",
                pageName: 'product',
                product: [],
                categories: [],
                status: "",
                message: ""
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
            }
            console.log("req.session", req.session);
            let categoryResult = await CategoryModel.getAllCategories();
            let productResult = await ProductModel.getAllProducts();
            page.categories = categoryResult;
            page.product = productResult;
            res.render("admin/template", page)
        } catch (error) {
            console.log("product page error", error)
        }
    }

    async createProduct(req, res) {
        try {

            const productBody = Joi.object({
                title: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number().required(),
                categoryId: Joi.number().required(),
                description: Joi.string().required()
            });
            const validateRes = productBody.validate(req.body);
            if (validateRes && validateRes.error && validateRes.error.details) {
                req.session.status = "Error";
                req.session.message = validateRes.error.details[0].message;
                res.redirect("/admin/product");
                return false;
            }
            let products = {
                title: req.body.title,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.categoryId,
                description: req.body.description,
                image: req.body.productImages
            }
            /**
             * upload image on the server
             */

            const allImages = req.files.productImages;
            let allImageName = [];
            if (allImages) {
                for (let index = 0; index < allImages.length; index++) {
                    let singleImage = allImages[index];
                    const imgNewName = await CommonService.generateImageName(singleImage.name);
                    singleImage.name = imgNewName;
                    await CommonService.uploadImage(singleImage);
                    allImageName.push(imgNewName);
                }
                products.image = allImageName.toString(",")

            }
            await ProductModel.insertProduct(products);
            res.redirect('/admin/product')
        } catch (error) {
            console.log(" create pro page error", error);
        }
    }

    async editproduct(req, res) {
        try {
            const productId = req.query.productId;
            console.log("productId", productId);
            let page = {
                title: "edit product page",
                pageName: 'edit-product',
                product: ""
            }
            let prodata = await ProductModel.getProductById(productId);
            page.product = prodata;
            res.render("admin/template", page);
        } catch (error) {
            console.log("editproduct error", error);
        }
    }
    

    async deleteProduct(req, res) {
        try {
            const productId = req.query.productId;
            await ProductModel.deleteProductById(productId);
            res.redirect("/admin/product")
        } catch (error) {
            console.log("delete pro error", error);
        }
    };

    async productUpdate(req, res) {
        try {
            const productId = req.query.productId;
            let products = {
                title: req.body.title,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.categoryId,
                description: req.body.description,
                image: req.body.productImages
            }
            const allImages = req.files.productImages;
            const allImageName = []
            if(allImages){
                for(let i = 0; i < allImages.length; i++){
                    let singleImage = allImages[i];
                    let imageNewName = await CommonService.generateImageName(singleImage.name);
                    singleImage.name = imageNewName;
                    await CommonService.uploadImage(singleImage);
                    allImageName.push(imageNewName);
                }
                products.image = allImageName.toString(",");
            }

            console.log("products", products);
            await ProductModel.updateProduct(productId,products);
            res.redirect("/admin/product");
        } catch (error) {
            console.log("update product error", error);
        }
    };
}
module.exports = new ProductControler();