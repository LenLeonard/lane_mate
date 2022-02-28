const accessToken = require("../auth/accessToken");
const userController = require("../controllers/user.controller");
const postUser = userController.postUser;
const getAllUsers = userController.getAllUsers;
const deleteUser = userController.deleteUser;
const putUser = userController.putUser;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new user
  app.post("/users", validateAccessToken, postUser);

  // GET all users

  app.get("/users", validateAccessToken, getAllUsers);

  // DELETE a user by id
  app.delete("/users/:id", validateAccessToken, deleteUser);

  // PUT a user b id
  app.put("/users/:id", validateAccessToken, putUser);
};
