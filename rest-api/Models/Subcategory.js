const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            default: [],
        },
    ],
    category: [
        {
            type: String,
            ref: "Category",
            default: [],
            required: true,
        },
    ],
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
