const User = require("../Models/User");

const { getImagesUrl, deleteCloudinaryImage } = require("../Util/imageUpload");

const getProfileData = (userId) =>
    User.findById(userId).select("-password -__v -updatedAt").lean();


module.exports = {
    getProfileData,
    editProfileData,
    updateProfileImg,
};
