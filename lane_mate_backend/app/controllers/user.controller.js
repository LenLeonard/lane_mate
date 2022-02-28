const userModel = require("../models/user.model");

const insertUser = userModel.insertUser;
const selectAllUsers = userModel.selectAllUsers;
const deleteFromUsersById = userModel.deleteFromUsersById;
const updateUser = userModel.updateUser;

module.exports = { getAllUsers, postUser, deleteUser, putUser };

async function postUser(req, res) {
  const { firstName, email, lastName, password } = req.body;
  const user = req.user;

  //create new user
  const newUser = await insertUser({
    firstName,
    email,
    lastName,
    password,
  });
  //send response
  res.json(newUser);
}

//get all users
async function getAllUsers(req, res) {
  try {
    const allUsers = await selectAllUsers();

    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
}

//delete a user
async function deleteUser(req, res) {
  const { id } = req.params;
  const deletedUser = await deleteFromUsersById(id);
  res.json(deletedUser);
}

//update a user

async function putUser(req, res) {
  const { id } = req.params;
  const { firstName, email, lastName, password } = req.body;
  const updatedUser = await updateUser(id, {
    firstName,
    email,
    lastName,
    password,
  });
  res.json(updatedUser);
}
