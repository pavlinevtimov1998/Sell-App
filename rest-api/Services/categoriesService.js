const Category = require("../Models/Category");
const Subcategory = require("../Models/Subcategory");

const getAllCategories = () =>
    Category.find().populate({ path: "subcategory", select: "title" });

async function categoriesActionHandler(body, file, isEdit, id) {
    if (!file) {
        throw {
            message: "Image is required!",
            status: 400,
        };
    }

    body.image = await getImagesUrl(file);

    if (isEdit) {
        const category = await Category.findByIdAndUpdate(id, body, {
            runValidators: true,
        });

        const url = category.image;

        return deleteCloudinaryImage(
            url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
        );
    }

    return Category.create(body);
}

const editCategory = (title, id) => Category.findByIdAndUpdate(id, { title });

async function createSubcategory(body) {
    const subcategory = await Subcategory.create(body);
    
    await Category.findByIdAndUpdate(
        { _id: body.category },
        { $push: { subcategories: subcategory._id } }
    );

    return subcategory;
}

const editSubcategory = (title, id) =>
    Subcategory.findByIdAndUpdate(id, { title });

module.exports = {
    getAllCategories,
    categoriesActionHandler,
    createSubcategory,
    editSubcategory,
};
