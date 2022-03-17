import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";

import { useEffect } from "react";
import QuoteRequestTableDialogComponent from "./QuoteRequestTableDialogComponent";

export default function QuoteRequestTableDialog({
  handleQuoteRequestTableDialogOpen,
  handleQuoteRequestTableDialogClose,
  quoteRequestTableDialogOpen,
}) {
  const [quoteRequests, setQuoteRequests] = useState([]);

  const [rows, setRows] = useState([
    {
      id: "test",
      date: "test",
      equipmentType: "test",
      companyName: "test",
      originName: "test",
      destinationName: "test",
    },
  ]);

  const getQuoteRequests = async () => {
    //getQuoteRequests is a function that returns a promise

    try {
      //try to get the quoteRequests from the database
      const response = await fetch("http://localhost:5000/quoteRequests/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
      });

      const jsonData = await response.json(); //convert the response to json

      return jsonData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuoteRequests().then((jsonData) => {
      console.log(jsonData);
      setRows(jsonData);
    });
  }, []);

  const user = localStorage.getItem("userName");

  return (
    <div>
      <Dialog
        open={quoteRequestTableDialogOpen}
        onClose={handleQuoteRequestTableDialogClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{user}'s QuoteRequests</DialogTitle>
        <DialogContent dividers style={{ height: "200px" }}>
          <p>{JSON.stringify(rows)}</p>
          <div style={{ display: "flex" }}>
            <QuoteRequestTableDialogComponent rows={rows} setRows={setRows} />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleQuoteRequestTableDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
