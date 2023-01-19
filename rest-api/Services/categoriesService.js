const Category = require("../Models/Category");
const { getImagesUrl } = require("../Utils/imageUpload");

const getAllCategories = () => Category.find();

async function createCategory(body, file) {
    if (!file) {
        throw {
            message: "Category image is required!",
            status: 400,
        };
    }

    body.image = await getImagesUrl(file);

    return Category.create(body);
}

module.exports = {
    getAllCategories,
    createCategory,
};
