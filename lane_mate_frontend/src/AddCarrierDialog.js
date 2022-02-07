import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";

export default function AddCarrierDialog({
  handleClickOpen,
  handleClose,
  addNewCarrier,
  getCarriers,
}) {
  const {
    //register,
    handleSubmit,
    control,
    //reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Dialog open={handleClickOpen} onClose={handleClose}>
        <DialogTitle>Add Carrier Information</DialogTitle>
        <DialogContent>
          <form id="carrierDialogForm" onSubmit={handleSubmit(addNewCarrier)}>
            <DialogContentText>
              Enter carrier name, contact email, contact phone + extension and
              contact name.
            </DialogContentText>
            <Controller
              name="carrier_name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Carrier Name"
                  type="outline"
                  variant="standard"
                  required
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="origin"
                  label="Phone Number"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="contact_ext"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="destination"
                  label="Extension"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="contact_email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="equipmentType"
                  label="Contact Email"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="contact_name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="weight"
                  label="Contact Name"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="state_province"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="state"
                  label="State/Province"
                  type="outline"
                  variant="standard"
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="carrierDialogForm" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
