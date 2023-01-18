const profileController = require("express").Router();

const profileService = require("../Services/profileService");
const { isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Utils/errorParser");
const { upload } = require("../Utils/imageUpload");

profileController.get(
    "/",
    isUser,
    catchAsyncError(async (req, res) => {
        const profileData = await profileService.getProfileData(req.user._id);

        res.json(profileData);
    })
);

profileController.patch(
    "/",
    isUser,
    catchAsyncError(async (req, res) => {
        const userId = req.user._id;

        const profileData = await profileService.editProfileData(
            userId,
            req.body
        );

        res.json(profileData);
    })
);

profileController.patch(
    "/image-update",
    isUser,
    upload.single("image"),
    catchAsyncError(async (req, res) => {
        const userId = req.user._id;
        const image = req.file;

        const profileData = await profileService.updateProfileImg(
            userId,
            image
        );

        res.json({ image: profileData.image });
    })
);

module.exports = profileController;
