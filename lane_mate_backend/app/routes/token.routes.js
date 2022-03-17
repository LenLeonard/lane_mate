const refreshToken = require("../auth/refreshToken");
const validateRefreshToken = refreshToken.validateRefreshToken;

module.exports = (app, refreshTokens) => {
  // POST request to refrsh an access token
  app.post("/token", validateRefreshToken(refreshTokens));
};
