import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import CustomerSearchBar from "./CustomerSearchBar";
import AddQuoteCustomerDialog from "./AddQuoteCustomerDialog";
import { useState } from "react";
import { useEffect } from "react";

export default function CustomerQuoteDialog({
  customerQuoteDialogOpen,
  handleCustomerQuoteDialogClose,
  onSubmit,
  next,
  getFormData,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [openAddNewCustomer, setOpenAddNewCustomer] = useState(false);

  const handleNewcustomerClickOpen = () => {
    setOpenAddNewCustomer(true);
  };

  const handleNewCustomerClose = () => {
    setOpenAddNewCustomer(false);
  };

  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    //getCustomers is a function that returns a promise
    const sales_rep_id = localStorage.getItem("userId");
    try {
      //try to get the customers from the database
      const response = await fetch(
        `http://localhost:5000/customers/${sales_rep_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jsonData = await response.json(); //convert the response to json
      console.log(jsonData);
      setCustomers(jsonData);
      console.log(customers);
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
      getCustomers();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog
      open={customerQuoteDialogOpen}
      onClose={handleCustomerQuoteDialogClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Select A Customer</DialogTitle>
      <DialogContent>
        <form id="customerQuoteDialogForm" onSubmit={handleSubmit(getFormData)}>
          <br />
          <CustomerSearchBar
            returnCustomer={getFormData}
            customersProps={customers}
          />
        </form>
        <AddQuoteCustomerDialog
          handleClickOpen={openAddNewCustomer}
          handleClose={handleNewCustomerClose}
          addNewCustomer={addNewCustomer}
          getCustomers={getCustomers}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCustomerQuoteDialogClose}>Cancel</Button>
        <Button type="submit" form="customerQuoteDialogForm" onClick={next}>
          Next
        </Button>
        <Button onClick={handleNewcustomerClickOpen}>Add New Customer</Button>
      </DialogActions>
    </Dialog>
  );
}
