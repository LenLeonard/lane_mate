import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import AddCarrierDialog from "./AddCarrierDialog";
import { useEffect } from "react";
import CarrierTableComponent from "./CarrierTableComponent";

export default function CarrierDialog({
  handleCarrierDialogClose,
  carrierDialogOpen,
  carriers,
  setCarriers,
}) {
  const [rows, setRows] = useState(carriers);

  const [openAddNewCarrier, setOpenAddNewCarrier] = useState(false);

  const handleNewcarrierClickOpen = () => {
    setOpenAddNewCarrier(true);
  };

  const handleNewCarrierClose = () => {
    setOpenAddNewCarrier(false);
  };

  const getCarriers = async () => {
    //getCarriers is a function that returns a promise
    try {
      //try to get the carriers from the database
      const response = await fetch("http://localhost:5000/carriers");
      const jsonData = await response.json(); //convert the response to json
      setRows(jsonData);
      setCarriers(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarriers();
  }, []);

  async function addNewCarrier(event) {
    //post a new carrier to the database
    try {
      const response = await fetch("http://localhost:5000/carriers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Access Token"),
        },
        body: JSON.stringify(event),
      });
      if (response.status === 200) {
        getCarriers();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <p>{JSON.stringify(carriers)}</p>
      <Dialog
        open={carrierDialogOpen}
        onClose={handleCarrierDialogClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Carrier</DialogTitle>
        <DialogContent dividers style={{ height: "200px" }}>
          <div style={{ display: "flex" }}>
            <CarrierTableComponent rows={rows} setRows={setRows} />
          </div>
        </DialogContent>
        <AddCarrierDialog
          handleClickOpen={openAddNewCarrier}
          handleClose={handleNewCarrierClose}
          addNewCarrier={addNewCarrier}
          getCarriers={getCarriers}
        />

        <DialogActions>
          <Button onClick={handleNewcarrierClickOpen}>Add Carrier</Button>

          <Button onClick={handleCarrierDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
