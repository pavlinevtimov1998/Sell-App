const isUser = (message) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message });
    }

    next();
};

const isGuest = (message) => (req, res, next) => {
    if (req.user) {
        return res.status(400).json({ message });
    }

    next();
};

module.exports = {
    isUser,
    isGuest,
};
