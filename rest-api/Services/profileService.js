const User = require("../Models/User");

const { getImagesUrl, deleteCloudinaryImage } = require("../Util/imageUpload");

const getProfileData = (userId) =>
    User.findById(userId).select("-password -__v -updatedAt").lean();

    
const editProfileData = (userId, body) =>
User.findByIdAndUpdate(userId, body, { new: true, runValidators: true });



module.exports = {
    getProfileData,
    editProfileData,
    updateProfileImg,
};
