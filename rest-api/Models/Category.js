const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subcategories: [
    {
      type: String,
      ref: "Subcategory",
      default: [],
      required: true,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
