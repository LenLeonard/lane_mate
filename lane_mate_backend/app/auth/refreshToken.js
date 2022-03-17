const jwt = require("jsonwebtoken");
const accessToken = require("../auth/accessToken");
const generateAccessToken = accessToken.generateAccessToken;

const validateRefreshToken = (refreshTokens) => (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(401);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email, id: user.id });
    res.json({ accessToken: accessToken });
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { validateRefreshToken, generateRefreshToken };
