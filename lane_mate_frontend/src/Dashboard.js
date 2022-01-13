import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import QuoteCard from "./QuoteCard";
import { CardActions } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CarrierTable from "./CarrierTable";
import SearchBar from "./SearchBar";

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  let formattedQuoteRequest;

  //tableData is being used right now to pass an empty array to the table when New Quote Request form is submitted
  //it will also be used to update the table when a quote request is selected from the search bar
  let [tableData, setTableData] = useState([]);

  //quote number is being used to increment pass the quote number to the QuoteCard component
  const [quoteNumber, setQuoteNumber] = useState(1);

  //quoteObject is being used to handle the data from the Quote Request Dialog pop up and pass it to the QuoteCard component
  //the initial state is an empty quoteObject
  const [quoteObject, setQuoteObject] = useState({
    quoteNumber: "",
    quoteDate: new Date().toDateString(),
    customerName: "Customer",
    origin: "Origin",
    destination: "Destination",
    equipmentType: "Equipment Type",
    weight: "Weight in",
    numberOfPallets: "Number of ",
    dimensions: "Dimensions",
    numberOfFeet: "Number of ",
  });

  //this is an array of formatted quoteRequest objects that will be passed to the search bar component so they may be displayed in the search bar
  let [formattedQuoteRequestArray, setFormattedQuoteRequestArray] = useState(
    []
  );

  //createDashboardObject is being used to combine the tableData and quoteObjectArray to make a dashboard object
  function createDashBoardObject(quoteObject, tableDataArray) {
    let dashBoardObject = {
      quoteObject: quoteObject,
      tableDataArray: tableDataArray,
    };
    return dashBoardObject;
  }

  //dashboardObjectArray is an array of the objects that store the state of the entire dashboard, so that they may be recalled on search
  const [dashBoardObjectArray, setDashBoardObjectArray] = useState([]);

  //this is the function that opens the quote request dialog
  const [open, setOpen] = useState(false);

  //and these are the click handlers that handle both opening and closing the quote request dialog

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //this is the function that handles the submit of the quote request form
  //it might be trying to do too much
  const onSubmit = (event) => {
    //this increments the quoteNumber state so that the next quote request will have a unique quote number
    setQuoteNumber(quoteNumber + 1);

    //this takes the user input from the dialog form and defines the object that will be passed to the QuoteCard component
    let newQuoteObject = {
      quoteNumber: quoteNumber,
      quoteDate: new Date().toDateString(),
      customerName: event.customerName,
      origin: event.origin,
      destination: event.destination,
      equipmentType: event.equipmentType,
      weight: event.weight,
      numberOfPallets: event.numberOfPallets,
      dimensions: event.dimensions,
      numberOfFeet: event.numberOfFeet,
    };

    //this sets the quoteObject state to the newQuoteObject and so re-renders the quote card component with the updated quoteObject
    setQuoteObject(newQuoteObject);

    //all of this logic was implemented to try and get search to work

    //creates a new dashboard object with the quoteObject and tableDataArray

    let newDashboardObject = createDashBoardObject(newQuoteObject, tableData);

    //this pushes the new dashboard object to the dashboardObjectArray
    setDashBoardObjectArray((state) => [...state, newDashboardObject]);
    console.log(dashBoardObjectArray);

    //this creates a fornatted quote request object that will be compatible with the search bar
    formattedQuoteRequest = formatQuoteRequest(newQuoteObject);

    //this is an array of formatted quoteRequest objects that will be passed to the search bar component so they may be displayed in the search bar
    setFormattedQuoteRequestArray((state) => [...state, formattedQuoteRequest]);

    //these functions reset the dialog form, pass an empty array to the table, and close the dialog

    reset();
    setTableData([]);

    handleClose();
  };

  //this is the function that formats the quote request object so that it can be passed to the search bar component
  function formatQuoteRequest(quoteObject) {
    let quoteRequest = {
      quotenumber: quoteObject.quoteNumber,
      display: `Quote Request ${quoteObject.quoteNumber}, ${quoteObject.numberOfPallets} Skids from ${quoteObject.origin} to ${quoteObject.destination} for ${quoteObject.customerName}`,
    };

    return quoteRequest;
  }

  // this is the callback function that retrieves the data from the table and stores it in the tableData state
  function returnCarrierDataToDashboard(event) {
    setTableData((state) => [...state, event]);
    console.log(tableData);
  }

  //this is the callback function that the search bar component will call when a search qurery is submitted, so that the dashboard can be updated
  function updateDashBoard(dashBoardObject) {
    setQuoteObject(dashBoardObject.quoteObject);
    setTableData(dashBoardObject.tableDataArray);
  }

  return (
    <div>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          New Quote Request
        </Button>
      </CardActions>

      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Enter Quote Information</DialogTitle>
          <DialogContent>
            <form id="dialogForm" onSubmit={handleSubmit(onSubmit)}>
              <DialogContentText>
                Please enter Customer name, date, destination, orgin, equipment
                type, weight, number of pallets and dimensions.
              </DialogContentText>
              <Controller
                name="customerName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Customer"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="origin"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Origin"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="destination"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Destination"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="equipmentType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Equipment Type"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="weight"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    label="Weight"
                    type="outline"
                    variant="standard"
                    {...register("weight", {
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Weight must be a number",
                      },
                    })}
                    error={!!errors?.weight}
                    helperText={errors?.weight?.message}
                  />
                )}
              />
              <Controller
                name="numberOfPallets"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    label="Number of Pallets"
                    type="outline"
                    variant="standard"
                    {...register("numberOfPallets", {
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Number of Pallets must be a number",
                      },
                    })}
                    error={!!errors?.numberOfPallets}
                    helperText={errors?.numberOfPallets?.message}
                  />
                )}
              />

              <Controller
                name="numberOfFeet"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    label="Number of Feet"
                    type="outline"
                    variant="standard"
                    {...register("numberOfFeet", {
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Number of Feet must be a number",
                      },
                    })}
                    error={!!errors?.numberOfFeet}
                    helperText={errors?.numberOfFeet?.message}
                  />
                )}
              />

              <Controller
                name="dimensions"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    autoFocus
                    margin="dense"
                    label="Dimensions"
                    type="outline"
                    variant="standard"
                  />
                )}
              />
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="dialogForm">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <SearchBar
        updateDashboard={updateDashBoard}
        dashBoardObjectArray={dashBoardObjectArray}
        quoteRequestArray={formattedQuoteRequestArray}
      />
      <QuoteCard {...quoteObject} />
      <br />
      <CarrierTable
        tableData={tableData}
        returnCarrierDataToDashboard={returnCarrierDataToDashboard}
      />
    </div>
  );
}
