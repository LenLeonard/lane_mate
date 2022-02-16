const checkAuth = require("../auth/checkAuth");

module.exports = (app) => {
  const postCarrier = require("../controllers/carrier.controller");
  // Create new player
  app.post("/carriers", checkAuth, postCarrier);
};
