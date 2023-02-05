exports.globalErrorHandler = (err, req, res, next) => {
    if (err.code == "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
            message: "Cannot upload more than 5 images!",
        });
    }
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
    });
};
