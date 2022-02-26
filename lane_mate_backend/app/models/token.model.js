const pool = require("./db");

module.exports = {
  insertToken: insertRefreshToken,
};

async function insertRefreshToken({ quoteRequestId, carrierId, rate, notes }) {
  try {
    const newRefreshToken = await pool.query(
      "INSERT INTO refresh_tokens (qute_request_id, carrier_id, rate, notes) VALUES ($1, $2, $3, $4) RETURNING *",
      [quoteRequestId, carrierId, rate, notes]
    );
  } catch (err) {
    console.error("refreshToken.model " + err.message);
  }
}

//select all refreshTokens from the database

async function selectAllRefreshTokens() {
  try {
    const allRefreshTokens = await pool.query("SELECT * FROM refreshTokens "); //returns an array of objects
    return allRefreshTokens.rows;
  } catch (err) {
    console.error("selectAllRefreshTokens error: " + err.message);
  }
}

//put/update a refreshToken in the database

async function updateRefreshToken(
  id,
  { quoteRequestId, carrierId, rate, notes }
) {
  try {
    const newRefreshToken = await pool.query(
      "UPDATE refreshTokens SET qute_request_id = $1, carrier_id = $2, rate = $3, notes = $4 WHERE id = $5 RETURNING *",
      [quoteRequestId, carrierId, rate, notes]
    );
    return newRefreshToken.rows[0];
  } catch (err) {
    console.error("putRefreshToken error: " + err.message);
  }
}

//delete a refreshToken from the database

async function deleteFromRefreshTokensById(id) {
  try {
    const deletedRefreshToken = await pool.query(
      "DELETE FROM refreshTokens WHERE id = $1",
      [id]
    );
    return deletedRefreshToken.rows;
  } catch (err) {
    console.error("deleteRefreshToken error: " + err.message);
  }
}

/*
// Find a single refreshToken by Name
async function findRefreshTokenByName(refreshTokenName) {
  try {
    const refreshToken = await pool.query(
      `SELECT * FROM refreshTokens WHERE refreshTokenName = '${refreshTokenName}'`
    );
    res.json(newRefreshToken.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all refreshTokens for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM refreshTokens WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`refreshTokens: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_refreshTokens_found` }, null);
    }
  );
}

// Update RefreshToken by Id
async function updateRefreshTokenById(id, refreshToken, result) {
  await pool.query(
    `UPDATE refreshTokens SET refreshTokenName = ? WHERE id = ?`,
    [refreshToken.refreshTokenName, id],
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
      console.log(`updated refreshTokens: `, {
        id: id,
        refreshTokenName: refreshToken.refreshTokenName,
      });
      result(null, { id: id, refreshTokenName: refreshToken.refreshTokenName });
    }
  );
}

// Delete a refreshToken by Id
async function removeRefreshToken(id, result) {
  await pool.query(`DELETE FROM refreshTokens WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted refreshToken with id: ${id}`);
    result(null, res);
  });
}

*/
