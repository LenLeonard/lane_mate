import * as React from "react";
import CustomerQuoteDialog from "./CustomerQuoteDialog";
import { useState } from "react";
import LaneQuoteDialog from "./LaneQuoteDialog";
import LoadQuoteDialog from "./LoadQuoteDialog";

import { useEffect } from "react";

export default function QuoteRequestDialog({
  handleQuoteRequestClose,
  quoteRequestDialogOpen,
  setQuoteRequestOpen,
  onSubmit,
  handleSubmit,
}) {
  const [quoteRequestObject, setQuoteRequestObject] = useState({});
  const [cities, setCities] = useState([]);

  async function getCities() {
    try {
      const response = await fetch("http://localhost:5000/cities");
      const jsonData = await response.json();

      setCities(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  function getFormData(e) {
    setQuoteRequestObject((prevState) => {
      // Object.assign would also work
      return { ...prevState, ...e };
    });
  }

  const [customerQuoteDialogOpen, setCustomerQuoteDialogOpen] = useState(false);

  const handleCustomerQuoteDialogOpen = () => {
    setCustomerQuoteDialogOpen(true);
  };

  const handleCustomerQuoteDialogClose = () => {
    setCustomerQuoteDialogOpen(false);
    setQuoteRequestOpen(false);
  };

  const [laneQuoteDialogOpen, setLaneQuoteDialogOpen] = useState(false);

  const handleLaneQuoteDialogOpen = () => {
    setLaneQuoteDialogOpen(true);
  };

  const handleLaneQuoteDialogClose = () => {
    setLaneQuoteDialogOpen(false);
  };

  const [loadQuoteDialogOpen, setLoadQuoteDialogOpen] = useState(false);

  const handleLoadQuoteDialogOpen = () => {
    setLoadQuoteDialogOpen(true);
  };

  const handleLoadQuoteDialogClose = () => {
    setLoadQuoteDialogOpen(false);
  };

  const handleSubmitLoadQuoteDialogClose = () => {
    setLoadQuoteDialogOpen(false);
    formatQuoteRequest(quoteRequestObject, cities);
    setQuoteRequestObject({});
  };

  function CustomerQuoteDialogNext() {
    handleCustomerQuoteDialogClose();
    handleLaneQuoteDialogOpen();
  }

  function LaneQuoteDialogNext() {
    handleLaneQuoteDialogClose();
    handleLoadQuoteDialogOpen();
  }

  function LaneQuoteDialogBack() {
    handleLaneQuoteDialogClose();
    handleCustomerQuoteDialogOpen();
  }

  function LoadQuoteDialogBack() {
    handleLoadQuoteDialogClose();
    handleLaneQuoteDialogOpen();
  }

  function formatQuoteRequest(rawQuoteRequestData, cities) {
    console.log(rawQuoteRequestData);
    const NUM_QUOTE_REQUEST_FIELDS = 5;
    const NUMBER_OF_DISTICT_HANDLING_UNITS =
      Object.keys(rawQuoteRequestData).length - NUM_QUOTE_REQUEST_FIELDS;
    //Determine number of handling units
    const countHandlingUnits = () => {
      let totalHandlingUnits = 0;
      for (let i = 1; i < NUMBER_OF_DISTICT_HANDLING_UNITS; i++) {
        totalHandlingUnits += parseInt(rawQuoteRequestData[i].quantity);
      }
      return totalHandlingUnits;
    };
    let totalHandlingUnits = countHandlingUnits();
    // Get customer name from DB based on customer id

    //Get city name and province_state from cities array by city id
    const getCityName = (city_id) => {
      const city = cities.find((city) => city.id === city_id);
      return city.name + ", " + city.state_province_name;
    };

    //Get weight in lbs per distinct handling unit entry
    const getWeight = (handling_unit) => {
      const weight =
        parseInt(handling_unit.weight) * parseInt(handling_unit.quantity);
      return weight;
    };

    //Get total weight for all distinct handling unit entries combined
    const getTotalWeight = () => {
      let totalWeight = 0;
      for (let i = 1; i < NUMBER_OF_DISTICT_HANDLING_UNITS; i++) {
        totalWeight += getWeight(rawQuoteRequestData.loadData[i]);
      }
      return totalWeight;
    };

    //Get dimensions in inches per distinct handling unit entry
    const getDimensions = (handling_unit) => {
      const dimensions = {
        length: parseInt(handling_unit.length),
        width: parseInt(handling_unit.width),
        height: parseInt(handling_unit.height),
      };
      return dimensions;
    };

    //Derive number of feet of Palletized freight
    const getPalletizedFeet = () => {
      let totalPallets = parseInt(rawQuoteRequestData[1].quantity);
      let palletLength = parseInt(rawQuoteRequestData[1].length);

      let linearFeet = (totalPallets / 2) * palletLength * 12;
      return linearFeet;
    };

    console.log(rawQuoteRequestData.customerId);
    console.log(rawQuoteRequestData.customerCompanyName);

    console.log(rawQuoteRequestData.equipmentData[0].equipment_type);

    const numPallets = parseInt(rawQuoteRequestData.loadData[0].quantity);
    const weightPerPallet = parseInt(rawQuoteRequestData.loadData[0].weight);
    const palletLength = parseInt(rawQuoteRequestData.loadData[0].length);
    const palletWidth = parseInt(rawQuoteRequestData.loadData[0].width);
    const palletHeight = parseInt(rawQuoteRequestData.loadData[0].height);
    const totalPalletWeight = numPallets * weightPerPallet;
    const linearFeet = ((numPallets / 2) * palletLength) / 12;

    const formattedQuoteRequest = {
      customerId: rawQuoteRequestData.customerId,
      customerCompanyName: rawQuoteRequestData.customerCompanyName,
      originCities: rawQuoteRequestData.origins,
      destinationCities: rawQuoteRequestData.destinations,
      equipmentType: rawQuoteRequestData.equipmentData[0].equipment_type,
      numPallets: numPallets,
      weightPerPallet: weightPerPallet,
      dimensions: {
        length: palletLength,
        width: palletWidth,
        height: palletHeight,
      },
      totalPalletWeight: totalPalletWeight,
      linearFeet: linearFeet,
    };
    console.log(formattedQuoteRequest);

    //make entry in lane_stop and lanes table

    handleSubmit(onSubmit(formattedQuoteRequest));
  }

  return (
    <>
      <p>{JSON.stringify(quoteRequestObject)} </p>
      <CustomerQuoteDialog
        handleCustomerQuoteDialogClose={handleCustomerQuoteDialogClose}
        customerQuoteDialogOpen={
          quoteRequestDialogOpen || customerQuoteDialogOpen
        }
        next={CustomerQuoteDialogNext}
        getFormData={getFormData}
      />
      <LaneQuoteDialog
        handleLaneQuoteDialogClose={handleLaneQuoteDialogClose}
        handleLaneQuoteDialogOpen={handleLaneQuoteDialogOpen}
        laneQuoteDialogOpen={laneQuoteDialogOpen}
        cities={cities}
        next={LaneQuoteDialogNext}
        prev={LaneQuoteDialogBack}
        getFormData={getFormData}
      />
      <LoadQuoteDialog
        handleLoadQuoteDialogClose={handleLoadQuoteDialogClose}
        handleLoadQuoteDialogOpen={handleLoadQuoteDialogOpen}
        loadQuoteDialogOpen={loadQuoteDialogOpen}
        prev={LoadQuoteDialogBack}
        getFormData={getFormData}
        handleSubmitLoadQuoteDialogClose={handleSubmitLoadQuoteDialogClose}
      />
    </>
  );
}
