const mongoose = require("mongoose");
let mongodbURI = process.env.LRBC_MONGODB_URL;
console.log(mongodbURI);
module.exports = () => {
  mongodbURI += "?retryWrites=true&w=majority&ssl=true";
  mongoose
    .connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};
