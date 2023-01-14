const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            required: [true, "Email is required!"],
            type: String,
            trim: true,
            unique: true,
            validate: {
                validator: function () {
                    return /[a-zA-Z0-9]{6,25}@[a-zA-Z]{2,10}\.[a-z]{1,6}/g.test(
                        this.email
                    );
                },
                message: () => "Invalid email!",
            },
        },
        username: {
            type: String,
        },
        password: {
            required: true,
            trim: true,
            type: String,
            minLength: [6, "Password should be at least 6 characters!"],
        },
        favorites: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: { createdAt: "createdAt" } }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
