require("dotenv").config();

let databaseHost;
let databaseUser;
let databasePassword;
let databaseName;

if (process.env.NODE_ENV === "test") {
  databaseHost = process.env.DB_HOST_DEV;
  databaseUser = process.env.DB_USER_DEV;
  databasePassword = process.env.DB_PASSWORD_DEV;
  databaseName = process.env.DB_TEST;
} else if (process.env.NODE_ENV === "build") {
  databaseHost = process.env.DB_HOST_BUILD;
  databaseUser = process.env.DB_USER_BUILD;
  databasePassword = process.env.DB_PASSWORD_BUILD;
  databaseName = process.env.DB;
} else {
  databaseHost = process.env.DB_HOST_DEV;
  databaseUser = process.env.DB_USER_DEV;
  databasePassword = process.env.DB_PASSWORD_DEV;
  databaseName = process.env.DB;
}

module.exports = { databaseHost, databaseUser, databasePassword, databaseName };
