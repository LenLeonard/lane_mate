const handlingUnitModel = require("../models/handlingUnit.model");

const insertHandlingUnit = handlingUnitModel.insertHandlingUnit;
const selectAllHandlingUnits = handlingUnitModel.selectAllHandlingUnits;
const deleteFromHandlingUnitsById =
  handlingUnitModel.deleteFromHandlingUnitsById;
const updateHandlingUnit = handlingUnitModel.updateHandlingUnit;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = {
  getAllHandlingUnits,
  postHandlingUnit,
  deleteHandlingUnit,
  putHandlingUnit,
};

async function postHandlingUnit(req, res) {
  const {
    quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  } = req.body;

  //create new handlingUnit
  const newHandlingUnit = await insertHandlingUnit({
    quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  });
  //send response
  const camelHandlingUnit = keysToCamel(newHandlingUnit);

  res.json(camelHandlingUnit);
}

//get all handlingUnits
async function getAllHandlingUnits(req, res) {
  try {
    const allHandlingUnits = await selectAllHandlingUnits();
    const allHandlingUnitsCamelCase = allHandlingUnits.map((handlingUnit) => {
      return keysToCamel(handlingUnit);
    });

    res.json(allHandlingUnitsCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a handlingUnit
async function deleteHandlingUnit(req, res) {
  const { id } = req.params;
  const deletedHandlingUnit = await deleteFromHandlingUnitsById(id);
  const camelHandlingUnit = keysToCamel(deletedHandlingUnit);
  res.json(camelHandlingUnit);
}

//update a handlingUnit

async function putHandlingUnit(req, res) {
  const { id } = req.params;
  const {
    quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  } = req.body;
  const updatedHandlingUnit = await updateHandlingUnit(id, {
    quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  });
  const camelHandlingUnit = keysToCamel(updatedHandlingUnit);
  res.json(camelHandlingUnit);
}
