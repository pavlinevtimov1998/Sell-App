const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
      ref: "Category",
    },
    subcategory: {
      type: String,
      ref: "Subcategory",
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const Category = mongoose.model("Category", productSchema);

module.exports = Category;
