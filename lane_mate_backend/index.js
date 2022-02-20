const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { application } = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pg = require("pg");
const offersAPI = require("./views/offersAPI");
const citiesAPI = require("./views/citiesAPI");
const lane_stopsAPI = require("./views/lane_stopsAPI");
const customersAPI = require("./app/routes/customer.routes");
const carriersAPI = require("./app/routes/carrier.routes");
const quoteRequestsAPI = require("./views/quoteRequestsAPI");
const handling_unitsAPI = require("./app/routes/handlingUnit.routes");

//middleware
app.use(cors());
app.use(express.json());

offersAPI(app);
citiesAPI(app);
lane_stopsAPI(app);
customersAPI(app);
carriersAPI(app);
quoteRequestsAPI(app);
handling_unitsAPI(app);

//Authentice Token Function

function authenticateToken(req, res, next) {
  //get token from header
  const authHeader = req.headers["authorization"]; // Bearer token
  const token = authHeader && authHeader.split(" ")[1]; // token
  if (token == null) {
    // if token is null
    return res.sendStatus(401); // send status 401
  }
  //check if token is valid
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // send status 403
    req.user = user; // user is returned from jwt.verify, from the access token payload

    next(); // call next middleware
  });
}

//Auth Server Stuff

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email, id: user.id });
    res.json({ accessToken: accessToken });
  });
});

//signup logic
app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password ) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.body.firstName, req.body.lastName, req.body.email, hashedPassword]
    );
    res.json(newUser);

    res.status(201).send();
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

//login logic, returns access token and refresh token to client
app.post("/users/login", async (req, res) => {
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
});
function generateRefreshToken(userEmail) {
  return jwt.sign(userEmail, process.env.REFRESH_TOKEN_SECRET);
}

function generateAccessToken(userEmail) {
  return jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

//ROUTES//

app.listen(5000, () => console.log(" lane_mate Server started"));
