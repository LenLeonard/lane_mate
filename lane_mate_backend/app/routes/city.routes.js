const checkAuth = require("../auth/checkAuth");
const cityController = require("../controllers/city.controller");
const postCity = cityController.postCity;
const getAllCities = cityController.getAllCities;
const deleteCity = cityController.deleteCity;
const putCity = cityController.putCity;

module.exports = (app) => {
  // POST new city
  app.post("/cities", checkAuth, postCity);

  // GET all cities

  app.get("/cities", checkAuth, getAllCities);

  // DELETE a city by id
  app.delete("/cities/:id", checkAuth, deleteCity);

  // PUT a city b id
  app.put("/cities/:id", checkAuth, putCity);
};
