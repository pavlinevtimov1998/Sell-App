const productsController = require("express").Router();

const productsService = require("../Services/productService.js");
const { catchAsyncError } = require("../Util/errorParser");
const { upload } = require("../Util/imageUpload.js");

productsController.get(
    "/",
    catchAsyncError(async (req, res) => {
        const { title, category, skip, limit } = req.query;

        const products = await productsService
            .getProducts(title || "", location || "", category || "")
            .skip(skip || 0)
            .limit(limit || 12);

        res.status(200).json(products);
    })
);

productsController.get(
    "/count",
    catchAsyncError(async (req, res) => {
        const count = await productsService.getProductsCount();

        res.status(200).json({ productsCount: count });
    })
);

productsController.post(
    "/",
    upload.array("images", 5),
    catchAsyncError(async (req, res) => {
        const productData = req.body;
        productData._ownerId = req.user._id;

        const product = await productsService.createProduct(
            productData,
            req.files
        );

        res.status(201).json(product);
    })
);

productsController.get(
    "/:productId",
    catchAsyncError(async (req, res) => {
        const productId = req.params.productId;

        const product = await productsService.getOneProduct(productId);

        res.status(200).json(product);
    })
);

module.exports = productsController;
