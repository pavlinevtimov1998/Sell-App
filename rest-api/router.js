const router = require("express").Router();

const authController = require("./Controllers/authController");
const productController = require("./Controllers/productsController");
const categoriesController = require("./Controllers/categoriesController");

router.use("/auth", authController);
router.use("/products", productController);
router.use("/categories", categoriesController);

module.exports = router;
