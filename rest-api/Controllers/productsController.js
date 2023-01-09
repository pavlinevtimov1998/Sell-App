const productsController = require("express").Router();

const { catchAsyncError } = require("../Util/errorParser");

productsController.get(
  "/",
  catchAsyncError((req, res) => {

  })
);

module.exports = productsController;
