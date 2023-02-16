const bcrypt = require("bcryptjs");

const User = require("../Models/User");

const { removePass } = require("../Utils/removePass");

async function register(body) {
    const { password, rePassword } = body;

    if (!password) {
        throw {
            message: "Passwords is required!",
            status: 400,
        };
    }

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

    if (!user.password) {
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

async function thirdPartyAuth(userData) {
    const user = await User.findOne({ email: userData.email });

    if (user) {
        if (user.thirdPartyId !== userData.id) {
            throw {
                message: "Unauthorized!",
                status: 401,
            };
        }
        return removePass(user);
    } else {
        const user = await User.create({
            email: userData.email,
            isAdmin: false,
            image: userData.image,
            isThirdParty: true,
            thirdPartyId: userData.id,
        });

        return removePass(user);
    }
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
    thirdPartyAuth,
};
