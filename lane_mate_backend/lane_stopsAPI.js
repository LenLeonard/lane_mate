module.exports = function (app, db) {
  ////lane_stop ENDPOINTS

  app.post("/lane_stops", async (req, res) => {
    try {
      const { city_id, is_origin, quote_request_id } = req.body;
      console.log(req.body);

      const lane_stop = await pool.query(
        "INSERT INTO lane_stops (city_id, is_origin, quote_request_id) VALUES ($1, $2, $3) RETURNING *",
        [city_id, is_origin, quote_request_id]
      );

      console.log(lane_stop);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Get all lane_stops

  app.get("/lane_stops", async (req, res) => {
    try {
      //Return all lane_stops that match user id

      const allLane_stops = await pool.query("SELECT * FROM lane_stops "); //returns an array of objects
      res.json(allLane_stops.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Access a lane_stop by quote_request_id

  app.post("/lane_stops/:quote_request_id", async (req, res) => {
    try {
      const { quote_request_id } = req.params; //id is the parameter
      console.log(req.params);
      const lane_stop = await pool.query(
        "SELECT * FROM lane_stops WHERE quote_request_id = $1",
        [quote_request_id]
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
