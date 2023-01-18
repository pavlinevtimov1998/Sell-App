const authController = require("express").Router();

const { COOKIE_NAME } = require("../config/config");
const { isUser, isGuest } = require("../Middlewares/guards");
const authService = require("../Services/authService");

const { catchAsyncError } = require("../Utils/errorParser");
const { getToken } = require("../Utils/jwtConfig");

authController.post(
    "/register",
    isGuest("You are already logged in!"),
    catchAsyncError(async (req, res) => {
        const user = await authService.register(req.body);

        const token = await getToken({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        res.status(201).json(user);
    })
);

authController.post(
    "/login",
    isGuest("You are already logged in!"),
    catchAsyncError(async (req, res) => {
        const user = await authService.login(req.body);

        const token = await getToken({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        res.status(200).json({
            _id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            image: user.image,
            isAdmin: user.isAdmin,
        });
    })
);

authController.post("/logout", isUser("Unauthorized!"), (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ message: "Successfull logout!" });
});

authController.delete(
    "/remove-account",
    isUser("Unauthorized!"),
    catchAsyncError(async (req, res) => {
        const userId = req.user._id;

        await authService.removeAccount(userId);

        res.clearCookie(COOKIE_NAME);
        res.status(204).json();
    })
);

module.exports = authController;
