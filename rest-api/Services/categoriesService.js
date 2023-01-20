const Category = require("../Models/Category");

const { getImagesUrl } = require("../Utils/imageUpload");

const getAllCategories = () => Category.find();

async function categoryAction(body, file, isEdit, categoryId) {
    if (!file) {
        throw {
            message: "Image is required!",
            status: 400,
        };
    }
    
    body.image = await getImagesUrl(file);

    if (isEdit) {
        const category = await Category.findByIdAndUpdate(categoryId, body, {
            runValidators: true,
        });

        const url = category.image;

        return deleteCloudinaryImage(
            url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
        );
    }

    return Category.create(body);
}

module.exports = {
    getAllCategories,
    categoryAction,
};
