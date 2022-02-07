import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";

export default function AddCustomerDialog({
  handleClickOpen,
  handleClose,
  addNewCustomer,
  getCustomers,
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
        <DialogTitle>Add Customer Information</DialogTitle>
        <DialogContent>
          <form id="customerDialogForm" onSubmit={handleSubmit(addNewCustomer)}>
            <DialogContentText>
              Enter company name, primary contact, contact email, contact phone,
              city, and state/province.
            </DialogContentText>
            <Controller
              name="company_name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Company Name"
                  type="outline"
                  variant="standard"
                  required
                />
              )}
            />
            <Controller
              name="primary_contact"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="origin"
                  label="Primary Contact"
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
                  id="destination"
                  label="Contact Email"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="contact_phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="equipmentType"
                  label="Contact Phone"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="weight"
                  label="City"
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
          <Button type="submit" form="customerDialogForm" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
