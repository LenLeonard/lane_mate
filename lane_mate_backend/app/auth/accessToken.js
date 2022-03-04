const jwt = require("jsonwebtoken");

const validateAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Bearer token
  const token = authHeader && authHeader.split(" ")[1]; // token
  if (token == null) {
    // if token is null
    return res.sendStatus(401); // send status 401
  }
  //check if token is valid
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // send status 403
    req.user = user; // user is returned from jwt.verify, from the access token payload
  });
  next(); // call next middleware
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

module.exports = { validateAccessToken, generateAccessToken };
