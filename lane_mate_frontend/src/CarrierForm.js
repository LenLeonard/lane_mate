import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";

export default function CarrierForm({ createNewEntryOnSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmitandReset = (event) => {
    createNewEntryOnSubmit(event);
    reset();
  };

  return (
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
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value || ""}
              onChange={onChange}
              label="Carrier Name"
              variant="outlined"
              margin="normal"
              color="secondary"
              required
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
              required
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

        <Button variant="contained" color="primary" type="submit" size="large">
          Add Carrier
        </Button>
      </Box>
    </form>
  );
}
