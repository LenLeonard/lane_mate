const pool = require("../db");

module.exports = function (app, db) {
  ////handling_unit ENDPOINTS

  app.post("/handling_units", async (req, res) => {
    try {
      const {
        quote_request_id,
        type,
        weight_lbs,
        length_inches,
        width_inches,
        height_inches,
        quantity,
      } = req.body;

      const handling_unit = await pool.query(
        "INSERT INTO handling_units (quote_request_id, type, weight_lbs, length_inches, width_inches, height_inches, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          quote_request_id,
          type,
          weight_lbs,
          length_inches,
          width_inches,
          height_inches,
          quantity,
        ]
      );
      console.log(req.body);
    } catch (err) {
      console.error("handling_unit post" + err.message);
    }
  });

  //Get all handling_units

  app.get("/handling_units", async (req, res) => {
    try {
      //Return all handling_units that match user id

      const handling_units = await pool.query("SELECT * FROM handling_units "); //returns an array of objects
      res.json(handling_units.rows);
    } catch (err) {
      console.error("handling_unit get" + err.message);
    }
  });

  //Access a handling_unit by handling_unit_id

  app.post("/handling_units/:handling_unit_id", async (req, res) => {
    try {
      const { handling_unit_id } = req.params; //id is the parameter

      const handling_unit = await pool.query(
        "SELECT * FROM handling_units WHERE id = $1",
        [handling_unit_id]
      ); //query the database for the id
      res.json(handling_unit.rows); //send the results to the front end
      console.log(handling_unit.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Delete a handling_unit by id

  app.delete("/handling_units/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      const deleteLane_stop = await pool.query(
        //query the database for the id
        "DELETE FROM handling_units WHERE id = $1", //$1 is the placeholder for the value in the query
        [id] //the value in the query is the value in the array
      );
      res.json(deleteLane_stop.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });
};
