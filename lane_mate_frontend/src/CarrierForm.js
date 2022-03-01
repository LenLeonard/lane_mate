import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";

// CarrierForm is a component that allows the user to create a new carrier.
// It takes two props:
// 1. createNewEntryOnSubmit: a callback function that takes in the event returned from the form and returns it to CarrierTable so that it can be added to the table
// 2. quoteRequestDefined: a boolean that is true if the user has defined a quote request;  it is used to prevent the user from submitting the form if they have not defined a quote request
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

  //This function handles the submit event from the form, which is passed to the Dashboard component as a callback
  //If the user has defined a quote request, the event is pushed to the tableData array via createNewEntryOnSubmit
  //the carrier form is then reset to its initial state, and the focus is set to the carrier name input
  //If the user has not defined a quote request, an alert is displayed to the user in a modal

  //Function used to format the phone number input
  const formatPhoneNumber = (phone) => {
    let regexObj = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regexObj.test(phone)) {
      let formattedPhoneNumber = phone.replace(regexObj, "($1) $2-$3");
      return formattedPhoneNumber;
    } else {
      // Invalid phone number
    }
  };

  const formSubmitandReset = (event) => {
    if (quoteRequestDefined === true) {
      let formattedPhoneNumber = formatPhoneNumber(event.phone);
      event.phone = formattedPhoneNumber;

      createNewEntryOnSubmit(event);
      reset();
      setFocus("carrier_name");
    } else {
      handleAlertModalOpen();
    }
  };

  // Below is code related to the modal that is displayed when the user has not defined a quote request
  ////////////////////////////////////////////////////////////////////

  const [modalOpen, setModalOpen] = useState(false);

  const handleAlertModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const modalBoxStyle = {
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
  ////////////////////////////////////////////////////////////////////

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalBoxStyle}>
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
            name="phone"
            id="phone"
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
                {...register("phone", {
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Phone number must be a 10 digit number",
                  },
                })}
                error={!!errors?.phone}
                helperText={errors?.phone?.message}
              />
            )}
          />

          <Controller
            name="contactExt"
            id="contactExt"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value || ""}
                onChange={onChange}
                label="Extension"
                variant="outlined"
                margin="normal"
                color="secondary"
                {...register("contactExt", {
                  pattern: {
                    message: "Extension must be between 1 and 4 digits",
                  },
                })}
                error={!!errors?.contactExt}
                helperText={errors?.contactExt?.message}
              />
            )}
          />
          <Controller
            name="contactEmail"
            id="contactEmail"
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
                {...register("contactEmail", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors?.contactEmail}
                helperText={errors?.contactEmail?.message}
              />
            )}
          />
          <Controller
            name="contactName"
            id="contactName"
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
            id="rate"
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
            id="notes"
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
