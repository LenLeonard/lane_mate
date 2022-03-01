const accessToken = require("../auth/accessToken");
const cityController = require("../controllers/city.controller");
const postCity = cityController.postCity;
const getAllCities = cityController.getAllCities;
const deleteCity = cityController.deleteCity;
const putCity = cityController.putCity;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new city
  app.post("/cities", validateAccessToken, postCity);

  // GET all cities

  app.get("/cities", getAllCities);

  // DELETE a city by id
  app.delete("/cities/:id", validateAccessToken, deleteCity);

  // PUT a city b id
  app.put("/cities/:id", validateAccessToken, putCity);
};
