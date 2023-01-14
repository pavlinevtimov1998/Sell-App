const router = require("express").Router();

const authController = require("./Controllers/authController");
const productController = require("./Controllers/productsController");
const categoriesController = require("./Controllers/categoriesController");
const profileController = require("./Controllers/profileController");

const { globalErrorHandler } = require("./Middlewares/globallErrHandler");

router.use("/auth", authController);
router.use("/profile", profileController);

router.use("/products", productController);
router.use("/categories", categoriesController);

router.use(globalErrorHandler);

module.exports = router;
