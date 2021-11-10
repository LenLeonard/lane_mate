import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const rows = [
  createData(
    "ABC Trucking",
    "555 - 123 - 4567",
    "dispatch@ABCTrucking.com",
    "Larry",
    4000,
    "Can Pickup tomorrow"
  ),
  createData(
    "ABC Trucking",
    "555 - 123 - 4567",
    "dispatch@ABCTrucking.com",
    "Larry",
    4000,
    "Can Pickup tomorrow"
  ),
  createData(
    "ABC Trucking",
    "555 - 123 - 4567",
    "dispatch@ABCTrucking.com",
    "Larry",
    4000,
    "Can Pickup tomorrow"
  ),
  createData(
    "ABC Trucking",
    "555 - 123 - 4567",
    "dispatch@ABCTrucking.com",
    "Larry",
    4000,
    "Can Pickup tomorrow"
  ),
  createData(
    "ABC Trucking",
    "555 - 123 - 4567",
    "dispatch@ABCTrucking.com",
    "Larry",
    4000,
    "Can Pickup tomorrow"
  ),
];

export default function CarrierTable() {
  return (
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
  );
}
