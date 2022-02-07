import { Button, Table, TableContainer } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import EditCarrier from "./EditCarrier";

export default function ListCarriers() {
  const [carriers, setCarriers] = useState([]);

  const getCarriers = async () => {
    //getCarriers is a function that returns a promise
    try {
      //try to get the quote requests from the database
      const response = await fetch("http://localhost:3000/carriers");
      const jsonData = await response.json(); //convert the response to json
      console.log(jsonData);

      setCarriers(jsonData); //set the quote requests to the json data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarriers();
  }, []);

  function populateTable() {
    getCarriers();
  }

  const deleteCarrier = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:3000/carriers/${id}`, {
        method: "DELETE",
      });
      setCarriers(carriers.filter((carrier) => carrier.id !== id)); //removes the identified quote request from the table without reloading the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={populateTable}>Populate Table</Button>
      <TableContainer component={Paper} elevation={6}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Contact Name</TableCell>
              <TableCell align="left">MC Number</TableCell>
              <TableCell align="left">DOT Number</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">State/Province</TableCell>
              <TableCell align="left">Zip/Postal Code</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">Is Blacklisted?</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carriers.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.contact_name}</TableCell>
                <TableCell align="left">{row.mc_number}</TableCell>
                <TableCell align="left">{row.dot_number}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="left">{row.state_province}</TableCell>
                <TableCell align="left">{row.zip_postal_code}</TableCell>
                <TableCell align="left">{row.country}</TableCell>
                <TableCell align="left">
                  {row.is_blacklisted ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  <EditCarrier carrierRow={row} getCarriers={getCarriers} />
                </TableCell>

                <TableCell align="left">
                  <Button onClick={() => deleteCarrier(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
