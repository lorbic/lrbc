const { app, config } = require("./startup");

const { auth } = require("express-openid-connect");

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
const urlShortnerApi = require("./apis/url_shortner");

// Routing
app.use("/urls", urlViewApi);
// always keep root url to the bottom of all custom
// routes otherwise it will map the route to a short url
app.use("/", urlShortnerApi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
