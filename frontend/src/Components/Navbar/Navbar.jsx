// components/NavBar.js
import React from "react";
import "./Navbar.css";
import Login from "../Auth/Login";

import { Link } from "react-router-dom";

const NavBar = ({ role = "Customer" }) => {
  console.log("Role in Navbar:", role);
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/hotel.svg`}
            alt="HotelHub"
          />
        </Link>
        <h2 className="nav-company-title">
          H<span>H</span>
        </h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/customers">Customer Registration</Link>
        </li>
        <li hidden={role !== "Manager"}>
          <Link to="/employees">Manage Employees</Link>
        </li>
        <li hidden={role !== "Manager"}>
          <Link to="/hotels">Manage Hotels</Link>
        </li>
        <li hidden={role === "Customer"}>
          <Link to="/rooms">Manage Rooms</Link>
        </li>
        <li>
          <Link to="/bookings">Manage Bookings</Link>
        </li>
        <li>
          <Login role={role} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
