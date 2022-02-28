const loginModel = require("../models/login.model");

const insertLogin = loginModel.insertLogin;

module.exports = { postLogin };

async function postLogin(req, res) {
  const { firstName, email, lastName, password } = req.body;
  const user = req.user;

  //create new user
  const newUser = await selectLogin({
    email,

    password,
  });
  //send response
  res.json(newUser);
}
