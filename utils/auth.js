// dummy function
module.exports.setupAuth = (app) => {
  const { authConfig } = require("./utils/auth");
  app.use(auth(authConfig));

  const authApi = require("./apis/auth"); // auth0 user data apis
  //secured version of apis
  app.use("/user", requiresAuth(), authApi);
  app.use("/urls", requiresAuth(), urlViewApi);
};

module.exports.authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL,
};
