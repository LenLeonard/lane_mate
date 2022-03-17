const loginController = require("../controllers/login.controller");
const postLogin = loginController.postLogin;

module.exports = (app, refreshTokens) => {
  // POST new user
  app.post("/login", postLogin(refreshTokens));
};
