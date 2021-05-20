const mongoose = require("mongoose");
const ShortURL = require("../models/url");

module.exports.getAllUrls = async () => {
  return await ShortURL.find({});
};

module.exports.getLongUrl = async (shorturl) => {
  return await ShortURL.findOne({ short: shorturl });
};
