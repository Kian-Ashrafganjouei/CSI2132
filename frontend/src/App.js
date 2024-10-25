// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import HotelDashboard from "./Components/Hotel/HotelDashboard";
import RoomDashboard from "./Components/Room/RoomDashboard";
import BookingDashboard from "./Components/Booking/BookingDashboard";
import LandingPage from "./Views/LandingPage";
import NavBar from "./Components/Navbar/Navbar";
import "./App.css";
import CustomerDashboard from "./Components/Customer/CustomerDashboard";

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/customers" element={<CustomerDashboard />} />
            <Route path="/employees" element={<EmployeeDashboard />} />
            <Route path="/hotels" element={<HotelDashboard />} />
            <Route path="/rooms" element={<RoomDashboard />} />
            <Route path="/bookings" element={<BookingDashboard />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
