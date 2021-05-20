const express = require("express");
const app = express();
app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/favicon.ico", (req, res) => res.status(204));

module.exports.app = app;
