const router = require("express").Router();

// Database models
const ShortURL = require("../models/url");

const db = require("../utils/db_utils");
const { generateValidUrl } = require("../utils/utils");

router.get("/", (req, res) => {
  res.render("index", {});
  res.end();
});

router.post("/s", async (req, res) => {
  let longUrl = req.body.longUrl;
  let shortUrlCode = req.body.shortUrlCode;
  longUrl = generateValidUrl(longUrl);
  const URLData = {
    longURL: longUrl,
  };
  if (shortUrlCode) {
    URLData["shortUrlCode"] = shortUrlCode;
  }
  const record = new ShortURL(URLData);
  await record.save();
  let url = req.get("host") + "/" + record.short;
  url = generateValidUrl(url);
  const context = { url };
  res.render("short", { context });
});

router.get("/:shorturl", async (req, res) => {
  if (req.params.shorturl) {
    db.getLongUrl(req.params.shorturl)
      .then((data) => {
        data.clicks++;
        data.save();
        res.redirect(data.longURL);
      })
      .catch((e) => {
        res.status(404).send("Short URL not found");
      });
  }
});

module.exports = router;
