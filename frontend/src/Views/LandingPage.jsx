// LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to E-Hotels Management System</h1>
      <p>Manage all aspects of your hotel effortlessly.</p>
      <div className="section-links">
        <Link to="/customers" className="landing-link">
          Customer Registration
        </Link>
        <Link to="/employees" className="landing-link">
          Manage Employees
        </Link>
        <Link to="/hotels" className="landing-link">
          Manage Hotels
        </Link>
        <Link to="/rooms" className="landing-link">
          Manage Rooms
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
