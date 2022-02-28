const pool = require("./db");

module.exports = {
  insertCarrier,
  selectAllCarriers,
  deleteFromCarriersById,
  updateCarrier,
};

async function insertCarrier({
  carrierName,
  phone,
  contactExt,
  contactEmail,
  contactName,
  userId,
}) {
  try {
    const newCarrier = await pool.query(
      "INSERT INTO carriers (carrier_name, phone, contact_ext, contact_email, contact_name, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [carrierName, phone, contactExt, contactEmail, contactName, userId]
    );
  } catch (err) {
    console.error("carrier.model " + err.message);
  }
}
``;
//select all carriers from the database

async function selectAllCarriers() {
  try {
    const allCarriers = await pool.query("SELECT * FROM carriers "); //returns an array of objects
    return allCarriers.rows;
  } catch (err) {
    console.error("selectAllCarriers error: " + err.message);
  }
}

//put/update a carrier in the database

async function updateCarrier(
  id,
  { carrier_name, phone, contact_ext, contact_email, contact_name, user_id }
) {
  try {
    const newCarrier = await pool.query(
      "UPDATE carriers SET carrier_name = $1, phone = $2, contact_ext = $3, contact_email = $4, contact_name = $5, user_id = $6 WHERE id = $7 RETURNING *",
      [
        carrier_name,
        phone,
        contact_ext,
        contact_email,
        contact_name,
        user_id,
        id,
      ]
    );
    return newCarrier.rows[0];
  } catch (err) {
    console.error("putCarrier error: " + err.message);
  }
}

//delete a carrier from the database

async function deleteFromCarriersById(id) {
  try {
    const deletedCarrier = await pool.query(
      "DELETE FROM carriers WHERE id = $1",
      [id]
    );
    return deletedCarrier.rows;
  } catch (err) {
    console.error("deleteCarrier error: " + err.message);
  }
}

/*
// Find a single carrier by Name
async function findCarrierByName(carrierName) {
  try {
    const carrier = await pool.query(
      `SELECT * FROM carriers WHERE carrierName = '${carrierName}'`
    );
    res.json(newCarrier.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all carriers for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM carriers WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`carriers: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_carriers_found` }, null);
    }
  );
}

// Update Carrier by Id
async function updateCarrierById(id, carrier, result) {
  await pool.query(
    `UPDATE carriers SET carrierName = ? WHERE id = ?`,
    [carrier.carrierName, id],
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
      console.log(`updated carriers: `, {
        id: id,
        carrierName: carrier.carrierName,
      });
      result(null, { id: id, carrierName: carrier.carrierName });
    }
  );
}

// Delete a carrier by Id
async function removeCarrier(id, result) {
  await pool.query(`DELETE FROM carriers WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted carrier with id: ${id}`);
    result(null, res);
  });
}

*/
