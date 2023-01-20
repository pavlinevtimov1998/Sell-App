const subcategoriesController = require("express").Router();

const { isAdmin } = require("../Middlewares/guards");
const categoriesService = require("../Services/categoriesService");
const { catchAsyncError } = require("../Utils/errorParser");
const { upload } = require("../Utils/imageUpload");

subcategoriesController.post(
    "/",
    isAdmin("Unauthorized!"),
    upload.single("image"),
    catchAsyncError(async (req, res) => {
        const subcategoryData = req.body;
        const file = req.file;

        const subcategory = await categoriesService.createSubcategory({
            subcategoryData,
            file,
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
        const subcategoryData = req.body;
        const file = req.file;
        const subcategoryId = req.params.subcategoryId;

        await categoriesService.editSubcategory({
            subcategoryData,
            file,
            isEdit: true,
            subcategoryId,
        });

        res.status(200).json({
            message: `Successfully edited!`,
        });
    })
);

module.exports = subcategoriesController;
