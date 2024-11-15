import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import HotelDashboard from "./Components/Hotel/HotelDashboard";
import RoomDashboard from "./Components/Room/RoomDashboard";
import BookingDashboard from "./Components/Booking/BookingDashboard";
import LandingPage from "./Views/LandingPage";
import NavBar from "./Components/Navbar/Navbar";
import Footer from "./DevComponents/Footer/Footer";
import "./App.css";
import CustomerDashboard from "./Components/Customer/CustomerDashboard";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";

const AuthCallback = () => {
  const { isAuthenticated, user } = useKindeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User authenticated:", user);
      navigate("/");
    }
  }, [isAuthenticated, user]);

  return <div>Loading...</div>;
};

const App = () => {
  const [role, setRole] = useState("Customer");
  const { isAuthenticated, user } = useKindeAuth();

  const checkUserRole = async (userEmail) => {
    try {
      const response = await fetch(`/users/role/${userEmail}`);
      const data = await response.json();

      const userRole = data.role;

      if (userRole === "employee") {
        setRole("Employee");
      } else if (userRole === "manager") {
        setRole("Manager");
      } else {
        setRole("Customer");
      }
    } catch (error) {
      console.error("Error determining user role:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User authenticated:", user);
      checkUserRole(user.email);
      console.log("User role:", role);
    }
  }, [isAuthenticated, user]);

  return (
    <Router>
      <div className="app">
        <NavBar role={role} />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route
              path="/customers"
              element={
                <ProtectedRoute
                  allowedRoles={["Customer", "Manager", "Employee"]}
                  userRole={role}
                >
                  <CustomerDashboard userRole={role} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <ProtectedRoute
                  allowedRoles={["Employee", "Manager"]}
                  userRole={role}
                >
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hotels"
              element={
                <ProtectedRoute allowedRoles={["Manager"]} userRole={role}>
                  <HotelDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rooms"
              element={
                <ProtectedRoute
                  allowedRoles={["Manager", "Employee"]}
                  userRole={role}
                >
                  <RoomDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute
                  allowedRoles={["Manager", "Employee", "Customer"]}
                  userRole={role}
                >
                  <BookingDashboard userRole={role} />
                </ProtectedRoute>
              }
            />
            <Route path="/kinde_callback" element={<AuthCallback />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
        <Footer company="HOTELHOMIES" />
      </div>
    </Router>
  );
};

export default App;
