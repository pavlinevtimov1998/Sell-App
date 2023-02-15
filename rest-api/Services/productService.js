const Product = require("../Models/Product");
const Town = require("../Models/Town");

const { getImagesUrl, deleteCloudinaryImage } = require("../Utils/imageUpload");

const getProducts = (
    title,
    category,
    subcategory,
    fromPrice,
    toPrice,
    condition
) => {
    console.log(fromPrice);
    return Product.find()
        .regex("title", new RegExp(`^${title}`, "i"))
        .regex("category", new RegExp(`^${category}`, "i"))
        .regex("subcategory", new RegExp(`^${subcategory}`, "i"))
        .regex("condition", new RegExp(`^${condition}`, "i"))
        .where("price")
        .gte(+fromPrice)
        .lte(+toPrice)
        .select("-description -phoneNumber -condition -type -updatedAt -__v");
};
const getProductsCount = () => Product.find().count();

const getOneProduct = async (productId) => {
    const product = await Product.findById(productId)
        .populate({
            path: "_ownerId",
            select: "-password -__v",
        })
        .populate({ path: "location" });

    const [moreUserProducts, moreCategoryProducts] = await Promise.all([
        Product.find({
            _ownerId: product._ownerId._id,
        }).select("-description -phoneNumber -condition -type -updatedAt -__v"),
        Product.find({ subcategory: product.subcategory }).select(
            "-description -phoneNumber -condition -type -updatedAt -__v"
        ),
    ]);

    return { product, moreUserProducts, moreCategoryProducts };
};

async function createProduct(body, files) {
    const town = await Town.find()
        .regex("city", new RegExp(`^${body.location}`, "i"))
        .select("city");

    if (town.length === 0) {
        throw { message: "Incorrect location!" };
    }

    body.location = town[0]._id;
    const product = await Product.create({ ...body, images: [] });
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

const getTowns = (city) =>
    Town.find({})
        .regex("city", new RegExp(`^${city}`, "i"))
        .select("city");

const likeProduct = (userId, productId) =>
    Product.findByIdAndUpdate(productId, { $push: { favorites: userId } });

const removeLike = (userId, productId) =>
    Product.findByIdAndUpdate(productId, { $pull: { favorites: userId } });

module.exports = {
    getProducts,
    getProductsCount,
    getOneProduct,
    createProduct,
    editProduct,
    editProductImages,
    deleteProduct,
    getTowns,
    likeProduct,
    removeLike,
};
