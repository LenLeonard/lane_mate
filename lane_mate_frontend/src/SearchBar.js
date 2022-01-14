import * as React from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";

//compnent takes in the array of dashBoard objects and the function to update the dashboard
//as well as an array of formatted quoteRequest objects to display

export default function SearchBar({
  updateDashboard,
  dashBoardObjectArray,
  quoteRequestArray,
}) {
  return (
    <Autocomplete
      freeSolo
      id="searchBar"
      disableClearable
      options={quoteRequestArray.map((option) => option.display)}
      onChange={(event, value) => {
        populateDashboard(value, dashBoardObjectArray, updateDashboard);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
//populateDashboard takes in the value returned from the search bar and the array of dashBoard objects, and the updateDashboard callback
//function. It first uses the quote request number in the formatted quoteRequest, then iterates through the dashBoardObjectArray.
//if the quote number of the dashBoardObject matches the value of the formatted quoteRequest selected in the search bar,
//it calls the updateDashboard callback function with that dashBoardObject as an argument, which is used to update the Dashboard component

function populateDashboard(value, dashBoardObjectArray, updateDashboard) {
  let quoteRequestNumber = value.charAt(14);

  dashBoardObjectArray.forEach((dashBoardObject) => {
    if (
      quoteRequestNumber === dashBoardObject.quoteObject.quoteNumber.toString()
    ) {
      updateDashboard(dashBoardObject);
    }
  });
}
