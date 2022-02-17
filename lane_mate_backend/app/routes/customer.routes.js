const checkAuth = require("../auth/checkAuth");
const customerController = require("../controllers/customer.controller");
const postCustomer = customerController.postCustomer;
const getAllCustomers = customerController.getAllCustomers;
const deleteCustomer = customerController.deleteCustomer;
const putCustomer = customerController.putCustomer;

module.exports = (app) => {
  // POST new customer
  app.post("/customers", checkAuth, postCustomer);

  // GET all customers by sales rep id

  app.get("/customers", checkAuth, getAllCustomers);

  // DELETE a customer by id
  app.delete("/customers/:id", checkAuth, deleteCustomer);

  // PUT a customer b id
  app.put("/customers/:id", checkAuth, putCustomer);
};
