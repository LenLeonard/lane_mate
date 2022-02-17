import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import AddCustomerDialog from "./AddCustomerDialog";
import { useEffect } from "react";
import CustomerTableComponent from "./CustomerTableComponent";

export default function CustomerDialog({
  handleCustomerDialogClose,
  customerDialogOpen,
}) {
  const [customers, setCustomers] = useState([]);

  const [rows, setRows] = useState(customers);

  const [openAddNewCustomer, setOpenAddNewCustomer] = useState(false);

  const handleNewcustomerClickOpen = () => {
    setOpenAddNewCustomer(true);
  };

  const handleNewCustomerClose = () => {
    setOpenAddNewCustomer(false);
  };

  const getCustomers = async () => {
    //getCustomers is a function that returns a promise

    try {
      //try to get the customers from the database
      const response = await fetch("http://localhost:5000/customers/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
      });

      const jsonData = await response.json(); //convert the response to json
      setRows(jsonData);
      setCustomers(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  async function addNewCustomer(event) {
    console.log(event);
    //post a new customer to the database
    const sales_rep_id = localStorage.getItem("userId");
    const newCustomer = {
      sales_rep_id,
      ...event,
    };
    try {
      const response = await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });
      if (response.status === 200) {
        getCustomers();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const user = localStorage.getItem("userName");

  return (
    <div>
      <Dialog
        open={customerDialogOpen}
        onClose={handleCustomerDialogClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{user}'s Customers</DialogTitle>
        <DialogContent dividers style={{ height: "200px" }}>
          <div style={{ display: "flex" }}>
            <CustomerTableComponent rows={rows} setRows={setRows} />
          </div>
        </DialogContent>
        <AddCustomerDialog
          handleClickOpen={openAddNewCustomer}
          handleClose={handleNewCustomerClose}
          addNewCustomer={addNewCustomer}
          getCustomers={getCustomers}
        />

        <DialogActions>
          <Button onClick={handleNewcustomerClickOpen}>Add Customer</Button>

          <Button onClick={handleCustomerDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
