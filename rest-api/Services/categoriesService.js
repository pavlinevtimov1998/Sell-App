const Category = require("../Models/Category");
const Subcategory = require("../Models/Subcategory");

const getAllCategories = () => Category.find();

const createCategory = (data) => categoriesActionHandler(Category, ...data);

const editCategory = (data) => categoriesActionHandler(Category, ...data);

const createSubcategory = (data) =>
    categoriesActionHandler(Subcategory, ...data);

const editSubcategory = (data) => categoriesActionHandler(Subcategory, ...data);

module.exports = {
    getAllCategories,
    createCategory,
    editCategory,
    createSubcategory,
    editSubcategory,
};
