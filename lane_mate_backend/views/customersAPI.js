/*
const pool = require("../db");

module.exports = function (app, db) {
  app.post("/customers", async (req, res) => {
    try {
      const {
        sales_rep_id,
        company_name,
        primary_contact,
        contact_email,
        contact_phone,
        city,
        state_province,
      } = req.body;
      console.log(req.body);
      const newCustomer = await pool.query(
        "INSERT INTO customers (sales_rep_id, company_name, primary_contact, contact_email, contact_phone, city, state_province) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          sales_rep_id,
          company_name,
          primary_contact,
          contact_email,
          contact_phone,
          city,
          state_province,
        ]
      );
      res.json(newCustomer);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Get all customers

  app.get("/customers", async (req, res) => {
    try {
      //Return all customers that match user id

      const allCustomers = await pool.query("SELECT * FROM customers "); //returns an array of objects
      res.json(allCustomers.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Access a customer by userId

  app.post("/customers/:sales_rep_id", async (req, res) => {
    try {
      const { sales_rep_id } = req.params; //id is the parameter
      console.log(req.params);
      const customer = await pool.query(
        "SELECT * FROM customers WHERE sales_rep_id = $1",
        [sales_rep_id]
      ); //query the database for the id
      res.json(customer.rows); //send the results to the front end
      console.log(customer.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Get a customer by id//

  app.get("/customers/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      console.log(req.params);
      const customer = await pool.query(
        "SELECT * FROM customers WHERE id = $1",
        [id]
      ); //query the database for the id
      console.log(customer.rows);
      res.json(customer.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });

  //Update a customer

  app.put("/customers/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      const {
        sales_rep_id,
        company_name,
        primary_contact,
        contact_email,
        contact_phone,
        city,
        state_province,
      } = req.body; //body is the data that is being sent to the database
      const updateCustomer = await pool.query(
        //query the database for the id
        "UPDATE customers SET sales_rep_id = $1, company_name = $2, primary_contact = $3, contact_email = $4, contact_phone = $5, city = $6, state_province = $7 WHERE id = $8",
        [
          sales_rep_id,
          company_name,
          primary_contact,
          contact_email,
          contact_phone,
          city,
          state_province,
        ]
      );
      res.json(updateCustomer.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });

  //Delete a customer

  app.delete("/customers/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      const deleteCustomer = await pool.query(
        //query the database for the id
        "DELETE FROM customers WHERE id = $1", //$1 is the placeholder for the value in the query
        [id] //the value in the query is the value in the array
      );
      res.json(deleteCustomer.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });
};
*/
