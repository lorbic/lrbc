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
  longUrl = generateValidUrl(longUrl);
  const URLData = {
    longURL: longUrl,
  };
  const record = new ShortURL(URLData);
  await record.save();
  let url = req.get("host") + "/" + record.short;
  url = generateValidUrl(url);
  const context = { url };
  res.render("short", { context });
});

// Custom Short Code
router.post("/sc", async (req, res) => {
  //   let longUrl = req.body.longUrl;
  //   let shortCode = req.body.shortUrlCode;
  //   let passcode = req.body.passcode;

  let { longUrl, shortUrlCode, passcode } = req.body;

  if (passcode == process.env.URL_PASSCODE) {
    longUrl = generateValidUrl(longUrl);
    const URLData = {
      longURL: longUrl,
    };
    if (shortUrlCode) {
      let exists = await db.getLongUrl(shortUrlCode);
      if (exists) res.status(404).send("Short Code Exists");
      else {
        const record = new ShortURL(URLData);
        record.short = shortUrlCode;
        await record.save();
        let url = req.get("host") + "/" + record.short;
        url = generateValidUrl(url);
        const context = { url };
        res.render("short", { context });
      }
    }
  }
  // wrong passcode was provided
  else {
    res.status(400).send(`<h2 style='color:red;'> BAD REQUEST </h2>
    <br> Custom urls cannot be created without valid passcode.`);
    res.end();
  }
});

// get target url from database using short code
router.get("/:shorturl", async (req, res) => {
  if (req.params.shorturl) {
    db.getLongUrl(req.params.shorturl)
      .then((data) => {
        data.clicks++;
        data.save();
        console.log(data);
        res.redirect(data.longURL);
      })
      .catch((e) => {
        res.status(404).send("Short URL not found");
      });
  }
});

module.exports = router;
