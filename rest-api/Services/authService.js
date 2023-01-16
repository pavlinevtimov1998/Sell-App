const bcrypt = require("bcryptjs");

const User = require("../Models/User");

const { removePass } = require("../Utils/removePass");

async function register(body) {
    const { password, rePassword } = body;

    if (password !== rePassword) {
        throw {
            message: "Passwords don't match!",
            status: 400,
        };
    }

    const user = await User.create(body);

    return removePass(user);
}

async function login({ email, password }) {
    console.log(email, password);
    const user = await User.findOne({ email });

    if (!user) {
        throw {
            message: "Email or password don't match!",
            status: 401,
        };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: "Email or password don't match!",
            status: 401,
        };
    }

    return getToken({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    }).then((token) => {
        return [token, user];
    });
}

const removeAccount = (userId) => User.findByIdAndDelete(userId);

module.exports = {
    register,
    login,
    removeAccount,
};
