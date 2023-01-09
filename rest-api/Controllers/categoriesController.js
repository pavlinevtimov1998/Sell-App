const categoriesController = require("express").Router();

const { catchAsyncError } = require("../Util/errorParser");

categoriesController.get(
  "/",
  catchAsyncError((req, res) => {

  })
);

module.exports = categoriesController;
