const accessToken = require("../auth/accessToken");
const laneStopController = require("../controllers/laneStop.controller");
const postLaneStop = laneStopController.postLaneStop;
const getLaneStops = laneStopController.getAllLaneStops;
const deleteLaneStop = laneStopController.deleteLaneStop;
const putLaneStop = laneStopController.putLaneStop;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new laneStop
  app.post("/laneStops", validateAccessToken, postLaneStop);

  // GET all lane_stops

  app.get("/laneStops", validateAccessToken, getLaneStops);

  // DELETE a laneStop by id
  app.delete("/laneStops/:id", validateAccessToken, deleteLaneStop);

  // PUT a laneStop b id
  app.put("/laneStops/:id", validateAccessToken, putLaneStop);
};
