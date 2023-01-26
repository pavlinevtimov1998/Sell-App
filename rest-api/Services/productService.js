const Product = require("../Models/Product");
const Town = require("../Models/Town");
const { getImagesUrl, deleteCloudinaryImage } = require("../Utils/imageUpload");

const getProducts = (title, category) =>
    Product.find({
        title: { $regex: title, $options: "i" },
        category: { $regex: category, $options: "i" },
    });

const getProductsCount = () => Product.find().count();

const getOneProduct = (productId) =>
    Product.findById(productId)
        .populate({
            path: "_ownerId",
            select: "-password -__v",
        })
        .populate({ path: "location" });

async function createProduct(body, files) {
    const product = await Product.create(body);
    const imagesUrl = await getImagesUrl(files);

    product.images = imagesUrl;

    return product.save();
}

async function editProduct(body, productId, userId) {
    const product = await isOwnProduct(productId, userId);

    return product.update(body, { new: true, runValidators: true });
}

async function editProductImages(productId, userId, files, action) {
    const product = await isOwnProduct(productId, userId);

    if (files.length == 0) {
        throw {
            message: "At least 1 image is required!",
            status: 400,
        };
    }

    if (action == "update") {
        return updateImages(product, files);
    } else if (action == "add") {
        return addImage(product, files);
    }

    throw {
        message: "Not found!",
        status: 404,
    };
}

async function deleteProduct(userId, productId) {
    const product = await isOwnProduct(productId, userId);

    await deleteImagesFromCloudinary(product.images);

    return product.delete();
}

async function addImage(query, files) {
    const imageUrl = await getImagesUrl(files)[0];

    query.images.push(imageUrl);

    return query.save();
}

async function updateImages(query, files) {
    const imagesUrl = await getImagesUrl(files);

    await deleteImagesFromCloudinary(query.images);

    query.images = imagesUrl;
    return query.save();
}

const deleteImagesFromCloudinary = (images) =>
    Promise.all(
        images.map((url) =>
            deleteCloudinaryImage(
                url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
            )
        )
    );

async function isOwnProduct(productId, userId) {
    const product = await Product.findById(productId);

    if (!product) {
        throw {
            message: "Not found!",
            status: 404,
        };
    }

    if (product._ownerId.toString() !== userId) {
        throw {
            message: "Unauthorized!",
            status: 401,
        };
    }

    return product;
}

module.exports = {
    getProducts,
    getProductsCount,
    getOneProduct,
    createProduct,
    editProduct,
    editProductImages,
    deleteProduct,
};
