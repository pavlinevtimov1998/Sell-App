const express = require("express");
const dotenv = require("dotenv");

dotenv.config({
    path: __dirname + "/config.env",
});

const { DB_URL, PORT } = require("./config/config");
const expressConfig = require("./config/express");
const { initDB } = require("./config/database");

const router = require("./router");

async function startServer() {
    const app = express();

    await initDB(DB_URL);

    expressConfig(app, express);

    app.use("/api", router);

    // app.use("*", (req, res) => {
    //   res.sendFile(__dirname + "/public/index.html");
    // });

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
}

startServer();
