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
import { useForm, Controller } from "react-hook-form";
import CarrierTable from "./CarrierTable";

export default function FormDialog() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [quoteNumber, setQuoteNumber] = useState(1);

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
    numberOfFeet: "Number of ",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event) => {
    setQuoteNumber(quoteNumber + 1);

    let newQuoteObject = {
      quoteNumber: quoteNumber,
      quoteDate: new Date().toDateString(),
      customerName: event.customerName,
      origin: event.origin,
      destination: event.destination,
      equipmentType: event.equipmentType,
      weight: event.weight,
      numberOfPallets: event.numberOfPallets,
      dimensions: event.dimensions,
      numberOfFeet: event.numberOfFeet,
    };

    setQuoteObject(newQuoteObject);
    reset();
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
            <form id="dialogForm" onSubmit={handleSubmit(onSubmit)}>
              <DialogContentText>
                Please enter Customer name, date, destination, orgin, equipment
                type, weight, number of pallets and dimensions.
              </DialogContentText>
              <Controller
                name="customerName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Customer"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="origin"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Origin"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="destination"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Destination"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="equipmentType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Equipment Type"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="weight"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    label="Weight"
                    type="outline"
                    variant="standard"
                    {...register("weight", {
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Weight must be a number",
                      },
                    })}
                    error={!!errors?.weight}
                    helperText={errors?.weight?.message}
                  />
                )}
              />
              <Controller
                name="numberOfPallets"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    label="Number of Pallets"
                    type="outline"
                    variant="standard"
                    {...register("numberOfPallets", {
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Number of Pallets must be a number",
                      },
                    })}
                    error={!!errors?.numberOfPallets}
                    helperText={errors?.numberOfPallets?.message}
                  />
                )}
              />

              <Controller
                name="numberOfFeet"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    label="Number of Feet"
                    type="outline"
                    variant="standard"
                    {...register("numberOfFeet", {
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Number of Feet must be a number",
                      },
                    })}
                    error={!!errors?.numberOfFeet}
                    helperText={errors?.numberOfFeet?.message}
                  />
                )}
              />

              <Controller
                name="dimensions"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    label="Dimensions"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="dialogForm">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <QuoteCard {...quoteObject} />
      <br />
      <CarrierTable />
    </div>
  );
}
