const productsController = require("express").Router();

const productsService = requrie("../Services/productService.js");

const { catchAsyncError } = require("../Util/errorParser");

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

        res.status(200).json({ products: count });
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
