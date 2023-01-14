const Product = require("../Models/Product");

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

module.exports = {
    getProducts,
    getProductsCount,
    getOneProduct
};
