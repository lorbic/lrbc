const mongoose = require("mongoose");

const { customAlphabet } = require("nanoid");

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";
const idSize = 6; //100 days to 1% repeat chance (17/03/2022) 10 id

const nanoid = customAlphabet(alphabet, idSize);

const urlSchema = new mongoose.Schema({
    longURL: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        unique: true,
        default: nanoid,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Url", urlSchema);
