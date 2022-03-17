const loginModel = require("../models/login.model");
const bcrypt = require("bcrypt");
const accessToken = require("../auth/accessToken");
const generateAccessToken = accessToken.generateAccessToken;
const refreshToken = require("../auth/refreshToken");
const generateRefreshToken = refreshToken.generateRefreshToken;

const selectLogin = loginModel.selectLogin;

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const postLogin = (refreshTokens) => async (req, res) => {
  try {
    const { email, password } = req.body;

    //create new user
    const newUser = await selectLogin({
      email,
      password,
    });
    if (newUser.length === null) {
      return res.status(400).send("Cannot find user");
    }

    //invoke bcrypt to compare password
    verifyPassword(password, newUser[0].password).then((result) => {
      if (result) {
        //if password is correct, generate an access token and refresh token using the user email

        const user = { email: newUser[0].email, id: newUser[0].id };
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        //For now, store refresh tokens in an array
        refreshTokens.push(refreshToken);

        //return access token and refresh token to client
        res.json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          userName: newUser[0].first_name + " " + newUser[0].last_name,
          userEmail: newUser[0].email,
          userId: newUser[0].id,
        });

        console.log(refreshTokens);
      } else {
        res.status(400).send("Invalid password");
      }
    });
  } catch (err) {
    console.error("postLogin error: " + err.message);
  }
};
module.exports = { postLogin };
