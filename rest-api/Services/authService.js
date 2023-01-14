const bcrypt = require("bcryptjs");

const User = require("../Models/User");

const { getToken } = require("../Util/jwtConfig");

async function register(body) {
    const { password, rePassword } = body;

    if (password !== rePassword) {
        throw {
            message: "Passwords don't match!",
            status: 400,
        };
    }

    const user = await User.create(body);

    return getToken({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
    }).then((token) => {
        return [token, user];
    });
}

async function login(body) {
    const user = await User.findOne({ username: body.username });

    if (!user) {
        throw {
            message: "Username or password don't match!",
            status: 401,
        };
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
        throw {
            message: "Username or password don't match!",
            status: 401,
        };
    }

    return getToken({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
    }).then((token) => {
        return [token, user];
    });
}

module.exports = {
    register,
};
