const pool = require("./db");

module.exports = {
  insertOffer,
  selectAllOffers,
  deleteFromOffersById,
  updateOffer,
};

async function insertOffer({ quoteRequestId, carrierId, rate, notes }) {
  try {
    const newOffer = await pool.query(
      "INSERT INTO offers (qute_request_id, carrier_id, rate, notes) VALUES ($1, $2, $3, $4) RETURNING *",
      [quoteRequestId, carrierId, rate, notes]
    );
  } catch (err) {
    console.error("offer.model " + err.message);
  }
}

//select all offers from the database

async function selectAllOffers() {
  try {
    const allOffers = await pool.query("SELECT * FROM offers "); //returns an array of objects
    return allOffers.rows;
  } catch (err) {
    console.error("selectAllOffers error: " + err.message);
  }
}

//put/update a offer in the database

async function updateOffer(id, { quoteRequestId, carrierId, rate, notes }) {
  try {
    const newOffer = await pool.query(
      "UPDATE offers SET qute_request_id = $1, carrier_id = $2, rate = $3, notes = $4 WHERE id = $5 RETURNING *",
      [quoteRequestId, carrierId, rate, notes]
    );
    return newOffer.rows[0];
  } catch (err) {
    console.error("putOffer error: " + err.message);
  }
}

//delete a offer from the database

async function deleteFromOffersById(id) {
  try {
    const deletedOffer = await pool.query("DELETE FROM offers WHERE id = $1", [
      id,
    ]);
    return deletedOffer.rows;
  } catch (err) {
    console.error("deleteOffer error: " + err.message);
  }
}

/*
// Find a single offer by Name
async function findOfferByName(offerName) {
  try {
    const offer = await pool.query(
      `SELECT * FROM offers WHERE offerName = '${offerName}'`
    );
    res.json(newOffer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all offers for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM offers WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`offers: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_offers_found` }, null);
    }
  );
}

// Update Offer by Id
async function updateOfferById(id, offer, result) {
  await pool.query(
    `UPDATE offers SET offerName = ? WHERE id = ?`,
    [offer.offerName, id],
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
      console.log(`updated offers: `, {
        id: id,
        offerName: offer.offerName,
      });
      result(null, { id: id, offerName: offer.offerName });
    }
  );
}

// Delete a offer by Id
async function removeOffer(id, result) {
  await pool.query(`DELETE FROM offers WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted offer with id: ${id}`);
    result(null, res);
  });
}

*/
