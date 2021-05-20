const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

app = express();

app.get("/", (req, res) => {
  res.send("Welcome to LRBC:: url shortner");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
