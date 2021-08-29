const isURL = require("validator/lib/isURL");
const router = require("express").Router();

// Database models
const ShortURL = require("../models/url");

const db = require("../utils/db_utils");
const { generateValidUrl } = require("../utils/utils");

router.get("/", async (req, res) => {
  res.send("LRBC URL API <br> format= /api/v1?url=https://example.com");
  return;
});

router.get("/v1", async (req, res) => {
  let url = req.query["url"];
  if (url) {
    if (isURL(url)) {
      // valid url
      const shortCode = await createShortUrl(url);
      const shortURL = generateValidUrl(req.get("host") + "/" + shortCode);
      res.status(200).send(shortURL);
      return;
    } else {
      res
        .status(400)
        .send("URL is invalid. Required format= http://example.com OR protocol://example.com?parameter=value#option");
      return;
    }
  } else {
    res.status(400).send("Invalid Request. Please include your url in parameters as url=https://example.com");
    return;
  }
  return;
});

async function createShortUrl(url) {
  const record = new ShortURL({ longURL: url });
  await record.save();
  return record.short;
}

module.exports = router;
