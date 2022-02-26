const laneStopModel = require("../models/laneStop.model");

const insertLaneStop = laneStopModel.insertLaneStop;
const selectAllLaneStops = laneStopModel.selectAllLaneStops;
const deleteFromLaneStopsById = laneStopModel.deleteFromLaneStopsById;
const updateLaneStop = laneStopModel.updateLaneStop;

module.exports = { getAllLaneStops, postLaneStop, deleteLaneStop, putLaneStop };

async function postLaneStop(req, res) {
  const { name, stateProvinceId, stateProvinceName } = req.body;
  const user = req.user;

  //create new laneStop
  const newLaneStop = await insertLaneStop({
    name,
    stateProvinceId,
    stateProvinceName,
  });
  //send response
  res.json(newLaneStop);
}

//get all laneStops
async function getAllLaneStops(req, res) {
  try {
    const allLaneStops = await selectAllLaneStops();

    res.json(allLaneStops);
  } catch (error) {
    console.log(error);
  }
}

//delete a laneStop
async function deleteLaneStop(req, res) {
  const { id } = req.params;
  const deletedLaneStop = await deleteFromLaneStopsById(id);
  res.json(deletedLaneStop);
}

//update a laneStop

async function putLaneStop(req, res) {
  const { id } = req.params;
  const { name, stateProvinceId, stateProvinceName } = req.body;
  const updatedLaneStop = await updateLaneStop({
    name,
    stateProvinceId,
    stateProvinceName,
  });
  res.json(updatedLaneStop);
}
