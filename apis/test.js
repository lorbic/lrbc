const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello");
});

router.get("/in", (req, res) => {
  res.send("Logging in....");
});

module.exports = router;
