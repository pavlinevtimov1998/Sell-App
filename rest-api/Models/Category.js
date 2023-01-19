const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    subcategories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Subcategory",
            default: [],
            required: true,
        },
    ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
