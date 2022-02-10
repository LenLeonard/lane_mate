const pool = require("./db");

module.exports = function (app, db) {
  ////lane_stop ENDPOINTS

  app.post("/lane_stops", async (req, res) => {
    try {
      const { city_id, is_origin, quote_request_id } = req.body;

      const lane_stop = await pool.query(
        "INSERT INTO lane_stops (city_id, is_origin, quote_request_id) VALUES ($1, $2, $3) RETURNING *",
        [city_id, is_origin, quote_request_id]
      );
    } catch (err) {
      console.error("lane_stop post" + err.message);
    }
  });

  //Get all lane_stops

  app.get("/lane_stops", async (req, res) => {
    try {
      //Return all lane_stops that match user id

      const allLane_stops = await pool.query("SELECT * FROM lane_stops "); //returns an array of objects
      res.json(allLane_stops.rows);
    } catch (err) {
      console.error("lane_stop get" + err.message);
    }
  });

  //Access a lane_stop by lane_stop_id

  app.post("/lane_stops/:lane_stop_id", async (req, res) => {
    try {
      const { lane_stop_id } = req.params; //id is the parameter

      const lane_stop = await pool.query(
        "SELECT * FROM lane_stops WHERE id = $1",
        [lane_stop_id]
      ); //query the database for the id
      res.json(lane_stop.rows); //send the results to the front end
      console.log(lane_stop.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Delete a lane_stop by id

  app.delete("/lane_stops/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      const deleteLane_stop = await pool.query(
        //query the database for the id
        "DELETE FROM lane_stops WHERE id = $1", //$1 is the placeholder for the value in the query
        [id] //the value in the query is the value in the array
      );
      res.json(deleteLane_stop.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });
};
