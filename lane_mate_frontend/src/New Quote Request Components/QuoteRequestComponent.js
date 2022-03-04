import * as React from "react";
import CustomerQuoteDialog from "./Quote Request Customer Dialog Components/CustomerQuoteDialog";
import { useState } from "react";
import LaneQuoteDialog from "./Quote Request Lane Dialog Components/LaneQuoteDialog";
import LoadQuoteDialog from "./Quote Request Load Dialog Components/LoadQuoteDialog";

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
    //pass back to Dashboard
    handleSubmit(onSubmit(quoteRequestObject));
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
