const mongoose = require("mongoose");

const townSchema = new mongoose.Schema({
    city: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    country: {
        type: String,
    },
});

const Town = mongoose.model("Town", townSchema);

module.exports = Town;
