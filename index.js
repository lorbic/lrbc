const { app, config } = require("./startup");

// APIs
const authApi = require("./apis/auth");
const urlViewApi = require("./apis/url_view");
const urlShortnerApi = require("./apis/url_shortner");

// Routing
app.use("/auth", authApi);
app.use("/urls", urlViewApi);
// always keep root url to the bottom of all custom
// routes otherwise it will map the route to a short url
app.use("/", urlShortnerApi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
