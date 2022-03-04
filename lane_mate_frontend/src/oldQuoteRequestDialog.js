import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";

export default function QuoteRequestDialog({
  handleQuoteRequestClose,
  quoteRequestDialogOpen,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <Dialog open={quoteRequestDialogOpen} onClose={handleQuoteRequestClose}>
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
                required
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
                id="origin"
                label="Origin"
                type="outline"
                variant="standard"
                required
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
                id="destination"
                label="Destination"
                type="outline"
                variant="standard"
                required
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
                id="equipmentType"
                label="Equipment Type"
                type="outline"
                variant="standard"
                required
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
                id="weight"
                label="Weight"
                type="outline"
                variant="standard"
                required
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
                id="numberOfPallets"
                label="Number of Pallets"
                type="outline"
                variant="standard"
                required
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
                id="numberOfFeet"
                label="Number of Feet"
                type="outline"
                variant="standard"
                required
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
                id="dimensions"
                label="Dimensions"
                type="outline"
                variant="standard"
              />
            )}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleQuoteRequestClose}>Cancel</Button>
        <Button type="submit" form="dialogForm">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
