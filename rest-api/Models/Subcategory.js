const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            default: [],
        },
    ],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: [],
        required: true,
    },
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
