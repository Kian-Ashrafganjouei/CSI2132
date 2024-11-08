import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // null, 'customer', or 'admin'
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      setIsAuthenticated(true);
      setUserRole(authData.role);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("authData");
    navigate("/");
    window.location.reload();
  };

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
        {isAuthenticated && userRole === "admin" && (
          <>
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
            <li>
              <Link to="/userdash">Users</Link>
            </li>
          </>
        )}

        {isAuthenticated && userRole === "customer" && (
          <>

          </>
        )}

        {/* Login/Logout/Signup buttons */}
        <li>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => navigate("/signin")} className="nav-button">
                Login
              </button>
              <button onClick={() => navigate("/signup")} className="nav-button">
                Signup
              </button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
