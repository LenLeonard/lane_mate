const userModel = require("../models/user.model");

const insertUser = userModel.insertUser;
const selectAllUsers = userModel.selectAllUsers;
const deleteFromUsersById = userModel.deleteFromU;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

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
  const camelUser = keysToCamel(newUser);
  res.json(camelUser);
}

//get all users
async function getAllUsers(req, res) {
  try {
    const allUsers = await selectAllUsers();
    const allUsersCamelCase = allUsers.map((user) => {
      return keysToCamel(user);
    });

    res.json(allUsersCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a user
async function deleteUser(req, res) {
  const { id } = req.params;
  const deletedUser = await deleteFromUsersById(id);
  const deletedUserCamelCase = keysToCamel(deletedUser);
  res.json(deletedUserCamelCase);
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
  const updatedUserCamelCase = keysToCamel(updatedUser);
  res.json(updatedUserCamelCase);
}
