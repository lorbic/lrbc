const { app } = require("./startup");
const { auth, requiresAuth } = require("express-openid-connect");

// APIs
const urlView = require("./apis/url_view");
const urlshorter = require("./apis/url_shorter");
const urlApis = require("./apis/apis");

// secure apis only on production environment
if (process.env.NODE_ENV == "production") {
  const { authConfig } = require("./utils/auth");
  app.use(auth(authConfig));

  const authApi = require("./apis/auth"); // auth0 user data apis

  app.use("/user", requiresAuth(), authApi);
  app.use("/urls", requiresAuth(), urlView);
}
// development environment non-secure apis
else {
  app.use("/urls", urlView);
}

// short urls using /api/v1?u=https://example.com
app.use("/api", urlApis);

// always keep root url to the bottom of all custom
// routes otherwise it will map the route to a short url
app.use("/", urlshorter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
