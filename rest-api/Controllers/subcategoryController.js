const subcategoriesController = require("express").Router();

const { isAdmin } = require("../Middlewares/guards");
const categoriesService = require("../Services/categoriesService");
const { catchAsyncError } = require("../Utils/errorParser");
const { upload } = require("../Utils/imageUpload");

subcategoriesController.post(
    "/:categoryId",
    isAdmin("Unauthorized!"),
    catchAsyncError(async (req, res) => {
        const subcategoryData = req.body;
        subcategoryData.category = req.params.categoryId;

        const subcategory = await categoriesService.createSubcategory({
            subcategoryData,
        });

        res.status(200).json({
            message: `Successfully created ${subcategory.title} subcategory!`,
        });
    })
);

subcategoriesController.patch(
    "/:subcategoryId",
    isAdmin("Unauthorized!"),
    upload.single("image"),
    catchAsyncError(async (req, res) => {
        const { title } = req.body;
        const subcategoryId = req.params.subcategoryId;

        await categoriesService.editSubcategory({
            title,
            subcategoryId,
        });

        res.status(200).json({
            message: `Successfully edited!`,
        });
    })
);

module.exports = subcategoriesController;
