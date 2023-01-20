const categoriesController = require("express").Router();

const { isAdmin } = require("../Middlewares/guards");
const categoriesService = require("../Services/categoriesService");
const { catchAsyncError } = require("../Utils/errorParser");
const { upload } = require("../Utils/imageUpload");

categoriesController.get(
    "/",
    catchAsyncError(async (req, res) => {
        const categories = await categoriesService.getAllCategories();

        res.status(200).json(categories);
    })
);

categoriesController.post(
    "/",
    isAdmin("Unauthorized!"),
    upload.single("image"),
    catchAsyncError(async (req, res) => {
        const categoryData = req.body;
        const file = req.file;

        const category = await categoriesService.createCategory(
            categoryData,
            file
        );

        res.status(200).json({
            message: `Successfully created ${category.title} category!`,
        });
    })
);

categoriesController.patch(
    "/:categoryId",
    isAdmin("Unauthorized!"),
    upload.single("image"),
    catchAsyncError(async (req, res) => {
        const categoryData = req.body;
        const file = req.file;
        const categoryId = req.params.categoryId;

        await categoriesService.editCategory(
            categoryData,
            file,
            true,
            categoryId
        );

        res.status(200).json({
            message: `Successfully edited!`,
        });
    })
);

module.exports = categoriesController;
