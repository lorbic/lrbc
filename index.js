const { app } = require("./startup");

const { auth, requiresAuth } = require("express-openid-connect");

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig));

// APIs
const urlViewApi = require("./apis/url_view");
const urlshorterApi = require("./apis/url_shorter");
const authApi = require("./apis/auth");

// Routing
app.use("/user", requiresAuth(), authApi);
app.use("/urls", requiresAuth(), urlViewApi);
// always keep root url to the bottom of all custom
// routes otherwise it will map the route to a short url
app.use("/", urlshorterApi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
