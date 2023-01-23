const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

const config = require("./config");
const cors = require("../Middlewares/cors");
const { isAuth } = require("../Middlewares/isAuthMiddleware");

function expressConfig(app, express) {
    cloudinary.config(config.CLOUDINARY_CONFIG);

    app.use(cors(config.CORS.origin));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(isAuth);

    //   app.use(express.static(__dirname + "/public"));
}

module.exports = expressConfig;
