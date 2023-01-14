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

    const { image } = profileData;

    if (image) {
        cloudinaryImageId = profileData.image.substring(
            profileData.image.lastIndexOf("/") + 1,
            profileData.image.lastIndexOf(".")
        );

        await deleteCloudinaryImage(cloudinaryImageId);
    }

    profileData.image = newImage;

    return profileData.save();
}

module.exports = {
    getProfileData,
    editProfileData,
    updateProfileImg,
};
