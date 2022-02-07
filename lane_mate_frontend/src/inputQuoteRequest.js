import { Fragment, useState } from "react";
import React from "react";

export default function InputQuoteRequest() {
  const [quoteRequest, setQuoteRequest] = useState({
    sales_rep: "",
    customer: "",
    lane: "",
    load: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify(quoteRequest);
      const response = await fetch("http://localhost:3000/quoteRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1>Input Quote Request</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="sales_rep"
          placeholder="Sales Rep Name"
          onChange={(e) =>
            setQuoteRequest({ ...quoteRequest, sales_rep: e.target.value })
          }
        />
        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          onChange={(e) =>
            setQuoteRequest({ ...quoteRequest, customer: e.target.value })
          }
        />
        <input
          type="text"
          name="lane"
          placeholder="Lane"
          onChange={(e) =>
            setQuoteRequest({ ...quoteRequest, lane: e.target.value })
          }
        />
        <input
          type="text"
          name="load"
          placeholder="Load"
          onChange={(e) =>
            setQuoteRequest({ ...quoteRequest, load: e.target.value })
          }
        />
        <button type="submit"> Submit </button>
      </form>
      <p>{JSON.stringify(quoteRequest)}</p>
    </Fragment>
  );
}
