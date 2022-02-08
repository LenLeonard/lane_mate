module.exports = function (app, db) {
  app.post("/carriers", async (req, res) => {
    try {
      const { carrier_name, phone, contact_ext, contact_email, contact_name } =
        req.body;
      console.log(req.body);
      const newCarrier = await pool.query(
        "INSERT INTO carriers (carrier_name, phone, contact_ext, contact_email, contact_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [carrier_name, phone, contact_ext, contact_email, contact_name]
      );
      res.json(newCarrier);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Get all carriers

  app.get("/carriers", async (req, res) => {
    try {
      const allCarriers = await pool.query("SELECT * FROM carriers "); //returns an array of objects
      res.json(allCarriers.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Get a carrier by id//

  app.get("/carriers/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      console.log(req.params);
      const carrier = await pool.query("SELECT * FROM carriers WHERE id = $1", [
        id,
      ]); //query the database for the id
      res.json(carrier.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });

  //Update a carrier by id//

  app.put("/carriers/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      const { carrier_name, phone, contact_ext, contact_email, contact_name } =
        req.body; //body is the data that is being sent to the database
      const updateCarrier = await pool.query(
        //query the database for the id
        "UPDATE carriers SET name = $1, phone = $2, contact_ext = $3, contact_email = $4, contact_name = $5 WHERE id = $6",
        [carrier_name, phone, contact_ext, contact_email, contact_name]
      );
      res.json(updateCarrier.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });

  //Delete a carrier

  app.delete("/carriers/:id", async (req, res) => {
    try {
      const { id } = req.params; //id is the parameter
      const deleteCarrier = await pool.query(
        //query the database for the id
        "DELETE FROM carriers WHERE id = $1", //$1 is the placeholder for the value in the query
        [id] //the value in the query is the value in the array
      );
      res.json(deleteCarrier.rows); //send the results to the front end
    } catch (err) {
      console.error(err.message);
    }
  });
};
