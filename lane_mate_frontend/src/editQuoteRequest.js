import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditQuoteRequest({ quoteRequestRow }) {
  const [quoteRequest, setQuoteRequest] = React.useState({
    ...quoteRequestRow,
  });

  //edit quote request function

  const updateQuoteRequest = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(quoteRequest);
      console.log(body);
      const response = await fetch(
        `http://localhost:3000/quoteRequests/${quoteRequest.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body,
        }
      );
      window.location.reload();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setQuoteRequest({ ...quoteRequest });
    setOpen(true);
  };

  const handleClose = (e) => {
    setQuoteRequest({ ...quoteRequest, [e.target.name]: e.target.value });
    updateQuoteRequest(e);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your edit below and click submit.
          </DialogContentText>
          <TextField
            value={quoteRequest.sales_rep}
            margin="dense"
            id="sales_rep"
            label="Sales Rep Name"
            type="text"
            variant="standard"
            onChange={(e) =>
              setQuoteRequest({ ...quoteRequest, sales_rep: e.target.value })
            }
          />

          <TextField
            value={quoteRequest.customer}
            margin="dense"
            id="customer"
            label="Customer Name"
            type="text"
            variant="standard"
            onChange={(e) =>
              setQuoteRequest({ ...quoteRequest, customer: e.target.value })
            }
          />
          <TextField
            value={quoteRequest.lane}
            margin="dense"
            id="lane"
            label="Lane"
            type="text"
            variant="standard"
            onChange={(e) =>
              setQuoteRequest({ ...quoteRequest, lane: e.target.value })
            }
          />
          <TextField
            value={quoteRequest.load}
            margin="dense"
            id="load"
            label="Load"
            type="text"
            variant="standard"
            onChange={(e) =>
              setQuoteRequest({ ...quoteRequest, load: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
