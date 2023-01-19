const Category = require("../Models/Category");

const getAllCategories = () => Category.find();

module.exports = {
    getAllCategories,
};
