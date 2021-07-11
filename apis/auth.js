const router = require("express").Router();

router.get("/", async (req, res) => {
  console.log(req.oidc.isAuthenticated() ? "AUTH0:::Logged in" : "AUTH0:::Logged out");
  res.send(JSON.stringify(req.oidc.isAuthenticated() ? "AUTH0:::Logged in" : "AUTH0:::Logged out"));
});

router.get("/profile", async (req, res) => {
  console.log(req.oidc.isAuthenticated() ? "AUTH0:::Logged in" : "AUTH0:::Logged out");
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
