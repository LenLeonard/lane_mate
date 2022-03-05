import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";

import LaneStopInput from "./Lane Quote/LaneStopInput";

export default function LaneQuoteDialog({
  handleLaneQuoteDialogClose,
  handleLaneQuoteDialogOpen,
  onSubmit,
  laneQuoteDialogOpen,
  next,
  prev,
  cities,
  getFormData,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [laneStops, setLaneStops] = React.useState([]);

  function getLaneStops(e) {
    setLaneStops((prevState) => {
      // Object.assign would also work
      getFormData({ ...prevState, ...e });
    });
  }

  return (
    <>
      <Dialog open={laneQuoteDialogOpen} onClose={handleLaneQuoteDialogClose}>
        <DialogTitle>Enter Lane Information</DialogTitle>
        <DialogContent>
          <form id="laneQuoteDialogForm">
            <DialogContentText>
              <p>{JSON.stringify(laneStops)}</p>
              Add origin and destination. For extra picks or drops, add
              additional origins and/or destinations.
            </DialogContentText>
            <span>
              <LaneStopInput cities={cities} getLaneStops={getLaneStops} />
            </span>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleLaneQuoteDialogClose}>Cancel</Button>
          <Button onClick={prev}>Prev</Button>
          <Button form="laneQuoteDialogForm" onClick={next}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
