import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox } from "@mui/material";
import { FormGroup, FormControlLabel } from "@mui/material";

export default function EditCarrier({ carrierRow, getCarriers }) {
  const [carrier, setCarrier] = React.useState({
    ...carrierRow,
  });

  //edit carrier table function

  const updateCarrier = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(carrier);
      console.log(body);
      const response = await fetch(
        `http://localhost:3000/carriers/${carrier.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body,
        }
      );
      console.log(response);
      getCarriers();
    } catch (err) {
      console.error(err.message);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setCarrier({ ...carrierRow });
    setOpen(true);
  };

  const handleUpdateClose = (e) => {
    setCarrier({ ...carrier, [e.target.name]: e.target.value });
    updateCarrier(e);
    setOpen(false);
  };

  const handleCancelClose = (e) => {
    setCarrier({ ...carrierRow });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleCancelClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your edit below and click submit.
          </DialogContentText>
          <TextField
            value={carrier.name}
            margin="dense"
            id="name"
            label="Carrier Name"
            type="text"
            variant="standard"
            onChange={(e) => setCarrier({ ...carrier, name: e.target.value })}
          />
          <TextField
            value={carrier.phone}
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            variant="standard"
            onChange={(e) => setCarrier({ ...carrier, phone: e.target.value })}
          />
          <TextField
            value={carrier.email}
            margin="dense"
            id="email"
            label="Email"
            type="text"
            variant="standard"
            onChange={(e) => setCarrier({ ...carrier, email: e.target.value })}
          />
          <TextField
            value={carrier.contact_name}
            margin="dense"
            id="contact_name"
            label="Contact Name"
            type="text"
            variant="standard"
            onChange={(e) =>
              setCarrier({ ...carrier, contact_name: e.target.value })
            }
          />
          <TextField
            value={carrier.mc_number}
            margin="dense"
            id="mc_number"
            label="MC Number"
            type="text"
            variant="standard"
            onChange={(e) =>
              setCarrier({ ...carrier, mc_number: e.target.value })
            }
          />
          <TextField
            value={carrier.dot_number}
            margin="dense"
            id="dot_number"
            label="DOT Number"
            type="text"
            variant="standard"
            onChange={(e) =>
              setCarrier({ ...carrier, dot_number: e.target.value })
            }
          />
          <TextField
            value={carrier.address}
            margin="dense"
            id="address"
            label="Address"
            type="text"
            variant="standard"
            onChange={(e) =>
              setCarrier({ ...carrier, address: e.target.value })
            }
          />
          <TextField
            value={carrier.city}
            margin="dense"
            id="city"
            label="City"
            type="text"
            variant="standard"
            onChange={(e) => setCarrier({ ...carrier, city: e.target.value })}
          />
          <TextField
            value={carrier.state_province}
            margin="dense"
            id="state"
            label="State/Province"
            type="text"
            variant="standard"
            onChange={(e) =>
              setCarrier({ ...carrier, state_province: e.target.value })
            }
          />
          <TextField
            value={carrier.zip_postal_code}
            margin="dense"
            id="zip_postal_code"
            label="Zip/Postal Code"
            type="text"
            variant="standard"
            onChange={(e) =>
              setCarrier({ ...carrier, zip_postal_code: e.target.value })
            }
          />
          <TextField
            value={carrier.country}
            margin="dense"
            id="country"
            label="SOOOO"
            type="text"
            variant="standard"
            onChange={(e) =>
              setCarrier({ ...carrier, country: e.target.value })
            }
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={carrier.is_blacklisted}
                  margin="dense"
                  id="is_blacklisted"
                  onChange={(e) =>
                    setCarrier({ ...carrier, is_blacklisted: e.target.checked })
                  }
                />
              }
              label="Blacklisted"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>Cancel</Button>
          <Button onClick={handleUpdateClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
