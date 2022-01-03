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
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

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

const rows = [];

export default function CarrierTable() {
  const { handleSubmit, errors, control } = useForm();

  // Temp. Remove this when you handle the errors :) 
  useEffect(() => {
    if (errors) console.error(errors);
  }, [errors])

  const createNewEntryOnSubmit = (e) => {
    console.log(e);
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit(createNewEntryOnSubmit)}
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Controller
          name="carrierName"
          control={control}
          defaultValue=""
          rules={{ required: true, minLength: 2, maxLength: 5 }}
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
          label="Phone Number"
          variant="outlined"
          margin="normal"
          color="secondary"
          required
        />
        <TextField
          label="Dispatch Email"
          variant="outlined"
          margin="normal"
          color="secondary"
          required
        />
        <TextField
          label="Contact Name"
          variant="outlined"
          margin="normal"
          color="secondary"
        />
        <TextField
          label="Rate"
          variant="outlined"
          margin="normal"
          color="secondary"
          required
        />
        <TextField
          label="Notes"
          variant="outlined"
          margin="normal"
          color="secondary"
          multilinerows="4"
        />

        <Button variant="contained" color="primary" type="submit" size="large">
          Add Carrier
        </Button>
      </Box>
      <p></p>
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
    </div>
  );
}
