const { app } = require("./startup");
const { auth, requiresAuth } = require("express-openid-connect");

// APIs
const urlViewApi = require("./apis/url_view");
const urlshorterApi = require("./apis/url_shorter");

// secure apis only on production environment
if (process.env.NODE_ENV == "production") {
  const { authConfig } = require("./utils/auth");
  app.use(auth(authConfig));

  const authApi = require("./apis/auth"); // auth0 user data apis

  app.use("/user", requiresAuth(), authApi);
  app.use("/urls", requiresAuth(), urlViewApi);
}
// development environment non-secure apis
else {
  app.use("/urls", urlViewApi);
}

// always keep root url to the bottom of all custom
// routes otherwise it will map the route to a short url
app.use("/", urlshorterApi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
