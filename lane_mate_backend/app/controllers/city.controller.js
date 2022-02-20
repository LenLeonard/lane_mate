const cityModel = require("../models/city.model");

const insertCity = cityModel.insertCity;
const selectAllCities = cityModel.selectAllCities;
const deleteFromCitiesById = cityModel.deleteFromCitiesById;
const updateCity = cityModel.updateCity;

module.exports = { getAllCities, postCity, deleteCity, putCity };

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
  res.json(newCity);
}

//get all citys
async function getAllCities(req, res) {
  try {
    const allCities = await selectAllCities();

    res.json(allCities);
  } catch (error) {
    console.log(error);
  }
}

//delete a city
async function deleteCity(req, res) {
  const { id } = req.params;
  const deletedCity = await deleteFromCitiesById(id);
  res.json(deletedCity);
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
  res.json(updatedCity);
}
