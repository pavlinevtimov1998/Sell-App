const isUser = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized!" });
    }

    next();
};


module.exports = {
    isUser
}