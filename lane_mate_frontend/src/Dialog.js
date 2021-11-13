import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import QuoteCard from "./QuoteCard";
import { CardActions } from "@mui/material";

export default function FormDialog() {
  const [quoteNumber, setQuoteNumber] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [weight, setWeight] = useState("");
  const [numberOfPallets, setNumberOfPallets] = useState("");
  const [dimensions, setDimensions] = useState("");
  const quoteDate = new Date().toDateString();

  const [quoteObject, setQuoteObject] = useState({
    quoteNumber: "",
    quoteDate: new Date().toDateString(),
    customerName: "Customer",
    origin: "Origin",
    destination: "Destination",
    equipmentType: "Equipment Type",
    weight: "Weight in",
    numberOfPallets: "Number of ",
    dimensions: "Dimensions",
  });

  function createQuoteObject(
    quoteNumber,
    quoteDate,
    customerName,
    origin,
    destination,
    equipmentType,
    weight,
    numberOfPallets,
    dimensions
  ) {
    return {
      quoteNumber: "# " + quoteNumber,
      quoteDate: new Date().toDateString(),
      customerName: customerName,
      origin: origin,
      destination: destination,
      equipmentType: equipmentType,
      weight: weight,
      numberOfPallets: numberOfPallets,
      dimensions: dimensions,
    };
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setQuoteNumber(quoteNumber + 1);

    const newQuoteObject = createQuoteObject(
      quoteNumber,
      quoteDate,
      customerName,
      origin,
      destination,
      equipmentType,
      weight,
      numberOfPallets,
      dimensions
    );

    setQuoteObject(newQuoteObject);

    handleClose();
  };

  return (
    <div>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          New Quote Request
        </Button>
      </CardActions>

      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Enter Quote Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter Customer name, date, destination, orgin, equipment
              type, weight, number of pallets and dimensions.
            </DialogContentText>
            <TextField
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Customer"
              type="outline"
              variant="standard"
            />

            <TextField
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Origin"
              type="outline"
              variant="standard"
            />
            <TextField
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Destination"
              type="outline"
              variant="standard"
            />
            <TextField
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Equipment Type"
              type="outline"
              variant="standard"
            />
            <TextField
              value={numberOfPallets}
              onChange={(e) => setNumberOfPallets(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Number of Pallets"
              type="outline"
              variant="standard"
            />
            <TextField
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Weight"
              type="outline"
              variant="standard"
            />
            <TextField
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Dimensions"
              type="outline"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
      <QuoteCard quote={quoteObject} />
    </div>
  );
}
