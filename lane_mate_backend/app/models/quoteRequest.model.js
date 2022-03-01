const pool = require("./db");

module.exports = {
  insertQuoteRequest,
  selectAllQuoteRequests,
  deleteFromQuoteRequestsById,
  updateQuoteRequest,
};

async function insertQuoteRequest({ salesRepId, customerId }) {
  try {
    const newQuoteRequest = await pool.query(
      "INSERT INTO quote_requests (sales_rep_id, customer_id) VALUES ($1, $2) RETURNING *",
      [salesRepId, customerId]
    );
  } catch (err) {
    console.error("quoteRequest.model " + err.message);
  }
}

//select all quoteRequests from the database

async function selectAllQuoteRequests() {
  try {
    const allQuoteRequests = await pool.query("SELECT * FROM quoteRequests "); //returns an array of objects
    return allQuoteRequests.rows;
  } catch (err) {
    console.error("selectAllQuoteRequests error: " + err.message);
  }
}

//put/update a quoteRequest in the database

async function updateQuoteRequest(id, { salesRepId, customerId }) {
  try {
    const newQuoteRequest = await pool.query(
      "UPDATE quote_requests SET sales_rep_id = $1, customer_id = $2 WHERE id = $3 RETURNING *",
      [salesRepId, customerId]
    );
    return newQuoteRequest.rows[0];
  } catch (err) {
    console.error("putQuoteRequest error: " + err.message);
  }
}

//delete a quoteRequest from the database

async function deleteFromQuoteRequestsById(id) {
  try {
    const deletedQuoteRequest = await pool.query(
      "DELETE FROM quoteRequests WHERE id = $1",
      [id]
    );
    return deletedQuoteRequest.rows;
  } catch (err) {
    console.error("deleteQuoteRequest error: " + err.message);
  }
}

/*
// Find a single quoteRequest by Name
async function findQuoteRequestByName(quoteRequestName) {
  try {
    const quoteRequest = await pool.query(
      `SELECT * FROM quoteRequests WHERE quoteRequestName = '${quoteRequestName}'`
    );
    res.json(newQuoteRequest.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all quoteRequests for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM quoteRequests WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`quoteRequests: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_quoteRequests_found` }, null);
    }
  );
}

// Update QuoteRequest by Id
async function updateQuoteRequestById(id, quoteRequest, result) {
  await pool.query(
    `UPDATE quoteRequests SET quoteRequestName = ? WHERE id = ?`,
    [quoteRequest.quoteRequestName, id],
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
      console.log(`updated quoteRequests: `, {
        id: id,
        quoteRequestName: quoteRequest.quoteRequestName,
      });
      result(null, { id: id, quoteRequestName: quoteRequest.quoteRequestName });
    }
  );
}

// Delete a quoteRequest by Id
async function removeQuoteRequest(id, result) {
  await pool.query(`DELETE FROM quoteRequests WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted quoteRequest with id: ${id}`);
    result(null, res);
  });
}

*/
