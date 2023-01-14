const Product = require("../Models/Product");
const Town = require("../Models/Town");
const { getImagesUrl } = require("../Util/imageUpload");

const getProducts = (title, category) =>
    Product.find({
        title: { $regex: title, $options: "i" },
        category: { $regex: category, $options: "i" },
    });

const getProductsCount = () => Product.find().count();

const getOneProduct = (productId) =>
    Product.findById(productId).populate({
        path: "_ownerId",
        select: "-password -__v",
    });

async function createProduct(body, files) {
    const product = await Product.create(body);
    const imagesUrl = await getImagesUrl(files);

    product.images = imagesUrl;

    return product.save();
}

async function editProduct(body, productId, userId) {
    const product = await Product.findById(productId);

    if (product._ownerId.toString() !== userId) {
        throw {
            message: "Unauthorized!",
            status: 401,
        };
    }

    return product.update(body, { new: true, runValidators: true });
}

module.exports = {
    getProducts,
    getProductsCount,
    getOneProduct,
    createProduct,
    editProduct,
};
