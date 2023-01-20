const { getImagesUrl } = require("./imageUpload");

async function categoriesActionHandler(Model, body, file, isEdit, id) {
    if (!file) {
        throw {
            message: "Image is required!",
            status: 400,
        };
    }

    body.image = await getImagesUrl(file);

    if (isEdit) {
        const query = await Model.findByIdAndUpdate(id, body, {
            runValidators: true,
        });

        const url = query.image;

        return deleteCloudinaryImage(
            url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
        );
    }

    return Model.create(body);
}

module.exports = categoriesActionHandler;
