const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        unique: true,
    },
    image: {
        type: String,
        required: [true, "Image is required!"],
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
