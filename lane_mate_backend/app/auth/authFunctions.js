const jwt = require("jsonwebtoken");

module.exports = {
  validateAccessToken,
  validateRefreshToken,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
};

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

let refreshTokens = [];

const validateRefreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email, id: user.id });
    res.json({ accessToken: accessToken });
  });
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
