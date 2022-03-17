import Button from "@mui/material/Button";

import { useState } from "react";
import QuoteCard from "./Quote Request Display/QuoteCard";
import { CardActions } from "@mui/material";
import { useForm } from "react-hook-form";
import CarrierTable from "./Offer Table/CarrierTable";

import CarrierDialog from "./Carrier Dialog/CarrierDialog";
import QuoteRequestTableDialog from "./Quote Request Dialog/QuoteRequestTableDialog";
import CustomerDialog from "./Customer Dialog/CustomerDialog";
import QuoteRequestComponent from "./New Quote Request/QuoteRequestComponent";

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

    if (tokenExpiration < currentTime) {
      console.log("token expired");
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
  //update the token every 29 minutes
  setInterval(() => refreshToken(), 1000 * 60 * 14);
  //check the token every 31 minutes
  setInterval(() => checkToken(), 1000 * 60 * 16);

  const { reset, handleSubmit } = useForm();

  //LOAD UP CARRIERS
  const [carriers, setCarriers] = useState([]);

  //This function is used in the case where the user has entered a quote request and the corresponding carrier information,
  //but does not want to create another quote request. It allows the current quote request (state of the Dashboard) to be searched and downloaded
  //by adding it to the dashboardObjectArray.

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

  const [quoteRequestId, setQuoteRequestId] = useState("");

  const addNewCarriersFromOffers = () => {
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
        carrierName: offer.carrierName,
        phoneNumber: offer.phoneNumber,
        contactExt: offer.extension,
        contactEmail: offer.dispatchEmail,
        contactName: offer.contactName,
      };
      addCarrierToDatabase(carrier);
    });
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

  const [quoteRequestTableDialogOpen, setQuoteRequestTableDialogOpen] =
    useState(false);

  const handleQuoteRequestTableDialogOpen = () => {
    setQuoteRequestTableDialogOpen(true);
  };

  const handleQuoteRequestTableDialogClose = () => {
    setQuoteRequestTableDialogOpen(false);
  };

  //Customer dialog modal//

  const [carrierDialogOpen, setCarrierDialogOpen] = useState(false);

  const handleCarrierDialogOpen = () => {
    setCarrierDialogOpen(true);
  };

  const handleCarrierDialogClose = () => {
    setCarrierDialogOpen(false);
  };

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

    //create a new quote request object and add to db, return the new quote request id

    function addLaneStopsToDataBase(quoteRequestId) {
      console.log(quoteRequestId);
      let laneStops = [];
      event.origins.forEach((city) => {
        laneStops.push({
          quoteRequestId: quoteRequestId,
          cityId: city.cityId,
          isOrigin: city.isOrigin,
        });
      });

      event.destinations.forEach((city) => {
        laneStops.push({
          quoteRequestId: quoteRequestId,
          cityId: city.cityId,
          isOrigin: city.isOrigin,
        });
      });

      laneStops.forEach((laneStop) => {
        commitLaneStops(laneStop);
        laneStops = [];
      });
    }

    async function commitLaneStops(laneStop) {
      try {
        const response = await fetch("http://localhost:5000/laneStops", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Access Token"),
          },
          body: JSON.stringify(laneStop),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    function addHandlingUnitsToDataBase(quoteRequestId) {
      console.log(quoteRequestId);
      let handlingUnits = [];

      for (let i = 0; i < Object.keys(event.loadData).length; i++) {
        handlingUnits.push({
          quoteRequestId: quoteRequestId,
          type: event.loadData[i].type,
          weightLbs: event.loadData[i].weightLbs,
          lengthInches: event.loadData[i].lengthInches,
          widthInches: event.loadData[i].widthInches,
          heightInches: event.loadData[i].heightInches,
          quantity: event.loadData[i].quantity,
        });
      }

      handlingUnits.forEach((handlingUnit) => {
        commitHandlingUnits(handlingUnit);
        handlingUnits = [];
      });
    }

    async function commitHandlingUnits(handlingUnit) {
      console.log(handlingUnit);
      try {
        const response = await fetch("http://localhost:5000/handlingUnits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
          },
          body: JSON.stringify(handlingUnit),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    const newQuoteRequest = {
      salesRepId: localStorage.getItem("userId"),
      customerId: event.customerId,
      date: new Date().toLocaleDateString("en-CA"),
      equipmentType: event.equipmentData[0].equipmentType,
    };

    async function createNewQuoteRequest() {
      console.log("creating new quote request");
      try {
        const response = await fetch("http://localhost:5000/quoteRequests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Access Token"),
          },
          body: JSON.stringify(newQuoteRequest),
        });
        const data = await response.json();
        const addedLaneStops = await addLaneStopsToDataBase(data.id);
        const addedHandlingUnits = await addHandlingUnitsToDataBase(data.id);
        return data.id;
      } catch (error) {
        console.log(error);
      }
    }

    createNewQuoteRequest().then((quoteRequestId) => {
      console.log(quoteRequestId);
      let newQuoteObject = {
        quoteRequestId: quoteRequestId,
        quoteDate: new Date().toDateString(),
        customerName: event.customerCompanyName,
        destination: event.destinations,
        origin: event.origins,
        equipmentType: event.equipmentData[0].equipmentType,
        weight: totalWeight,
        handlingUnits: distinctHandlingUnits,
        dimensions: dimensions,
        quantities: quantities,
      };
      console.log(newQuoteObject);
      setQuoteObject(newQuoteObject);
      setQuoteRequestId(quoteRequestId);
    });

    //this takes the user input from the dialog form and defines the object that will be passed to the QuoteCard component

    const NUMBER_OF_HANDLING_UNIT_TYPES = Object.keys(event.loadData).length;
    console.log(NUMBER_OF_HANDLING_UNIT_TYPES);
    let totalWeight = 0;

    for (let i = 0; i < NUMBER_OF_HANDLING_UNIT_TYPES; i++) {
      let weightPerUnit = event.loadData[i].weightLbs;
      console.log(weightPerUnit);
      let numberOfUnits = event.loadData[i].quantity;
      console.log(numberOfUnits);
      totalWeight += weightPerUnit * numberOfUnits;
    }

    let dimensions = [];
    for (let i = 0; i < NUMBER_OF_HANDLING_UNIT_TYPES; i++) {
      dimensions.push({
        length: event.loadData[i].lengthInches,
        width: event.loadData[i].widthInches,
        height: event.loadData[i].heightInches,
      });
    }

    let quantities = [];
    for (let i = 0; i < NUMBER_OF_HANDLING_UNIT_TYPES; i++) {
      quantities.push({
        quantity: event.loadData[i].quantity,
      });
    }

    let distinctHandlingUnits = [];
    for (let i = 0; i < NUMBER_OF_HANDLING_UNIT_TYPES; i++) {
      distinctHandlingUnits.push({
        type: event.loadData[i].type,
      });
    }

    //this sets the quoteObject state to the newQuoteObject and so re-renders the quote card component with the updated quoteObject

    //this sets the quoteRequestDefined state to true so that the carriertable component will render
    setQuoteRequestDefined(true);

    //these functions reset the dialog form, pass an empty array to the table to clear it, and close the quote request dialog

    reset();
    setTableData([]);
    handleQuoteRequestClose();
  };

  return (
    <div>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={logout}>
          logout
        </Button>
        <Button variant="outlined" onClick={handleCustomerDialogOpen}>
          Customers
        </Button>
        <Button variant="outlined" onClick={handleQuoteRequestTableDialogOpen}>
          View Quote Requests
        </Button>
        <Button variant="outlined" onClick={handleCarrierDialogOpen}>
          Carriers
        </Button>
        <Button variant="outlined" onClick={handleQuoteRequestOpen}>
          Create New Quote Request
        </Button>
      </CardActions>

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
        <QuoteRequestTableDialog
          handleQuoteRequestTableDialogOpen={handleQuoteRequestTableDialogOpen}
          handleQuoteRequestTableDialogClose={
            handleQuoteRequestTableDialogClose
          }
          quoteRequestTableDialogOpen={quoteRequestTableDialogOpen}
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
        quoteRequestId={quoteRequestId}
      />
    </div>
  );
}
