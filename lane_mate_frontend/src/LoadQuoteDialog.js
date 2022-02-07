import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import HandlingUnitInput from "./HandlingUnitInput";
import { useEffect } from "react";
import EquipmentTypeInput from "./EquipmentTypeInput";

export default function LoadQuoteDialog({
  handleLoadQuoteDialogClose,
  handleLoadQuoteDialogOpen,
  loadQuoteDialogOpen,
  onSubmit,
  prev,
  getFormData,
  handleSubmitLoadQuoteDialogClose,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [loadData, setLoadData] = React.useState({});

  function getLoadData(e) {
    setLoadData((prevState) => {
      return { ...prevState, ...e };
    });
  }
  const [equipmentData, setEquipmentData] = React.useState({});

  function getEquipmentData(e) {
    setEquipmentData((prevState) => {
      return { ...prevState, ...e };
    });
  }

  useEffect(() => {
    getFormData({ loadData: loadData, equipmentData: equipmentData });
  }, [loadData, equipmentData]);

  return (
    <Dialog
      open={loadQuoteDialogOpen}
      onClose={handleLoadQuoteDialogClose}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>Load Quote Dialog</DialogTitle>
      <DialogContent>
        <form id="loadQuoteDialogForm" onSubmit={handleSubmit(getFormData)}>
          <DialogContentText>
            Please enter Customer name, date, destination, orgin, equipment
            type, weight, number of pallets and dimensions.
          </DialogContentText>
        </form>
      </DialogContent>
      <HandlingUnitInput getLoadData={getLoadData} />
      <EquipmentTypeInput getEquipmentData={getEquipmentData} />
      <p>{JSON.stringify(equipmentData)}</p>
      <p>{JSON.stringify(loadData)}</p>
      <DialogActions>
        <Button onClick={handleLoadQuoteDialogClose}>Cancel</Button>
        <Button
          type="submit"
          form="loadQuoteDialogForm"
          onClick={handleSubmitLoadQuoteDialogClose}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
