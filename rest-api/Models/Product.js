const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required!"],
            trim: true,
            minLength: [6, "Product title should be at least 6 characters!"],
        },
        images: [
            {
                type: String,
            },
        ],
        description: {
            type: String,
            required: [true, "Description is required!"],
            trim: true,
            minLength: [25, "Description should be at least 25 characters!"],
        },
        town: {
            type: String,
            required: [true, "Town is required!"],
            ref: "Town",
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required!"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Price is required!"],
            min: [0.01, "Price should be at least 0.01$!"],
            trim: true,
        },
        favorites: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        _ownerId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
