const checkAuth = require("../auth/checkAuth");
const handlingUnitController = require("../controllers/handlingUnit.controller");
const postHandlingUnit = handlingUnitController.postHandlingUnit;
const getAllHandlingUnits = handlingUnitController.getAllHandlingUnits;
const deleteHandlingUnit = handlingUnitController.deleteHandlingUnit;
const putHandlingUnit = handlingUnitController.putHandlingUnit;

module.exports = (app) => {
  // POST new handlingUnit
  app.post("/handlingUnits", checkAuth, postHandlingUnit);

  // GET all handlingUnits

  app.get("/handlingUnits", checkAuth, getAllHandlingUnits);

  // DELETE a handlingUnit by id
  app.delete("/handlingUnits/:id", checkAuth, deleteHandlingUnit);

  // PUT a handlingUnit b id
  app.put("/handlingUnits/:id", checkAuth, putHandlingUnit);
};
