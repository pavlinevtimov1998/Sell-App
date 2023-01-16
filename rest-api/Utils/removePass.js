exports.removePass = (user) => ({
    _id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    image: user.image,
    isAdmin: user.isAdmin,
});
