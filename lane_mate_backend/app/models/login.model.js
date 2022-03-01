const pool = require("./db");

module.exports = { selectLogin };

async function selectLogin({ email, password }) {
  console.log("selectLogin");
  console.log(email);
  console.log(password);
  try {
    //if user is in the database
    const userTable = await pool.query(
      //query database for user with email
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return userTable.rows;
  } catch (err) {
    console.error("selectLogin error: " + err.message);
  }
}
//if user is in the database
