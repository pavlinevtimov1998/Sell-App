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

    return removePass(user);
}

const removeAccount = (userId) => User.findByIdAndDelete(userId);

const getUserData = async (userId) => {
    const user = await User.findById(userId);

    return removePass(user);
};

module.exports = {
    register,
    login,
    removeAccount,
    getUserData,
};
