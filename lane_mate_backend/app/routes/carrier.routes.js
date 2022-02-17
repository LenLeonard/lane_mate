const checkAuth = require("../auth/checkAuth");
const carrierController = require("../controllers/carrier.controller");
const postCarrier = carrierController.postCarrier;
const getAllCarriers = carrierController.getAllCarriers;
const deleteCarrier = carrierController.deleteCarrier;
const putCarrier = carrierController.putCarrier;

module.exports = (app) => {
  // POST new carrier
  app.post("/carriers", checkAuth, postCarrier);

  // GET all carriers

  app.get("/carriers", checkAuth, getAllCarriers);

  // DELETE a carrier by id
  app.delete("/carriers/:id", checkAuth, deleteCarrier);

  // PUT a carrier b id
  app.put("/carriers/:id", checkAuth, putCarrier);
};
