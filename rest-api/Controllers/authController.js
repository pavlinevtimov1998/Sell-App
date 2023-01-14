const authController = require("express").Router();

const config = require("../config/config");
const authService = require("../Services/authService");
const { catchAsyncError } = require("../Util/errorParser");

authController.post(
    "/login",
    catchAsyncError(async (req, res) => {
        const [token, user] = await authService.login(req.body);

        res.cookie(config.COOKIE_NAME, token, { httpOnly: true });

        res.status(200).json({
            _id: user._id,
            email: user.email,
            userInfo: user.userInfo,
            isAdmin: user.isAdmin,
        });
    })
);

authController.post(
    "/register",
    catchAsyncError(async (req, res) => {
        const [token, user] = await authService.register(req.body);

        res.cookie(config.COOKIE_NAME, token, { httpOnly: true });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            userInfo: user.userInfo,
            isAdmin: user.isAdmin,
        });
    })
);

authController.post("/logout", (req, res) => {
    res.clearCookie(config.COOKIE_NAME);
    res.status(200).json({ message: "Successfull logout!" });
});

module.exports = authController;
