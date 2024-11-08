// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import HotelDashboard from "./Components/Hotel/HotelDashboard";
import RoomDashboard from "./Components/Room/RoomDashboard";
import BookingDashboard from "./Components/Booking/BookingDashboard";
import LandingPage from "./Views/LandingPage";
import NavBar from "./Components/Navbar/Navbar";
import Footer from "./DevComponents/Footer/Footer";
import "./App.css";
import CustomerDashboard from "./Components/Customer/CustomerDashboard";
import SignupPage from "./Components/signup/SignupPage";
import SignInPage from "./Components/signin/SignInPage";
import UserDashboard from "./Components/userdashboard/UserDashboard";

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
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/userdash" element={<UserDashboard />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
        <Footer company="HOTELHOMIES" />
      </div>
    </Router>
  );
};

export default App;
