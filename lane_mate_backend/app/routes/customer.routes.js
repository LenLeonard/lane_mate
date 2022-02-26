const accessToken = require("../auth/accessToken");
const validateAccessToken = accessToken.validateAccessToken;
const customerController = require("../controllers/customer.controller");
const postCustomer = customerController.postCustomer;
const getAllCustomers = customerController.getAllCustomers;
const deleteCustomer = customerController.deleteCustomer;
const putCustomer = customerController.putCustomer;

module.exports = (app) => {
  // POST new customer
  app.post("/customers", validateAccessToken, postCustomer);

  // GET all customers by sales rep id

  app.get("/customers", validateAccessToken, getAllCustomers);

  // DELETE a customer by id
  app.delete("/customers/:id", validateAccessToken, deleteCustomer);

  // PUT a customer b id
  app.put("/customers/:id", validateAccessToken, putCustomer);
};
