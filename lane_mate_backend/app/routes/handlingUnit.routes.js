const accessToken = require("../auth/accessToken");
const handlingUnitController = require("../controllers/handlingUnit.controller");
const postHandlingUnit = handlingUnitController.postHandlingUnit;
const getAllHandlingUnits = handlingUnitController.getAllHandlingUnits;
const deleteHandlingUnit = handlingUnitController.deleteHandlingUnit;
const putHandlingUnit = handlingUnitController.putHandlingUnit;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new handlingUnit
  app.post("/handlingUnits", validateAccessToken, postHandlingUnit);

  // GET all handlingUnits

  app.get("/handlingUnits", validateAccessToken, getAllHandlingUnits);

  // DELETE a handlingUnit by id
  app.delete("/handlingUnits/:id", validateAccessToken, deleteHandlingUnit);

  // PUT a handlingUnit b id
  app.put("/handlingUnits/:id", validateAccessToken, putHandlingUnit);
};
