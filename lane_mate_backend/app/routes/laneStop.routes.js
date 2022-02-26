const accessToken = require("../auth/accessToken");
const laneStopController = require("../controllers/laneStop.controller");
const postLaneStop = laneStopController.postLaneStop;
const getLaneStops = laneStopController.getAllLaneStops;
const deleteLaneStop = laneStopController.deleteLaneStop;
const putLaneStop = laneStopController.putLaneStop;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new laneStop
  app.post("/lane_stops", validateAccessToken, postLaneStop);

  // GET all lane_stops

  app.get("/lane_stops", validateAccessToken, getLaneStops);

  // DELETE a laneStop by id
  app.delete("/lane_stops/:id", validateAccessToken, deleteLaneStop);

  // PUT a laneStop b id
  app.put("/lane_stops/:id", validateAccessToken, putLaneStop);
};
