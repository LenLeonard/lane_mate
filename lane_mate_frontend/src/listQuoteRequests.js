import { Button, Table, TableContainer } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import EditQuoteRequest from "./editQuoteRequest";

export default function ListQuoteRequests() {
  const [quoteRequests, setQuoteRequests] = useState([]);

  const getQuoteRequests = async () => {
    //getQuoteRequests is a function that returns a promise
    try {
      //try to get the quote requests from the database
      const response = await fetch("http://localhost:3000/quoteRequests");
      const jsonData = await response.json(); //convert the response to json

      setQuoteRequests(jsonData); //set the quote requests to the json data
    } catch (error) {
      console.log(error);
    }
  };

  const rows = [
    {
      id: 0,
      sales_rep: "Len",
      customer: "WC Smith",
      lane: "Toronto to Van",
      load: "20 tons",
    },
  ];

  useEffect(() => {
    getQuoteRequests();
  }, []);

  function populateTable() {
    getQuoteRequests();
  }

  const deleteQuoteRequest = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:3000/quoteRequests/${id}`,
        {
          method: "DELETE",
        }
      );
      setQuoteRequests(
        quoteRequests.filter((quoteRequest) => quoteRequest.id !== id)
      ); //removes the identified quote request from the table without reloading the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>List Quote Requests</h1>
      <Button onClick={populateTable}>Populate Table</Button>
      <TableContainer component={Paper} elevation={6}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Key</TableCell>
              <TableCell align="left">Sales Rep</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left">Lane</TableCell>
              <TableCell align="left">Load</TableCell>
              <TableCell align="left">Edit </TableCell>
              <TableCell align="left">Delete </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quoteRequests.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.sales_rep}</TableCell>
                <TableCell align="left">{row.customer}</TableCell>
                <TableCell align="left">{row.lane}</TableCell>
                <TableCell align="left">{row.load}</TableCell>
                <TableCell align="left">
                  <EditQuoteRequest quoteRequestRow={row} />
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => deleteQuoteRequest(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
