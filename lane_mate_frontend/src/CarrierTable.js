import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

// This function takes in the data from the form and creates an object corresponding to the carrier and rate information entered

function createData(
  carrierName,
  phoneNumber,
  dispatchEmail,
  contactName,
  rate,
  notes
) {
  return { carrierName, phoneNumber, dispatchEmail, contactName, rate, notes };
}

//rows is an array of objects that correspond to the data in the table
const rows = [];

// This is the component that renders the table
export default function CarrierTable() {
  const { register, handleSubmit, errors, control } = useForm();

  const [carrierName, setCarrierName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dispatchEmail, setDispatchEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [rate, setRate] = useState("");
  const [notes, setNotes] = useState("");

  // This function is called when the user submits the form. newEntry is an object created from the state of each of the form fields

  const createNewEntryOnSubmit = () => {
    const newEntry = createData(
      carrierName,
      phoneNumber,
      dispatchEmail,
      contactName,
      rate,
      notes
    );
    console.log(newEntry);
    rows.push(newEntry);
    setCarrierName("");
    setPhoneNumber("");
    setDispatchEmail("");
    setContactName("");
    setRate("");
    setNotes("");
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
        <form onSubmit={handleSubmit(createNewEntryOnSubmit)}>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="on"
          >
            <Controller
              name="carrierName"
              control={control}
              defaultValue=""
              onChange={(e) => setCarrierName(e.target.value)}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  label="Carrier Name"
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                  required
                />
              )}
            />

            <TextField
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              label="Phone Number"
              variant="outlined"
              margin="normal"
              color="secondary"
              required
            />
            <TextField
              value={dispatchEmail}
              onChange={(e) => setDispatchEmail(e.target.value)}
              label="Dispatch Email"
              variant="outlined"
              margin="normal"
              color="secondary"
              required
            />
            <TextField
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              label="Contact Name"
              variant="outlined"
              margin="normal"
              color="secondary"
            />
            <TextField
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              label="Rate"
              variant="outlined"
              margin="normal"
              color="secondary"
              required
            />
            <TextField
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              label="Notes"
              variant="outlined"
              margin="normal"
              color="secondary"
              multilinerows="4"
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Add Carrier
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}
