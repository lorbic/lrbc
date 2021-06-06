// Unused
const ShortURL = require("../models/url");
const { generateValidUrl } = require("./utils");

module.exports.saveCustomUrl = async (data) => {
  console.log(`URL DATA:: ${data}`);
  let { longUrl } = data;
  let { shortUrlCode } = data;
  longUrl = generateValidUrl(longUrl);
  const record = new ShortURL({
    longURL: longUrl,
    short: shortUrlCode,
  });
  await record.save();
  return record.short;
};
