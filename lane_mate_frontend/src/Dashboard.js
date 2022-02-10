import * as React from "react";
import Button from "@mui/material/Button";

import { useState } from "react";
import QuoteCard from "./QuoteCard";
import { CardActions } from "@mui/material";
import { useForm } from "react-hook-form";
import CarrierTable from "./CarrierTable";
import SearchBar from "./SearchBar";
import { Alert } from "@mui/material";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Snackbar } from "@material-ui/core";
import CarrierDialog from "./CarrierDialog";
import QuoteRequestDialog from "./QuoteRequestDialog";
import CustomerDialog from "./CustomerDialog";
import QuoteRequestComponent from "./QuoteRequestComponent";
import OfferTableComponent from "./OfferTableComponent";

//Dashboard is the main component of the application.
//It contains the QuoteCard, SearchBar, and CarrierTable components
//and performs the work of coordinating the data between them.

export default function Dashboard() {
  //client side Auth stuff
  const logout = () => {
    localStorage.removeItem("Access Token");
    localStorage.removeItem("Refresh Token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  function checkToken() {
    const token = localStorage.getItem("Access Token");

    const decodedToken = atob(token.split(".")[1]);

    const tokenExpiration = JSON.parse(decodedToken).exp;
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(tokenExpiration - currentTime);
    if (tokenExpiration < currentTime) {
      logout();
    }
  }

  async function refreshToken() {
    try {
      const refreshToken = localStorage.getItem("Refresh Token");
      const body = JSON.stringify({
        refreshToken: refreshToken,
      });
      const response = await fetch("http://localhost:5000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const json = await response.json();
      console.log(json);

      localStorage.setItem("Access Token", json.accessToken);
    } catch (error) {
      console.error(error.message);
    }
  }
  //checkToken();
  //setInterval(() => refreshToken(), 1000 * 60 * 29);
  //setInterval(() => checkToken(), 1000 * 60 * 30);

  const { reset, handleSubmit } = useForm();

  //LOAD UP CARRIERS
  const [carriers, setCarriers] = useState([]);

  // QUOTE OBJECT DEFINITION AND FORMAT HANDLING //

  //set current quote number

  const [quoteRequestId, setQuoteRequestId] = useState(0);

  //quoteObject is being used to handle the data from the Quote Request Dialog pop up and pass it to the QuoteCard component;
  //the initial state is an empty quoteObject.

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

  //quote number is being used to increment pass the quote number to the QuoteCard component
  const [quoteNumber, setQuoteNumber] = useState(1);

  //this is the function that formats the quote request object so that it can be passed to the search bar component
  function formatQuoteRequest(quoteObject) {
    let quoteRequest = {
      quotenumber: quoteObject.quoteNumber,
      display: `Quote Request ${quoteObject.quoteNumber}, ${quoteObject.numberOfPallets} Skids from ${quoteObject.origin} to ${quoteObject.destination} for ${quoteObject.customerName}`,
    };

    return quoteRequest;
  }

  //this is an array of formatted quoteRequest objects that will be passed to the search bar component so they may be displayed in the search bar
  let [formattedQuoteRequestArray, setFormattedQuoteRequestArray] = useState(
    []
  );

  //DASHBOARD OBJECT FUNCTIONS //
  //These relate to both the download and search function, which both require a snapshot of the current state of the dashboard.

  //createDashboardObject combines the tableData and quoteObjectArray to make a dashboard object
  function createDashBoardObject(quoteObject, tableData) {
    let dashBoardObject = {
      quoteObject: quoteObject,
      tableDataArray: tableData,
    };
    return dashBoardObject;
  }

  //dashboardObjectArray is an array of the objects that store the state of the entire dashboard, so that they may be recalled on search or downloaded
  const [dashBoardObjectArray, setDashBoardObjectArray] = useState([]);

  //this is the callback function that the search bar component will call when a search qurery is submitted, so that the dashboard can be updated
  function updateDashBoard(dashBoardObject) {
    setQuoteObject(dashBoardObject.quoteObject);
    setTableData(dashBoardObject.tableDataArray);
  }

  //This function is used in the case where the user has entered a quote request and the corresponding carrier information,
  //but does not want to create another quote request. It allows the current quote request (state of the Dashboard) to be searched and downloaded
  //by adding it to the dashboardObjectArray.
  const handleSaveQuoteRequest = () => {
    async function addCarrierToDatabase(carrier) {
      try {
        const response = await fetch("http://localhost:5000/carriers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carrier),
        });
        if (response.status === 200) {
          try {
            //try to get the carriers from the database
            const response = await fetch("http://localhost:5000/carriers");
            const jsonData = await response.json(); //convert the response to json

            setCarriers(jsonData);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    tableData.forEach((offer) => {
      const carrier = {
        carrier_name: offer.carrierName,
        phone_number: offer.phoneNumber,
        contact_ext: offer.extension,
        contact_email: offer.dispatchEmail,
        contact_name: offer.contactName,
      };
      addCarrierToDatabase(carrier);
    });

    if (dashBoardObjectArray.length === 0 && quoteObject.quoteNumber === "") {
      handleSaveAlertModalOpen();
    } else if (dashBoardObjectArray.length === 0) {
      let newDashboardObject = createDashBoardObject(quoteObject, tableData);
      setDashBoardObjectArray([...dashBoardObjectArray, newDashboardObject]);
      handleSaveConfirmationSnackbarOpen();
    } else {
      let newDashboardObject = createDashBoardObject(quoteObject, tableData);
      let lastElementIndex = dashBoardObjectArray.length - 1;

      if (
        dashBoardObjectArray[lastElementIndex].quoteObject.quoteNumber ===
        newDashboardObject.quoteObject.quoteNumber
      ) {
        //this pushes the new dashboard object to the dashboardObjectArray
      } else {
        setDashBoardObjectArray([...dashBoardObjectArray, newDashboardObject]);
        handleSaveConfirmationSnackbarOpen();
      }
    }
  };

  //This handles the user request to download the state of the dashboard as list of quote requests
  //and carrier quotes as a formatted txt file
  const downloadTxtFile = () => {
    let output = "Quote requests for " + new Date().toDateString() + "\n";
    if (dashBoardObjectArray.length < 1) {
      handleDownloadAlertModalOpen();
    } else {
      for (const dashBoardObject in dashBoardObjectArray) {
        output += `\n\nQuote Request ${dashBoardObjectArray[dashBoardObject].quoteObject.quoteNumber}, ${dashBoardObjectArray[dashBoardObject].quoteObject.numberOfPallets} Skids from ${dashBoardObjectArray[dashBoardObject].quoteObject.origin} to ${dashBoardObjectArray[dashBoardObject].quoteObject.destination} for ${dashBoardObjectArray[dashBoardObject].quoteObject.customerName}\n`;
        for (const data in dashBoardObjectArray[dashBoardObject]
          .tableDataArray) {
          output += `\n${dashBoardObjectArray[dashBoardObject].tableDataArray[data].carrierName}: ${dashBoardObjectArray[dashBoardObject].tableDataArray[data].phoneNumber}, ${dashBoardObjectArray[dashBoardObject].tableDataArray[data].dispatchEmail}\nSpoke with ${dashBoardObjectArray[dashBoardObject].tableDataArray[data].contactName}, rate is $${dashBoardObjectArray[dashBoardObject].tableDataArray[data].rate}. Notes: ${dashBoardObjectArray[dashBoardObject].tableDataArray[data].notes}  \n`;
        }
      }

      const element = document.createElement("a");
      const file = new Blob([output], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      const fileName = `Quote Requests for ${new Date().toDateString()}.txt`;
      element.download = fileName;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  //CARRIER TABLE RELATED FUNCTIONS//

  //When the quoteObject array doesn't contain any user submitted data, the quote request is undefined.
  //This is used to determine if the Add Carrier button in CarrierForm should be disabled or not
  const [quoteRequestDefined, setQuoteRequestDefined] = useState(false);
  //tableData is being used right now to pass an empty array to the table when New Quote Request form is submitted
  //it will also be used to update the table when a quote request is selected from the search bar
  let [tableData, setTableData] = useState([]);

  //MODAL AND DIALOG HANDLERS//

  //Quote request dialog modal//

  const [quoteRequestDialogOpen, setQuoteRequestOpen] = useState(false);

  const handleQuoteRequestOpen = () => {
    setQuoteRequestOpen(true);
  };

  const handleQuoteRequestClose = () => {
    setQuoteRequestOpen(false);
  };

  //Customer dialog modal//

  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);

  const handleCustomerDialogOpen = () => {
    setCustomerDialogOpen(true);
  };

  const handleCustomerDialogClose = () => {
    setCustomerDialogOpen(false);
  };

  //Customer dialog modal//

  const [carrierDialogOpen, setCarrierDialogOpen] = useState(false);

  const handleCarrierDialogOpen = () => {
    setCarrierDialogOpen(true);
  };

  const handleCarrierDialogClose = () => {
    setCarrierDialogOpen(false);
  };

  //Save Alert Modal//

  const [openSaveAlertModal, setOpenSaveAlertModal] = useState(false);
  function handleSaveAlertModalOpen() {
    setOpenSaveAlertModal(true);
  }

  const handleSaveAlertModalClose = () => setOpenSaveAlertModal(false);

  //Save Confirmation Snackbar//
  const [openSaveConfirmationSnackbar, setOpenSaveConfirmationSnackbar] =
    useState(false);
  function handleSaveConfirmationSnackbarOpen() {
    setOpenSaveConfirmationSnackbar(true);
  }

  const handleSaveConfirmationSnackbarClose = () =>
    setOpenSaveConfirmationSnackbar(false);

  //Download Alert Modal//

  const [openDownloadAlertModal, setOpenDownloadAlertModal] = useState(false);
  function handleDownloadAlertModalOpen() {
    setOpenDownloadAlertModal(true);
  }

  const handleDownloadAlertModalClose = () => setOpenDownloadAlertModal(false);

  //Shared Modal Box Style//

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

  //QUOTE REQUEST SUBMIT FUNCTION//

  const onSubmit = (event) => {
    //When the user first clicks Create New Quote Request, quoteObject still has empty properties.
    //If this is the case, we don't add the corresponding Dashboard object to the Dashboard Object array,
    //becaues the user hasn't yet entered any carrier data to accompany the quote request.
    //For all future cases, we create a new Dashboard object from the previous quote request and table data,
    //and add it to the Dashboard Object array so that it may be searched or downloaded.

    console.log(event);

    if (quoteObject.quoteNumber !== "") {
      handleSaveQuoteRequest();
    }

    //create a new quote request object and add to db, return the new quote request id
    const newQuoteRequest = {
      sales_rep_id: localStorage.getItem("userId"),
      customer_id: event.customerId,
    };

    async function createNewQuoteRequest() {
      console.log("creating new quote request");
      try {
        const response = await fetch("http://localhost:5000/quote_requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuoteRequest),
        });
        const data = await response.json();
        console.log(data);
        console.log(data[0].id);
        setQuoteRequestId(data[0].id);
      } catch (error) {
        console.log(error);
      }
    }

    function addLaneStopsToDataBase(quote_request_id) {
      console.log(quote_request_id);
      let lane_stops = [];
      event.originCities.forEach((city) => {
        lane_stops.push({
          quote_request_id: quote_request_id,
          city_id: city.city_id,
          is_origin: city.is_origin,
        });
        console.log(lane_stops);
      });

      event.destinationCities.forEach((city) => {
        lane_stops.push({
          quote_request_id: quote_request_id,
          city_id: city.city_id,
          is_origin: city.is_origin,
        });
      });

      lane_stops.forEach((lane_stop) => {
        commitLaneStops(lane_stop);
        lane_stops = [];
      });
    }

    async function commitLaneStops(lane_stops) {
      try {
        const response = await fetch("http://localhost:5000/lane_stops", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lane_stops),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    createNewQuoteRequest();
    addLaneStopsToDataBase(quoteRequestId);

    //this increments the quoteNumber state so that the next quote request will have a unique quote number
    setQuoteNumber(quoteNumber + 1);

    //this takes the user input from the dialog form and defines the object that will be passed to the QuoteCard component
    let newQuoteObject = {
      quoteNumber: quoteNumber,
      quoteDate: new Date().toDateString(),
      customerName: event.customerCompanyName,
      origin: event.originCities[0].city_id,
      destination: event.destinationCities[0].city_id,
      equipmentType: event.equipmentType,
      weight: event.totalPalletWeight,
      numberOfPallets: event.numPallets,
      dimensions: JSON.stringify(event.dimensions),
      numberOfFeet: event.linearFeet,
    };

    //this sets the quoteObject state to the newQuoteObject and so re-renders the quote card component with the updated quoteObject
    setQuoteObject(newQuoteObject);

    //this sets the quoteRequestDefined state to true so that the carriertable component will render
    setQuoteRequestDefined(true);

    //this creates a fornmatted quote request object that will be compatible with the search bar
    let formattedQuoteRequest = formatQuoteRequest(newQuoteObject);

    //this is an array of formatted quoteRequest objects that will be
    //1. passed to the search bar component so they may be displayed in the search bar
    //2. formatted for download as a txt file

    setFormattedQuoteRequestArray((state) => [...state, formattedQuoteRequest]);

    //these functions reset the dialog form, pass an empty array to the table to clear it, and close the quote request dialog

    reset();
    setTableData([]);
    handleQuoteRequestClose();
  };

  return (
    <div>
      <Snackbar
        open={openSaveConfirmationSnackbar}
        autoHideDuration={3000}
        onClose={handleSaveConfirmationSnackbarClose}
      >
        <Alert
          onClose={handleSaveConfirmationSnackbarClose}
          elevation={6}
          severity="success"
          sx={{ width: "100%" }}
        >
          Quote Request Saved!
        </Alert>
      </Snackbar>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={logout}>
          logout
        </Button>
        <Button variant="outlined" onClick={handleCustomerDialogOpen}>
          Customers
        </Button>
        <Button variant="outlined" onClick={handleCarrierDialogOpen}>
          Carriers
        </Button>
        <Button variant="outlined" onClick={handleQuoteRequestOpen}>
          Create New Quote Request
        </Button>
        <Button variant="outlined" onClick={handleSaveQuoteRequest}>
          Save Quote Request
        </Button>
        <Button variant="outlined" onClick={downloadTxtFile}>
          Download Quote Requests
        </Button>
      </CardActions>
      <Modal
        open={openDownloadAlertModal}
        onClose={handleDownloadAlertModalClose}
      >
        <Box sx={modalBoxStyle}>
          <Alert severity="info">
            You must first define a quote request before downloading quote
            requests. Click 'Create New Quote Request' to get started. If you
            have entered a quote request, please click 'Save Quote Request' to
            save it.
          </Alert>
        </Box>
      </Modal>
      <Modal open={openSaveAlertModal} onClose={handleSaveAlertModalClose}>
        <Box sx={modalBoxStyle}>
          <Alert severity="info">
            You must first define a quote request before saving a quote request.
            Click 'Create New Quote Request' to get started.
          </Alert>
        </Box>
      </Modal>

      <>
        <QuoteRequestComponent
          handleQuoteRequestClose={handleQuoteRequestClose}
          quoteRequestDialogOpen={quoteRequestDialogOpen}
          setQuoteRequestOpen={setQuoteRequestOpen}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      </>
      <>
        <CustomerDialog
          handleCustomerDialogClose={handleCustomerDialogClose}
          customerDialogOpen={customerDialogOpen}
          onSubmit={onSubmit}
        />
        <CarrierDialog
          handleCarrierDialogClose={handleCarrierDialogClose}
          carrierDialogOpen={carrierDialogOpen}
          onSubmit={onSubmit}
          carriers={carriers}
          setCarriers={setCarriers}
        />
      </>
      <SearchBar
        updateDashboard={updateDashBoard}
        dashBoardObjectArray={dashBoardObjectArray}
        formattedQuoteRequestArray={formattedQuoteRequestArray}
      />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QuoteCard
          {...quoteObject}
          handleQuoteRequestOpen={handleQuoteRequestOpen}
        />
      </div>
      <br />
      <br />
      <br />
      <CarrierTable
        tableData={tableData}
        setTableData={setTableData}
        quoteRequestDefined={quoteRequestDefined}
      />
    </div>
  );
}
