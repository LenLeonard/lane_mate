const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "dbtestpassword",
  host: "localhost",
  port: 5432,
  database: "lane_mate_db",
});

module.exports = pool;
