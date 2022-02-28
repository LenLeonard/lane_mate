const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessToken = require("../auth/accessToken");
const generateAccessToken = accessToken.generateAccessToken;
const generateRefreshToken = accessToken.generateRefreshToken;
let refreshTokens = [];

module.exports = { selectLogin };

async function selectLogin(req, res) {
  try {
    //if user is in the database
    const userTable = await pool.query(
      //query database for user with email
      "SELECT * FROM users WHERE email = $1",
      [req.body.email]
    );

    if (userTable.rows.length === null) {
      return res.status(400).send("Cannot find user");
    }

    //invoke bcrypt to compare password
    if (await bcrypt.compare(req.body.password, userTable.rows[0].password)) {
      //if password is correct, generate an access token and refresh token using the user email

      const user = { email: userTable.rows[0].email, id: userTable.rows[0].id };
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      //For now, store refresh tokens in an array
      refreshTokens.push(refreshToken);

      //return access token and refresh token to client
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        userName:
          userTable.rows[0].first_name + " " + userTable.rows[0].last_name,
        userEmail: userTable.rows[0].email,
        userId: userTable.rows[0].id,
      });
      refreshTokens.push(refreshToken);
    } else {
      res.status(400).send("Invalid password");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
