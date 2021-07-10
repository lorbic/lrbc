const router = require("express").Router();

router.get("/profile", async (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
