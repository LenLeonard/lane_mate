const cityModel = require("../models/city.model");

const insertCity = cityModel.insertCity;
const selectAllCities = cityModel.selectAllCities;
const deleteFromCitiesById = cityModel.deleteFromCitiesById;
const updateCity = cityModel.updateCity;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

async function postCity(req, res) {
  const { name, stateProvinceId, stateProvinceName } = req.body;
  const user = req.user;

  //create new city
  const newCity = await insertCity({
    name,
    stateProvinceId,
    stateProvinceName,
  });
  //send response
  const newCityCamelCase = keysToCamel(newCity);
  res.json(newCityCamelCase);
}

//get all citys
async function getAllCities(req, res) {
  try {
    const allCities = await selectAllCities();
    const allCitiesCamelCase = allCities.map((city) => {
      return keysToCamel(city);
    });

    res.json(allCitiesCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a city
async function deleteCity(req, res) {
  const { id } = req.params;
  const deletedCity = await deleteFromCitiesById(id);
  const deletedCityCamelCase = keysToCamel(deletedCity);
  res.json(deletedCityCamelCase);
}

//update a city

async function putCity(req, res) {
  const { id } = req.params;
  const { name, stateProvinceId, stateProvinceName } = req.body;
  const updatedCity = await updateCity({
    name,
    stateProvinceId,
    stateProvinceName,
  });
  const updatedCityCamelCase = keysToCamel(updatedCity);
  res.json(updatedCityCamelCase);
}
module.exports = { getAllCities, postCity, deleteCity, putCity };
