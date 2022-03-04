const pool = require("./db");

module.exports = {
  insertLaneStop,
  selectAllLaneStops,
  deleteFromLaneStopsById,
  updateLaneStop,
};

async function insertLaneStop({ cityId, isOrigin, quoteRequestId }) {
  try {
    const laneStop = await pool.query(
      "INSERT INTO lane_stops (city_id, is_origin, quote_request_id) VALUES ($1, $2, $3) RETURNING *",
      [cityId, isOrigin, quoteRequestId]
    );
    return laneStop.rows[0];
  } catch (err) {
    console.error("lane_stop post " + err.message);
  }
}

//select all laneStops from the database

async function selectAllLaneStops() {
  try {
    const allLaneStops = await pool.query("SELECT * FROM lane_stops "); //returns an array of objects
    return allLaneStops.rows;
  } catch (err) {
    console.error("selectAllLaneStops error: " + err.message);
  }
}

//put/update a laneStop in the database

async function updateLaneStop(id, { cityId, isOrigin, quoteRequestId }) {
  try {
    const newLaneStop = await pool.query(
      "UPDATE lane_stops SET laneStop_name = $1, phone = $2, contact_ext = $3, contact_email = $4, contact_name = $5, user_id = $6 WHERE id = $7 RETURNING *",
      [cityId, isOrigin, quoteRequestId]
    );
    return newLaneStop.rows[0];
  } catch (err) {
    console.error("putLaneStop error: " + err.message);
  }
}

//delete a laneStop from the database

async function deleteFromLaneStopsById(id) {
  try {
    const deletedLaneStop = await pool.query(
      "DELETE FROM lane_stops WHERE id = $1",
      [id]
    );
    return deletedLaneStop.rows;
  } catch (err) {
    console.error("deleteLaneStop error: " + err.message);
  }
}

/*
// Find a single laneStop by Name
async function findLaneStopByName(laneStopName) {
  try {
    const laneStop = await pool.query(
      `SELECT * FROM lane_stops WHERE laneStopName = '${laneStopName}'`
    );
    res.json(newLaneStop.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all lane_stops for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM lane_stops WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`lane_stops: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_lane_stops_found` }, null);
    }
  );
}

// Update LaneStop by Id
async function updateLaneStopById(id, laneStop, result) {
  await pool.query(
    `UPDATE lane_stops SET laneStopName = ? WHERE id = ?`,
    [laneStop.laneStopName, id],
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
      console.log(`updated lane_stops: `, {
        id: id,
        laneStopName: laneStop.laneStopName,
      });
      result(null, { id: id, laneStopName: laneStop.laneStopName });
    }
  );
}

// Delete a laneStop by Id
async function removeLaneStop(id, result) {
  await pool.query(`DELETE FROM lane_stops WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted laneStop with id: ${id}`);
    result(null, res);
  });
}

*/
