import React from "react";
import lanematelogo from "./assets/lanematelogo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={lanematelogo} alt="lanemate logo" className="logo" />
        <h2>lane_mate</h2>
      </div>
    </header>
  );
}
