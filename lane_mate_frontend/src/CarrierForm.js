import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "@mui/material";

import Modal from "@mui/material/Modal";

export default function CarrierForm({
  createNewEntryOnSubmit,
  quoteRequestDefined,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const formSubmitandReset = (event) => {
    if (quoteRequestDefined === true) {
      createNewEntryOnSubmit(event);
      reset();
      setFocus("carrierName");
    } else {
      handleOpen();
    }
  };

  const [open, setOpen] = React.useState(false);
  function handleOpen() {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Box sx={style}>
          <Alert severity="info">
            You must first define a quote request before adding a carrier. Click
            'Create New Quote Request' to get started.
          </Alert>
        </Box>
      </Modal>
      <form onSubmit={handleSubmit(formSubmitandReset)}>
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="on"
        >
          <Controller
            name="carrierName"
            id="carrierName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value || ""}
                onChange={onChange}
                label="Carrier Name"
                variant="outlined"
                margin="normal"
                color="secondary"
                required={quoteRequestDefined}
                {...register("carrierName")}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value || ""}
                onChange={onChange}
                label="Phone Number"
                variant="outlined"
                margin="normal"
                color="secondary"
                {...register("phoneNumber", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Phone number must be a 10 digit number",
                  },
                })}
                error={!!errors?.phoneNumber}
                helperText={errors?.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="dispatchEmail"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value || ""}
                onChange={onChange}
                label="Dispatch Email"
                variant="outlined"
                margin="normal"
                color="secondary"
                {...register("dispatchEmail", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors?.dispatchEmail}
                helperText={errors?.dispatchEmail?.message}
              />
            )}
          />
          <Controller
            name="contactName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value || ""}
                onChange={onChange}
                label="Contact Name"
                variant="outlined"
                margin="normal"
                color="secondary"
              />
            )}
          />
          <Controller
            name="rate"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value || ""}
                onChange={onChange}
                label="Rate"
                variant="outlined"
                margin="normal"
                color="secondary"
                required={quoteRequestDefined}
                {...register("rate", {
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Rate must be a number",
                  },
                })}
                error={!!errors?.rate}
                helperText={errors?.rate?.message}
              />
            )}
          />
          <Controller
            name="notes"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value || ""}
                onChange={onChange}
                label="Notes"
                variant="outlined"
                margin="normal"
                color="secondary"
                multilinerows="4"
              />
            )}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Add Carrier
          </Button>
        </Box>
      </form>
    </>
  );
}
