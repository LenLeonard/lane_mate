const pool = require("./db");

module.exports = {
  insertCity,
  selectAllCities,
  deleteFromCitiesById,
  updateCity,
};

async function insertCity({ name, stateProvinceID, stateProvinceName }) {
  try {
    const newCity = await pool.query(
      "INSERT INTO cities (name, state_province_id) VALUES ($1, $2, $3) RETURNING *",
      [name, stateProvinceID, stateProvinceName]
    );
  } catch (err) {
    console.error("city.model " + err.message);
  }
}

//select all cities from the database

async function selectAllCities() {
  try {
    const allCities = await pool.query("SELECT * FROM cities "); //returns an array of objects
    return allCities.rows;
  } catch (err) {
    console.error("selectAllCities error: " + err.message);
  }
}

//put/update a city in the database

async function updateCity(
  id,
  { city_name, phone, contact_ext, contact_email, contact_name, user_id }
) {
  try {
    const newCity = await pool.query(
      "UPDATE cities SET city_name = $1, phone = $2, contact_ext = $3, contact_email = $4, contact_name = $5, user_id = $6 WHERE id = $7 RETURNING *",
      [city_name, phone, contact_ext, contact_email, contact_name, user_id, id]
    );
    return newCity.rows[0];
  } catch (err) {
    console.error("putCity error: " + err.message);
  }
}

//delete a city from the database

async function deleteFromCitiesById(id) {
  try {
    const deletedCity = await pool.query("DELETE FROM cities WHERE id = $1", [
      id,
    ]);
    return deletedCity.rows;
  } catch (err) {
    console.error("deleteCity error: " + err.message);
  }
}

/*
// Find a single city by Name
async function findCityByName(cityName) {
  try {
    const city = await pool.query(
      `SELECT * FROM cities WHERE cityName = '${cityName}'`
    );
    res.json(newCity.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all cities for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM cities WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`cities: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_cities_found` }, null);
    }
  );
}

// Update City by Id
async function updateCityById(id, city, result) {
  await pool.query(
    `UPDATE cities SET cityName = ? WHERE id = ?`,
    [city.cityName, id],
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: `not_found` }, null);
        return;
      }
      console.log(`updated cities: `, {
        id: id,
        cityName: city.cityName,
      });
      result(null, { id: id, cityName: city.cityName });
    }
  );
}

// Delete a city by Id
async function removeCity(id, result) {
  await pool.query(`DELETE FROM cities WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted city with id: ${id}`);
    result(null, res);
  });
}

*/
