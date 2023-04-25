const categoryModel = require("../../model/admin/CategoryModel");
const Joi = require("joi");

class CategoryControler {

    constructor() { }

    async categoryPage(req, res) {
        try {
            let page = {
                title: "category",
                pageName: 'category',
                categories: [],
                status: "",
                message: ""
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
            }
            let categoryResult = await categoryModel.getAllCategories();
            page.categories = categoryResult;
            res.render('admin/template', page);
        } catch (error) {
            console.log("category error....", error);

        }
    }

    async createCategory(req, res) {
        try {
            let schema = Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                categoryId: Joi.number().required()
            })
            let validateRes = schema.validate(req.body);
            console.log("validateres", validateRes);
            if (validateRes && validateRes.error && validateRes.error.details) {
                req.session.status = "error";
                req.session.message = validateRes.error.details[0].message;
                res.redirect("/admin/category");
                return false;
            }
            const title = req.body.title;
            const description = req.body.description;
            const categoryId = req.body.categoryId;
            let category = {
                title: title,
                description: description,
                categoryId: categoryId,

            };
            await categoryModel.insertCategory(category);
            res.redirect('/admin/category');
        } catch (error) {
            console.log("create Category error", error)

        }
    }

    async editCategory(req, res) {
        try {
            const categoryId = req.query.categoryId;
            let page = {
                title: "edit category",
                pageName: "edit-category",
                category: null,
                allCategories: [],
                status: "",
                message: ""
            }
            if(req.session.status && req.session.message){
                page.status = req.session.status;
                page.message = req.session.message;
            }
            let categoryData = await categoryModel.getCategoryById(categoryId);
            let allCategories = await categoryModel.getAllCategories(categoryData.id);
            page.category = categoryData;
            page.allCategories = allCategories;
            console.log("edit category :: page", page);
            res.render("admin/template", page);

        } catch (error) {
            console.log("edit category error", error);
        }
    }

    async updateCategory(req, res) {
        try {
            const categoryId = req.query.categoryId;
            let schema = Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                categoryId: Joi.number().required()
            })
            let validateRes = schema.validate(req.body)
            if (validateRes && validateRes.error && validateRes.error.details) {
                req.session.status = "error";
                req.session.message = validateRes.error.details[0].message;
                res.redirect("/admin/edit-category?categoryId=" + req.query.categoryId);
            } else {
                let category = {
                    title: req.body.title,
                    description: req.body.description,
                    categoryId: req.body.categoryId
                }
                console.log("category", category);
                await categoryModel.updateCategoryById(categoryId, category);
                res.redirect('/admin/category');
            }
        } catch (error) {
            console.log("update category error", error);
        }
    }

    async deleteCategory(req, res) {
        try {
            const categoryId = req.query.categoryId;
            await categoryModel.deleteCategoryById(categoryId);
            res.redirect("/admin/category");
        } catch (error) {
            console.log("delete cetegory error", error);
        }
    }

};

module.exports = new CategoryControler();