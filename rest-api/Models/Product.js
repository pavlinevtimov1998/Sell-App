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
        location: {
            type: mongoose.Types.ObjectId,
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
        type: {
            type: String,
            required: [true, "Post type is required!"],
            enum: {
                values: ["business", "non-business"],
                message: "{VALUE} type is not supported!",
            },
        },
        condition: {
            type: String,
            required: [true, "Condition type is required!"],
            enum: {
                values: ["new", "used"],
                message: "{VALUE} condition is not supported!",
            },
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

productSchema.pre("save", function (next) {
    this.type = this.type[0].toLocaleUpperCase() + this.type.slice(1);
    this.condition =
        this.condition[0].toLocaleUpperCase() + this.condition.slice(1);
    console.log(this.type, this.condition);
    next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
