const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/", (req, res) => {
  console.log("Working", req.query.longUrl);
  res.render("index", { timestamp: Date.now() });
  res.end();
});

app.post("/short", (req, res) => {
  const lUrl = req.body.longUrl;
  console.log(req.body);
  let url = req.get("host") + "/" + lUrl;

  const context = {
    url: url,
  };
  res.render("shorted", { context });
});

app.get("/:shorturl", function (req, res) {
  let shortUrl = null;
  if (req.params.shorturl) {
    shortUrl = req.params.shorturl;
    console.log("ShortURL:", shortUrl);
  }
  const url = "https://google.com/search?q=" + shortUrl;
  res.redirect(url);
  res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
