const accessToken = require("../auth/accessToken");
const loginController = require("../controllers/login.controller");
const postLogin = loginController.postLogin;

const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new user
  app.post("/login", postLogin);
};
