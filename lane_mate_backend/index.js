const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { application } = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pg = require("pg");
const offerAPI = require("./offersAPI");

//middleware
app.use(cors());
app.use(express.json());

//offerAPI(app, pool);

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
    console.log(req.user);

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
    const accessToken = generateAccessToken({ email: user.email });
    res.json({ accessToken: accessToken });
  });
});

//signup logic
app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password ) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.firstName, user.lastName, user.email, user.password]
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
  console.log(req.body);

  try {
    //if user is in the database
    const userTable = await pool.query(
      //query database for user with email
      "SELECT * FROM users WHERE email = $1",
      [req.body.email]
    );
    console.log(userTable.rows);

    if (userTable.rows == null) {
      return res.status(400).send("Cannot find user");
    }
    //parsing user row into an object
    const user = {
      email: userTable.rows[0].email,
      password: userTable.rows[0].password,
      firstName: userTable.rows[0].first_name,
      lastName: userTable.rows[0].last_name,
      id: userTable.rows[0].id,
    };

    //invoke bcrypt to compare password
    if (await bcrypt.compare(req.body.password, user.password)) {
      //if password is correct, generate an access token and refresh token using the user email
      const userEmail = { email: user.email };
      const accessToken = generateAccessToken(userEmail);
      const refreshToken = generateRefreshToken(userEmail);

      //For now, store refresh tokens in an array
      refreshTokens.push(refreshToken);

      //return access token and refresh token to client
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        userName: user.firstName + " " + user.lastName,
        userEmail: user.email,
        userId: user.id,
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
    expiresIn: "15s",
  });
}

//ROUTES//

//Add a carrier t

app.post("/carriers", async (req, res) => {
  try {
    const { carrier_name, phone, contact_ext, contact_email, contact_name } =
      req.body;
    console.log(req.body);
    const newCarrier = await pool.query(
      "INSERT INTO carriers (carrier_name, phone, contact_ext, contact_email, contact_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [carrier_name, phone, contact_ext, contact_email, contact_name]
    );
    res.json(newCarrier);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all carriers

app.get("/carriers", async (req, res) => {
  try {
    const allCarriers = await pool.query("SELECT * FROM carriers "); //returns an array of objects
    res.json(allCarriers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get a carrier by id//

app.get("/carriers/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    console.log(req.params);
    const carrier = await pool.query("SELECT * FROM carriers WHERE id = $1", [
      id,
    ]); //query the database for the id
    res.json(carrier.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

//Update a carrier by id//

app.put("/carriers/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    const { carrier_name, phone, contact_ext, contact_email, contact_name } =
      req.body; //body is the data that is being sent to the database
    const updateCarrier = await pool.query(
      //query the database for the id
      "UPDATE carriers SET name = $1, phone = $2, contact_ext = $3, contact_email = $4, contact_name = $5 WHERE id = $6",
      [carrier_name, phone, contact_ext, contact_email, contact_name]
    );
    res.json(updateCarrier.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a carrier

app.delete("/carriers/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    const deleteCarrier = await pool.query(
      //query the database for the id
      "DELETE FROM carriers WHERE id = $1", //$1 is the placeholder for the value in the query
      [id] //the value in the query is the value in the array
    );
    res.json(deleteCarrier.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

/////////////////////

//Customer endpoints

/////////////////////

app.post("/customers", async (req, res) => {
  try {
    const {
      sales_rep_id,
      company_name,
      primary_contact,
      contact_email,
      contact_phone,
      city,
      state_province,
    } = req.body;
    console.log(req.body);
    const newCustomer = await pool.query(
      "INSERT INTO customers (sales_rep_id, company_name, primary_contact, contact_email, contact_phone, city, state_province) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        sales_rep_id,
        company_name,
        primary_contact,
        contact_email,
        contact_phone,
        city,
        state_province,
      ]
    );
    res.json(newCustomer);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all customers

app.get("/customers", async (req, res) => {
  try {
    //Return all customers that match user id

    const allCustomers = await pool.query("SELECT * FROM customers "); //returns an array of objects
    res.json(allCustomers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Access a customer by userId

app.post("/customers/:sales_rep_id", async (req, res) => {
  try {
    const { sales_rep_id } = req.params; //id is the parameter
    console.log(req.params);
    const customer = await pool.query(
      "SELECT * FROM customers WHERE sales_rep_id = $1",
      [sales_rep_id]
    ); //query the database for the id
    res.json(customer.rows); //send the results to the front end
    console.log(customer.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get a customer by id//

app.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    console.log(req.params);
    const customer = await pool.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]); //query the database for the id
    console.log(customer.rows);
    res.json(customer.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

//Update a customer

app.put("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    const {
      sales_rep_id,
      company_name,
      primary_contact,
      contact_email,
      contact_phone,
      city,
      state_province,
    } = req.body; //body is the data that is being sent to the database
    const updateCustomer = await pool.query(
      //query the database for the id
      "UPDATE customers SET sales_rep_id = $1, company_name = $2, primary_contact = $3, contact_email = $4, contact_phone = $5, city = $6, state_province = $7 WHERE id = $8",
      [
        sales_rep_id,
        company_name,
        primary_contact,
        contact_email,
        contact_phone,
        city,
        state_province,
      ]
    );
    res.json(updateCustomer.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a customer

app.delete("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    const deleteCustomer = await pool.query(
      //query the database for the id
      "DELETE FROM customers WHERE id = $1", //$1 is the placeholder for the value in the query
      [id] //the value in the query is the value in the array
    );
    res.json(deleteCustomer.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

//CITY ENDPOINTS

app.get("/cities", async (req, res) => {
  try {
    //Return all cities
    const allCities = await pool.query("SELECT * FROM cities "); //returns an array of objects
    res.json(allCities.rows);
  } catch (err) {
    console.error(err.message);
  }
});

////lane_stop ENDPOINTS

app.post("/lane_stops", async (req, res) => {
  try {
    const { city_id, is_origin, quote_request_id } = req.body;
    console.log(req.body);

    const lane_stop = await pool.query(
      "INSERT INTO lane_stops (city_id, is_origin, quote_request_id) VALUES ($1, $2, $3) RETURNING *",
      [city_id, is_origin, quote_request_id]
    );

    console.log(lane_stop);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all lane_stops

app.get("/lane_stops", async (req, res) => {
  try {
    //Return all lane_stops that match user id

    const allLane_stops = await pool.query("SELECT * FROM lane_stops "); //returns an array of objects
    res.json(allLane_stops.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Access a lane_stop by quote_request_id

app.post("/lane_stops/:quote_request_id", async (req, res) => {
  try {
    const { quote_request_id } = req.params; //id is the parameter
    console.log(req.params);
    const lane_stop = await pool.query(
      "SELECT * FROM lane_stops WHERE quote_request_id = $1",
      [quote_request_id]
    ); //query the database for the id
    res.json(lane_stop.rows); //send the results to the front end
    console.log(lane_stop.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a lane_stop by id

app.delete("/lane_stops/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    const deleteLane_stop = await pool.query(
      //query the database for the id
      "DELETE FROM lane_stops WHERE id = $1", //$1 is the placeholder for the value in the query
      [id] //the value in the query is the value in the array
    );
    res.json(deleteLane_stop.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => console.log(" lane_mate Server started"));
