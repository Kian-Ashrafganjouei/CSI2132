// components/NavBar.js
import React from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={`${process.env.PUBLIC_URL}/assets/hotelhub.png`}
          alt="HotelHub"
        />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/customers">Customer Registration</Link>
        </li>
        <li>
          <Link to="/employees">Manage Employees</Link>
        </li>
        <li>
          <Link to="/hotels">Manage Hotels</Link>
        </li>
        <li>
          <Link to="/rooms">Manage Rooms</Link>
        </li>
        <li>
          <Link to="/bookings">Manage Bookings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
