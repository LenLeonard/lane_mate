const tokenModel = require("../models/token.model");

const insertToken = tokenModel.insertToken;
const selectAllTokens = tokenModel.selectAllTokens;
const deleteFromTokensById = tokenModel.deleteFromTokensById;
const updateToken = tokenModel.updateToken;

module.exports = { getAllTokens, postToken, deleteToken, putToken };

async function postToken(req, res) {
  const { token_name, phone, contact_ext, contact_email, contact_name } =
    req.body;
  const user = req.user;

  //create new token
  const newToken = await insertToken({
    token_name,
    phone,
    contact_ext,
    contact_email,
    contact_name,
    user_id: user.id,
  });
  //send response
  res.json(newToken);
}

//get all tokens
async function getAllTokens(req, res) {
  try {
    const allTokens = await selectAllTokens();

    res.json(allTokens);
  } catch (error) {
    console.log(error);
  }
}

//delete a token
async function deleteToken(req, res) {
  const { id } = req.params;
  const deletedToken = await deleteFromTokensById(id);
  res.json(deletedToken);
}

//update a token

async function putToken(req, res) {
  const { id } = req.params;
  const {
    token_name,
    phone,
    contact_ext,
    contact_email,
    contact_name,
    user_id,
  } = req.body;
  const updatedToken = await updateToken(id, {
    token_name,
    phone,
    contact_ext,
    contact_email,
    contact_name,
    user_id,
  });
  res.json(updatedToken);
}
