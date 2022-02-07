import { Fragment, useState } from "react";
import React from "react";
import ListCarriers from "./ListCarriers.js";

export default function CRUDCarrier() {
  // client side authentication

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
  checkToken();
  setInterval(() => refreshToken(), 1000 * 60 * 29);
  setInterval(() => checkToken(), 1000 * 60 * 30);

  //CARRIER TABLE POST REQUEST//
  const carrierTemplate = {
    name: "",
    phone: "",
    email: "",
    contact_name: "",
    mc_number: "",
    dot_number: "",
    address: "",
    city: "",
    state_province: "",
    postal_zip_code: "",
    country: "",
    is_blacklisted: false,
  };

  const [carrier, setCarrier] = useState({ ...carrierTemplate });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify(carrier);
      const response = await fetch("http://localhost:5000/carriers", {
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
      <h1>Input Carrier Info</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Carrier Name"
          onChange={(e) => setCarrier({ ...carrier, name: e.target.value })}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={(e) => setCarrier({ ...carrier, phone: e.target.value })}
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setCarrier({ ...carrier, email: e.target.value })}
        />

        <input
          type="text"
          name="contact_name"
          placeholder="Contact Name"
          onChange={(e) =>
            setCarrier({ ...carrier, contact_name: e.target.value })
          }
        />

        <input
          type="text"
          name="mc_number"
          placeholder="MC Number"
          onChange={(e) =>
            setCarrier({ ...carrier, mc_number: e.target.value })
          }
        />

        <input
          type="text"
          name="dot_number"
          placeholder="DOT Number"
          onChange={(e) =>
            setCarrier({ ...carrier, dot_number: e.target.value })
          }
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={(e) => setCarrier({ ...carrier, address: e.target.value })}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={(e) => setCarrier({ ...carrier, city: e.target.value })}
        />

        <input
          type="text"
          name="state_province"
          placeholder="State/Province"
          onChange={(e) =>
            setCarrier({ ...carrier, state_province: e.target.value })
          }
        />

        <input
          type="text"
          name="postal_zip_code"
          placeholder="Postal/Zip Code"
          onChange={(e) =>
            setCarrier({ ...carrier, postal_zip_code: e.target.value })
          }
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={(e) => setCarrier({ ...carrier, country: e.target.value })}
        />

        <input
          type="checkbox"
          name="is_blacklisted"
          id="is_blacklisted"
          placeholder="Is Blacklisted"
          onChange={(e) =>
            e.checked
              ? setCarrier({ ...carrier, is_blacklisted: true })
              : setCarrier({ ...carrier, is_blacklisted: false })
          }
        />

        <label htmlFor="is_blacklisted">Is Blacklisted</label>

        <button type="submit"> Submit </button>
      </form>

      <h1>Carrier Table</h1>
      <ListCarriers />
    </Fragment>
  );
}
