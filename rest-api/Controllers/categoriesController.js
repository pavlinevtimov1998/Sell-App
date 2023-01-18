const categoriesController = require("express").Router();

const { catchAsyncError } = require("../Utils/errorParser");

categoriesController.get(
  "/",
  catchAsyncError((req, res) => {

  })
);

module.exports = categoriesController;
