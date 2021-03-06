import * as React from "react";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

export default function CustomerSearchBar({ returnCustomer, customersProps }) {
  const customers = customersProps;
  function returnCustomerId(customerName) {
    let customerId = "";
    let customerCompanyName = "";
    customers.forEach((customer) => {
      if (customer.companyName === customerName) {
        customerId = customer.id;
        customerCompanyName = customer.companyName;
      }

      returnCustomer({ customerId, customerCompanyName });
    });
  }

  return (
    <Autocomplete
      sx={{ width: "50%", margin: "auto" }}
      freeSolo
      id="searchBar"
      disableClearable
      options={customers.map((option) => option.companyName)}
      onChange={(event, value) => {
        returnCustomerId(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by Customer Name"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
