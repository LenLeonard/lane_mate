const accessToken = require("../auth/accessToken");
const carrierController = require("../controllers/carrier.controller");
const postCarrier = carrierController.postCarrier;
const getAllCarriers = carrierController.getAllCarriers;
const deleteCarrier = carrierController.deleteCarrier;
const putCarrier = carrierController.putCarrier;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new carrier
  app.post("/carriers", validateAccessToken, postCarrier);

  // GET all carriers

  app.get("/carriers", validateAccessToken, getAllCarriers);

  // DELETE a carrier by id
  app.delete("/carriers/:id", validateAccessToken, deleteCarrier);

  // PUT a carrier b id
  app.put("/carriers/:id", validateAccessToken, putCarrier);
};
