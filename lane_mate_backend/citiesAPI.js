module.exports = function (app, db) {
  app.get("/cities", async (req, res) => {
    try {
      //Return all cities
      const allCities = await pool.query("SELECT * FROM cities "); //returns an array of objects
      res.json(allCities.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
};
