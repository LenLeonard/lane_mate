const customerModel = require("../models/customer.model");

const insertCustomer = customerModel.insertCustomer;
const selectAllCustomers = customerModel.selectAllCustomers;
const deleteFromCustomersById = customerModel.deleteFromCustomersById;
const updateCustomer = customerModel.updateCustomer;

const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;
module.exports = { getAllCustomers, postCustomer, deleteCustomer, putCustomer };

async function postCustomer(req, res) {
  const {
    salesRepId,
    companyName,
    primaryContact,
    contactEmail,
    contactPhone,
    city,
    stateProvince,
  } = req.body;
  const user = req.user;

  //create new customer
  const newCustomer = await insertCustomer({
    salesRepId,
    companyName,
    primaryContact,
    contactEmail,
    contactPhone,
    city,
    stateProvince,
  });
  //send response
  const newCustomerCamelCase = keysToCamel(newCustomer);
  res.json(newCustomerCamelCase);
}

//get all customers by sales rep id
async function getAllCustomers(req, res) {
  //parse sales rep id from jwt

  const salesRepId = req.user.id;
  const allCustomers = await selectAllCustomers(salesRepId);

  //covert each customer object to camel case
  const allCustomersCamelCase = allCustomers.map((customer) => {
    return keysToCamel(customer);
  });

  res.json(allCustomersCamelCase);
}

//delete a customer
async function deleteCustomer(req, res) {
  const { id } = req.params;
  const deletedCustomer = await deleteFromCustomersById(id);

  const deletedCustomerCamelCase = keysToCamel(deletedCustomer);
  res.json(deletedCustomerCamelCase);
}

//update a customer

async function putCustomer(req, res) {
  const { id } = req.params;
  const {
    salesRepId,
    companyName,
    primaryContact,
    contactEmail,
    contactPhone,
    city,
    stateProvince,
  } = req.body;
  const updatedCustomer = await updateCustomer(id, {
    salesRepId,
    companyName,
    primaryContact,
    contactEmail,
    contactPhone,
    city,
    stateProvince,
  });
  const updatedCustomerCamelCase = keysToCamel(updatedCustomer);
  res.json(updatedCustomerCamelCase);
}
