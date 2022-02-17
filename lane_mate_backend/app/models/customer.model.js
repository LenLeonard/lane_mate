const pool = require("./db");

module.exports = {
  insertCustomer,
  selectAllCustomers,
  deleteFromCustomersById,
  updateCustomer,
};

async function insertCustomer({
  sales_rep_id,
  company_name,
  primary_contact,
  contact_email,
  contact_phone,
  city,
  state_province,
}) {
  try {
    const newCustomer = await pool.query(
      "INSERT INTO customers (sales_rep_id, company_name, primary_contact, contact_email, contact_phone, city, state_province) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        sales_rep_id,
        company_name,
        primary_contact,
        contact_email,
        contact_phone,
        city,
        state_province,
      ]
    );

    console.log(newCustomer.rows[0]);
  } catch (err) {
    console.error("customer.model " + err.message);
  }
}

//select all customers from the database by sales_rep_id

async function selectAllCustomers(sales_rep_id) {
  try {
    console.log(sales_rep_id);
    const allCustomers = await pool.query(
      "SELECT * FROM customers WHERE sales_rep_id = $1",
      [sales_rep_id]
    );
    console.log(allCustomers.rows);
    return allCustomers.rows;
  } catch (err) {
    console.error(err.message);
  }
}

//put/update a customer in the database

async function updateCustomer(
  id,
  {
    sales_rep_id,
    company_name,
    primary_contact,
    contact_email,
    contact_phone,
    city,
    state_province,
  }
) {
  try {
    const newCustomer = await pool.query(
      "UPDATE customers SET sales_rep_id = $1, company_name = $2, primary_contact = $3, contact_email = $4, contact_phone = $5, city = $6, state_province = $7 WHERE id = $8 RETURNING *",
      [
        sales_rep_id,
        company_name,
        primary_contact,
        contact_email,
        contact_phone,
        city,
        state_province,
        id,
      ]
    );

    return newCustomer.rows[0];
    console.log(newCustomer.rows[0]);
  } catch (err) {
    console.error("putCustomer error: " + err.message);
  }
}

//delete a customer from the database

async function deleteFromCustomersById(id) {
  try {
    const deletedCustomer = await pool.query(
      "DELETE FROM customers WHERE id = $1",
      [id]
    );
    return deletedCustomer.rows;
  } catch (err) {
    console.error("deleteCustomer error: " + err.message);
  }
}

/*
// Find a single customer by Name
async function findCustomerByName(customerName) {
  try {
    const customer = await pool.query(
      `SELECT * FROM customers WHERE customerName = '${customerName}'`
    );
    res.json(newCustomer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all customers for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM customers WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`customers: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_customers_found` }, null);
    }
  );
}

// Update Customer by Id
async function updateCustomerById(id, customer, result) {
  await pool.query(
    `UPDATE customers SET customerName = ? WHERE id = ?`,
    [customer.customerName, id],
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: `not_found` }, null);
        return;
      }
      console.log(`updated customers: `, {
        id: id,
        customerName: customer.customerName,
      });
      result(null, { id: id, customerName: customer.customerName });
    }
  );
}

// Delete a customer by Id
async function removeCustomer(id, result) {
  await pool.query(`DELETE FROM customers WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted customer with id: ${id}`);
    result(null, res);
  });
}

*/
