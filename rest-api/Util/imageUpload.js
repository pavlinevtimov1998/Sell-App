const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");
const { unlink } = require("fs");

const asyncUnlink = (img) => promisify(unlink)(img);

const upload = multer({ dest: "./Uploads" });

const uploadToCloudinary = (filePath) => cloudinary.uploader.upload(filePath);
const deleteCloudinaryImage = (id) => cloudinary.uploader.destroy(id);

async function getImagesUrl(files) {
    if (Array.isArray(files)) {
        const imagesUrl = await Promise.all(
            files.map((f, i) => uploadToCloudinary(f[i].path))
        );

        await Promise.all(files.map((f, i) => asyncUnlink(f[i].path)));

        return imagesUrl.map((img) => img.secure_url);
    } else {
        const filePath = files.path;

        const imgUrl = await uploadToCloudinary(filePath);
        await asyncUnlink(filePath);

        return imgUrl.secure_url;
    }
}

module.exports = {
    upload,
    uploadToCloudinary,
    deleteCloudinaryImage,
    getImagesUrl,
};
