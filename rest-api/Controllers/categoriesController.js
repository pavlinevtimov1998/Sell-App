const categoriesController = require("express").Router();

const categoriesService = require("../Services/categoriesService");
const { catchAsyncError } = require("../Utils/errorParser");

categoriesController.get(
    "/",
    catchAsyncError(async (req, res) => {
        const categories = await categoriesService.getAllCategories();

        res.status(200).json(categories);
    })
);

module.exports = categoriesController;
