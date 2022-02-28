const refreshToken = require("../auth/refreshToken");

const validateRefreshToken = refreshToken.validateRefreshToken;

module.exports = (app) => {
  // POST request to refrsh an access token
  app.post("/token", validateRefreshToken);
};
