////quoteRequest ENDPOINTS
const pool = require("../db");
module.exports = function (app, db) {
  app.post("/quote_requests", async (req, res) => {
    try {
      const { sales_rep_id, customer_id } = req.body;

      const quote_request = await pool.query(
        "INSERT INTO quote_requests (sales_rep_id, customer_id) VALUES ($1, $2) RETURNING *",
        [sales_rep_id, customer_id]
      );

      res.json(quote_request.rows);
      console.log(quote_request.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Get all quote_requests

  app.get("/quote_requests", async (req, res) => {
    try {
      const quote_requests = await pool.query("SELECT * FROM quote_requests "); //returns an array of objects
      res.json(quote_requests.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Access a quote_request by quote_request_id

  app.post("/quote_requests/:quote_request_id", async (req, res) => {
    try {
      const { quote_request_id } = req.params; //id is the parameter

      const quote_request = await pool.query(
        "SELECT * FROM quote_requests WHERE quote_request_id = $1",
        [quote_request_id]
      ); //query the database for the id
      res.json(quote_request.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });

  //Delete a quote_request by id

  app.delete("/quote_requests/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      const delete_quote_request = await pool.query(
        //query the database for the id
        "DELETE FROM quote_requests WHERE id = $1", //$1 is the placeholder for the value in the query
        [id] //the value in the query is the value in the array
      );
      res.json(delete_quote_request.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });
};
