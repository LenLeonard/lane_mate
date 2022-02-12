import * as React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Autocomplete } from "@mui/material";
import {
  Container,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Card,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "38ch",
    },
  },
  btn: {
    height: "55px",
    float: "right",
    marginBottom: "15px",
  },
  btn3: {
    height: "55px",
    width: "35px",
    float: "right",
  },
  btnB: {
    height: "55px",
    marginBottom: "15px",
  },
}));

export default function HandlingUnitInput({ getEquipmentData }) {
  const classes = useStyles();
  const [multiInput, setMultiInput] = useState([
    {
      equipment_type: "",
      special_attributes: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    const inputList = [...multiInput];
    inputList[index][name] = value;
    setMultiInput(inputList);
    getEquipmentData(multiInput);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    const inputList = [...multiInput];
    inputList.splice(index, 1);
    setMultiInput(inputList);
  };

  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault();
    setMultiInput([
      ...multiInput,
      {
        equipment_type: "",
        special_attributes: "",
      },
    ]);
    console.log(multiInput);
  };

  const equipment_types = [
    { equipment_type: "Dry Van" },
    { equipment_type: "Reefer" },
    { equipment_type: "Flatbed" },
    { equipment_type: "Super-B" },
    { equipment_type: "Curtain Side" },
  ];

  return (
    <Container>
      <Card>
        <CardHeader title="Enter Equipment Information" />
        <CardContent>
          {multiInput.map((x, i) => {
            return (
              <div className={classes.root} key={i}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={equipment_types.map(
                    (option) => option.equipment_type
                  )}
                  onChange={(e, value) => {
                    const inputList = [...multiInput];
                    inputList[i].equipment_type = value;
                    setMultiInput(inputList);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      label="Equipment Type"
                      name="equipmentType"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
                <TextField
                  id="outlined-basic1"
                  label="Special Attributes"
                  name="special_attributes"
                  variant="outlined"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <p>{JSON.stringify(multiInput)}</p>
              </div>
            );
          })}

          <hr />
        </CardContent>
      </Card>
      <hr />
    </Container>
  );
}
