const refreshToken = require("../auth/refreshToken");
const tokenController = require("../controllers/token.controller");
const postToken = tokenController.postToken;
const validateRefreshToken = refreshToken.validateRefreshToken;

module.exports = (app) => {
  // POST request to refrsh an access token
  app.post("/token", validateRefreshToken, postToken);
};
