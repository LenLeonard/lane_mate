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

export default function HandlingUnitInput({ getLoadData }) {
  const classes = useStyles();
  const [multiInput, setMultiInput] = useState([
    {
      type: "",
      weightLbs: "",
      lengthInches: "",
      widthInches: "",
      heightInches: "",
      quantity: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const inputList = [...multiInput];
    console.log(inputList);
    inputList[index][name] = value;
    setMultiInput(inputList);
    getLoadData(multiInput);
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
        type: "",
        weightLbs: "",
        lengthInches: "",
        widthInches: "",
        heightInches: "",
        quantity: "",
      },
    ]);
    console.log(multiInput);
  };

  const handlingUnitTypes = [
    { handlingUnitType: "Pallet" },
    { handlingUnitType: "Skid" },
    { handlingUnitType: "Pipe" },
    { handlingUnitType: "Crate" },
    { handlingUnitType: "Box" },
    { handlingUnitType: "Drum" },
  ];

  return (
    <Container>
      <Card>
        <CardHeader title="Enter Load Information" />
        <CardContent>
          {multiInput.map((x, i) => {
            return (
              <div className={classes.root} key={i}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={handlingUnitTypes.map(
                    (option) => option.handlingUnitType
                  )}
                  onChange={(e, value) => {
                    const inputList = [...multiInput];
                    inputList[i].type = value;
                    setMultiInput(inputList);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      label="Handling Unit"
                      name="type"
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
                  label="Quantity"
                  name="quantity"
                  variant="outlined"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <TextField
                  id="outlined-basic2"
                  label="Length"
                  variant="outlined"
                  name="lengthInches"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <TextField
                  id="outlined-basic2"
                  label="Width"
                  variant="outlined"
                  name="widthInches"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <TextField
                  id="outlined-basic2"
                  label="Height"
                  variant="outlined"
                  name="heightInches"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <TextField
                  id="outlined-basic2"
                  label="Weight"
                  variant="outlined"
                  name="weightLbs"
                  onChange={(e) => handleInputChange(e, i)}
                />

                {i > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.btn3}
                    onClick={(e) => handleRemoveClick(e, i)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}

          <hr />
        </CardContent>
        <CardActions>
          <div>
            <Button
              variant="outlined"
              color="primary"
              className={classes.btn}
              onClick={handleAddClick}
            >
              Add Input
            </Button>
          </div>
        </CardActions>
      </Card>
      <hr />
    </Container>
  );
}
