const customerModel = require("../models/customer.model");

const insertCustomer = customerModel.insertCustomer;
const selectAllCustomers = customerModel.selectAllCustomers;
const deleteFromCustomersById = customerModel.deleteFromCustomersById;
const updateCustomer = customerModel.updateCustomer;

module.exports = { getAllCustomers, postCustomer, deleteCustomer, putCustomer };

async function postCustomer(req, res) {
  const {
    sales_rep_id,
    company_name,
    primary_contact,
    contact_email,
    contact_phone,
    city,
    state_province,
  } = req.body;
  const user = req.user;

  //create new customer
  const newCustomer = await insertCustomer({
    sales_rep_id,
    company_name,
    primary_contact,
    contact_email,
    contact_phone,
    city,
    state_province,
  });
  //send response
  res.json(newCustomer);
}

//get all customers by sales rep id
async function getAllCustomers(req, res) {
  //parse sales rep id from jwt

  const sales_rep_id = req.user.id;
  const allCustomers = await selectAllCustomers(sales_rep_id);

  res.json(allCustomers);
}

//delete a customer
async function deleteCustomer(req, res) {
  const { id } = req.params;
  const deletedCustomer = await deleteFromCustomersById(id);
  res.json(deletedCustomer);
}

//update a customer

async function putCustomer(req, res) {
  const { id } = req.params;
  const {
    sales_rep_id,
    company_name,
    primary_contact,
    contact_email,
    contact_phone,
    city,
    state_province,
  } = req.body;
  const updatedCustomer = await updateCustomer(id, {
    sales_rep_id,
    company_name,
    primary_contact,
    contact_email,
    contact_phone,
    city,
    state_province,
  });
  res.json(updatedCustomer);
}
