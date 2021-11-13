import React from "react";
import lanematelogo from "./assets/lanematelogo.png";

export default function Header() {
  return (
    <header className="header">
      <span>
        <img src={lanematelogo} alt="Lane Mate Logo" className="logo" />
      </span>

      <span className="header-text">
        <h1> lane_mate</h1>
        <h4> Lane quote management for freight brokerages.</h4>
      </span>
    </header>
  );
}
