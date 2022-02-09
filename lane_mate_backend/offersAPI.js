////offer ENDPOINTS
const pool = require("./db");
module.exports = function (app, db) {
  app.post("/offers", async (req, res) => {
    try {
      const { quote_request_id, carrier_id, rate, notes } = req.body;
      console.log(req.body);

      const offer = await pool.query(
        "INSERT INTO offers (quote_request_id, carrier_id, rate, notes) VALUES ($1, $2, $3, $4) RETURNING *",
        [quote_request_id, carrier_id, rate, notes]
      );

      console.log(offer);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Get all offers

  app.get("/offers", async (req, res) => {
    try {
      const alloffers = await pool.query("SELECT * FROM offers "); //returns an array of objects
      res.json(alloffers.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Access a offer by quote_request_id

  app.post("/offers/:quote_request_id", async (req, res) => {
    try {
      const { quote_request_id } = req.params; //id is the parameter
      console.log(req.params);
      const offer = await pool.query(
        "SELECT * FROM offers WHERE quote_request_id = $1",
        [quote_request_id]
      ); //query the database for the id
      res.json(offer.rows); //send the results to the front end
      console.log(offer.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Delete a offer by id

  app.delete("/offers/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      const deleteoffer = await pool.query(
        //query the database for the id
        "DELETE FROM offers WHERE id = $1", //$1 is the placeholder for the value in the query
        [id] //the value in the query is the value in the array
      );
      res.json(deleteoffer.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });
};
