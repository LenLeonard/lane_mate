const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const offersAPI = require("./app/routes/offer.routes");
const citiesAPI = require("./app/routes/city.routes");
const lane_stopsAPI = require("./app/routes/laneStop.routes");
const customersAPI = require("./app/routes/customer.routes");
const carriersAPI = require("./app/routes/carrier.routes");
const quoteRequestsAPI = require("./app/routes/quoteRequest.routes");
const handling_unitsAPI = require("./app/routes/handlingUnit.routes");
const accessTokenAPI = require("./app/routes/token.routes");
const refreshTokenAPI = require("./app/routes/token.routes");
const userAPI = require("./app/routes/user.routes");
const loginAPI = require("./app/routes/login.routes");

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
accessTokenAPI(app);
refreshTokenAPI(app);
loginAPI(app);

userAPI(app);

//ROUTES//

app.listen(5000, () => console.log(" lane_mate Server started"));
