// demo authentication logic
function authenticate(req, res, next) {
  if (req.body.pin == process.env.PIN) {
    console.log(req.body.pin);
    console.log("Authenticated .....");
    next();
    return;
  }
  res.status(403).send("No Valid Authentication Credentials Provided");
  // res.end();
}

module.exports.authenticate = authenticate;
