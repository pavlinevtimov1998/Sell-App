const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const config = require("../config/config");

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
        password: {
            required: true,
            trim: true,
            type: String,
            minLength: [6, "Password should be at least 6 characters!"],
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        image: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: { createdAt: "createdAt" } }
);

userSchema.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(
        this.password,
        Number(config.SALT)
    );

    this.password = hashedPassword;

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
