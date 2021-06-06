const router = require("express").Router();
const db = require("../utils/db_utils");

router.get("/", async (req, res) => {
  db.getAllUrls().then((data) => {
    res.send(data);
  });
});

router.get("/table", async (req, res) => {
  db.getAllUrls().then((data) => {
    res.render("table", { shortUrls: data });
  });
});

router.get("/add", async (req, res) => {
  res.render("custom_url");
});

module.exports = router;
