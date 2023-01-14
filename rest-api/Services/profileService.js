const User = require("../Models/User");

const { getImagesUrl, deleteCloudinaryImage } = require("../Util/imageUpload");

const getProfileData = (userId) =>
    User.findById(userId).select("-password -__v -updatedAt").lean();

const editProfileData = (userId, body) =>
    User.findByIdAndUpdate(userId, body, { new: true, runValidators: true });

async function updateProfileImg(userId, file) {
    let cloudinaryImageId;

    const [newImage, profileData] = await Promise.all([
        getImagesUrl(file),
        User.findById(userId),
    ]);

    const { image } = profileData.userInfo;

    if (image) {
        cloudinaryImageId = profileData.userInfo.image.substring(
            profileData.userInfo.image.lastIndexOf("/") + 1,
            profileData.userInfo.image.lastIndexOf(".")
        );

        await deleteCloudinaryImage(cloudinaryImageId);
    }

    profileData.userInfo.image = newImage;

    return profileData.save();
}

module.exports = {
    getProfileData,
    editProfileData,
    updateProfileImg,
};
