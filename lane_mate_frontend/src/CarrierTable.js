import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useForm } from "react-hook-form";
import CarrierForm from "./CarrierForm";

// This function takes in the data from the form and creates an object corresponding to the carrier and rate information entered

//rows is an array of objects that correspond to the data in the table
const rows = [];

// This is the component that renders the table
export default function CarrierTable() {
  const { reset } = useForm();

  // This function is called when the user submits the form. newEntry is an object created from the state of each of the form fields

  const createNewEntryOnSubmit = (event) => {
    console.log(event);
    rows.push(event);
    reset();
  };

  return (
    <div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Carrier Name</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Dispatch Email</TableCell>
                <TableCell align="right">Contact Name</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.carrierName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.carrierName}
                  </TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.dispatchEmail}</TableCell>
                  <TableCell align="right">{row.contactName}</TableCell>
                  <TableCell align="right">{row.rate}</TableCell>
                  <TableCell align="right">{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <CarrierForm createNewEntryOnSubmit={createNewEntryOnSubmit} />
      </div>
    </div>
  );
}
