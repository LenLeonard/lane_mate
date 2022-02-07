import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function EditLoad({ loadRow, getLoads }) {
  const [load, setLoad] = React.useState({
    ...loadRow,
  });

  //edit load table function

  const updateLoad = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(load);
      console.log(body);
      const response = await fetch(`http://localhost:3000/loads/${load.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
      console.log(response);
      getLoads();
    } catch (err) {
      console.error(err.message);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setLoad({ ...load });
    setOpen(true);
  };

  const handleClose = (e) => {
    setLoad({ ...load, [e.target.name]: e.target.value });
    updateLoad(e);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your edit below and click submit.
          </DialogContentText>
          <TextField
            value={load.num_pallets}
            margin="dense"
            id="num_pallets"
            label="Number of Pallets"
            type="text"
            variant="standard"
            onChange={(e) => setLoad({ ...load, num_pallets: e.target.value })}
          />
          <TextField
            value={load.pallet_dims_id}
            margin="dense"
            id="pallet_dims_id"
            label="Pallet Dimensions"
            type="text"
            variant="standard"
            onChange={(e) =>
              setLoad({ ...load, pallet_dims_id: e.target.value })
            }
          />
          <TextField
            value={load.commodity}
            margin="dense"
            id="commodity"
            label="Commodity"
            type="text"
            variant="standard"
            onChange={(e) => setLoad({ ...load, commodity: e.target.value })}
          />
          <TextField
            value={load.weight_lbs}
            margin="dense"
            id="weight_lbs"
            label="Weight (lbs)"
            type="text"
            variant="standard"
            onChange={(e) => setLoad({ ...load, weight_lbs: e.target.value })}
          />

          <TextField
            value={load.weight_kgs}
            margin="dense"
            id="weight_kgs"
            label="Weight (kgs)"
            type="text"
            variant="standard"
            onChange={(e) => setLoad({ ...load, weight_kgs: e.target.value })}
          />

          <TextField
            value={load.feet}
            margin="dense"
            id="feet"
            label="Feet"
            type="text"
            variant="standard"
            onChange={(e) => setLoad({ ...load, feet: e.target.value })}
          />

          <TextField
            value={load.packaging_type}
            margin="dense"
            id="packaging_type"
            label="Packaging Type"
            type="text"
            variant="standard"
            onChange={(e) =>
              setLoad({ ...load, packaging_type: e.target.value })
            }
          />

          <TextField
            value={load.equipment_type}
            margin="dense"
            id="equipment_type"
            label="Equipment Type"
            type="text"
            variant="standard"
            onChange={(e) =>
              setLoad({ ...load, equipment_type: e.target.value })
            }
          />

          <TextField
            value={load.special_instructions}
            margin="dense"
            id="special_instructions"
            label="Special Instructions"
            type="text"
            variant="standard"
            onChange={(e) =>
              setLoad({ ...load, special_instructions: e.target.value })
            }
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={load.is_palletized}
                  margin="dense"
                  id="is_palletized"
                  onChange={(e) =>
                    setLoad({ ...load, is_palletized: e.target.checked })
                  }
                />
              }
              label="Is Palletized"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
