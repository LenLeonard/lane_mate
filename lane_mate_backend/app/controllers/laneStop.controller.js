const laneStopModel = require("../models/laneStop.model");

const insertLaneStop = laneStopModel.insertLaneStop;
const selectAllLaneStops = laneStopModel.selectAllLaneStops;
const deleteFromLaneStopsById = laneStopModel.deleteFromLaneStopsById;
const updateLaneStop = laneStopModel.updateLaneStop;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = { getAllLaneStops, postLaneStop, deleteLaneStop, putLaneStop };

async function postLaneStop(req, res) {
  const { cityId, isOrigin, quoteRequestId } = req.body;

  //create new laneStop
  const newLaneStop = await insertLaneStop({
    cityId,
    isOrigin,
    quoteRequestId,
  });
  //send response
  const newLaneStopCamelCase = keysToCamel(newLaneStop);
  res.json(newLaneStopCamelCase);
}

//get all laneStops
async function getAllLaneStops(req, res) {
  try {
    const allLaneStops = await selectAllLaneStops();
    const allLaneStopsCamelCase = allLaneStops.map((laneStop) => {
      return keysToCamel(laneStop);
    });

    res.json(allLaneStopsCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a laneStop
async function deleteLaneStop(req, res) {
  const { id } = req.params;
  const deletedLaneStop = await deleteFromLaneStopsById(id);
  const deletedLaneStopCamelCase = keysToCamel(deletedLaneStop);
  res.json(deletedLaneStopCamelCase);
}

//update a laneStop

async function putLaneStop(req, res) {
  const { id } = req.params;
  const { cityId, isOrigin, quoteRequestId } = req.body;
  const updatedLaneStop = await updateLaneStop({
    cityId,
    isOrigin,
    quoteRequestId,
  });
  const updatedLaneStopCamelCase = keysToCamel(updatedLaneStop);
  res.json(updatedLaneStopCamelCase);
}
