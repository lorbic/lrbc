const express = require("express");
const mongoose = require("mongoose");
const ShortURL = require("./models/url");
const { app } = require("./startup");
// initialize remote database
require("./utils/db_init")();

const db = require("./utils/db_utils");
const { validateUrl } = require("./utils/utils");

app.get("/", (req, res) => {
  res.render("index", {});
  res.end();
});

app.get("/urls", async (req, res) => {
  db.getAllUrls().then((data) => {
    res.send(data);
  });
});

app.get("/urls-table", async (req, res) => {
  db.getAllUrls().then((data) => {
    res.render("table", { shortUrls: data });
  });
});

app.post("/short", async (req, res) => {
  let longUrl = req.body.longUrl;
  longUrl = validateUrl(longUrl);
  const record = new ShortURL({
    longURL: longUrl,
  });
  await record.save();
  let url = req.get("host") + "/" + record.short;
  url = validateUrl(url);
  const context = { url };
  res.render("short", { context });
});

app.get("/:shorturl", async (req, res) => {
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

const PORT = process.env.PORT || 3000;
// mongoose.connection.on("open", () => {
// });
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
