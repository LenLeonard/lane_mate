const handlingUnitModel = require("../models/handlingUnit.model");

const insertHandlingUnit = handlingUnitModel.insertHandlingUnit;
const selectAllHandlingUnits = handlingUnitModel.selectAllHandlingUnits;
const deleteFromHandlingUnitsById =
  handlingUnitModel.deleteFromHandlingUnitsById;
const updateHandlingUnit = handlingUnitModel.updateHandlingUnit;

module.exports = {
  getAllHandlingUnits,
  postHandlingUnit,
  deleteHandlingUnit,
  putHandlingUnit,
};

async function postHandlingUnit(req, res) {
  const {
    quoteRequestId: quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  } = req.body;
  const user = req.user;

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
  res.json(newHandlingUnit);
}

//get all handlingUnits
async function getAllHandlingUnits(req, res) {
  try {
    const allHandlingUnits = await selectAllHandlingUnits();

    res.json(allHandlingUnits);
  } catch (error) {
    console.log(error);
  }
}

//delete a handlingUnit
async function deleteHandlingUnit(req, res) {
  const { id } = req.params;
  const deletedHandlingUnit = await deleteFromHandlingUnitsById(id);
  res.json(deletedHandlingUnit);
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
  res.json(updatedHandlingUnit);
}
