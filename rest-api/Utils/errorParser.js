const { COOKIE_NAME } = require("../config/config");

exports.catchAsyncError = function (func) {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            if (err.name == "CastError") {
                return next({ message: "Not Found!", status: 404 });
            } else if (err.code == "11000") {
                const message = handleDuplicateError(err);

                return next({ message, status: 400 });
            } else if (err.name == "ValidationError") {
                const message = handleValidationError(err);

                return next({ message, status: 400 });
            } else if (err.message == "Token expired!") {
                res.clearCookie(COOKIE_NAME);
                return next({ message: "Token expired!", status: 401 });
            } else {
                return next(err);
            }
        });
    };
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    return `Incorrect input. ${errors.join(". ")}`;
};

const handleDuplicateError = (err) => {
    let value = Object.values(err.keyValue)[0];

    return `${value} already exists. Please try with different!`;
};
