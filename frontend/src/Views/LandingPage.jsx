import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Button from "../DevComponents/Button/Button";

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleNavigation = () => {
    if (isAuthenticated) {
      navigate("/bookings");
    } else {
      navigate("/signin");
    }
    window.location.reload();
  };

  return (
    <div className="landing-page">
      <main className="main-content">
        <section className="hero">
          <div className="hero-svg">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 295.239 295.239"
              fill="#000000"
              width="600px"
              height="600px"
            >
              <style>
                {`
                  .fly { animation: fly 10s linear infinite; }
                  @keyframes fly {
                    0% { transform: translateX(-300px); }
                    100% { transform: translateX(400px); }
                  }
                  .cloud { animation: cloudMove 10s linear infinite; }
                  @keyframes cloudMove {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-200%); }
                  }
                  .wing { animation: wingFlap 2s ease-in-out infinite alternate; }
                  @keyframes wingFlap {
                    from { transform: rotate(-2deg); }
                    to { transform: rotate(2deg); }
                  }
                `}
              </style>
              <g id="SVGRepo_iconCarrier" className="airplane">
                <g>
                  <path
                    className="wing"
                    style={{ fill: "#ee8484" }}
                    d="M288.486,157.967c-16.652-8.329-35.3-12.729-53.919-12.729h-60.043l-53.967-38.095H74.219 l38.095,38.095H73.238l-42.857-38.095H2.195L21.062,149.6l-6.776,1.129v16.005l3.043,2.176 c21.933,15.667,47.776,23.948,74.729,23.948h10.733L67.948,227.7l4.867,3.214c1.519,1.005,2.952,2.162,4.257,3.438l1.39,1.362 h27.814l60.714-42.857h66.381c16.424,0,32.405-3.281,47.495-9.748l6.971-2.986c4.495-1.933,7.4-6.338,7.4-11.229 C295.238,164.238,292.652,160.052,288.486,157.967z"
                  ></path>
                </g>
                <g>
                  <path
                    className="cloud"
                    style={{ fill: "#fdfdfd" }}
                    d="M85.714,292.857H28.571C12.814,292.857,0,280.043,0,264.286c0-13.99,10.3-25.838,23.91-28.081 c6.695-11.952,19.452-19.538,33.233-19.538c18.105,0,33.61,12.805,37.257,30.257c9.048,3.529,15.124,12.214,15.124,22.124 C109.524,282.176,98.843,292.857,85.714,292.857z"
                  ></path>
                  <path
                    className="cloud"
                    style={{ fill: "#fdfdfd" }}
                    d="M261.905,97.619h-80.952c-18.376,0-33.333-14.957-33.333-33.333s14.957-33.333,33.333-33.333 c1.824,0,3.638,0.148,5.429,0.443c6.638-17.29,23.381-29.014,42.19-29.014c19.014,0,36.114,12.148,42.529,29.867 c14.143,4.048,24.138,17.09,24.138,32.038C295.238,82.662,280.281,97.619,261.905,97.619z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <span>
            <h2 className="company-title">
              HOTEL<span>HOMIES</span>
            </h2>
            <p>Experience the finest in hospitality.</p>
            <Button className="landing-button" onClick={handleNavigation}>
              {isAuthenticated ? "Book Now" : "Login to Book"}
            </Button>
          </span>
        </section>
        <section className="cards">
          <div className="card">
            <img
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
              alt="Luxurious Rooms"
            />
            <h3>Luxurious Rooms</h3>
            <p>Elegance and comfort await.</p>
          </div>
          <div className="card">
            <img
              src="https://media.istockphoto.com/id/636091908/photo/folded-white-towel-with-cermic-vase-on-glass-table.jpg?s=612x612&w=0&k=20&c=7eaRDW_GW62zbWbHeKbB7dba4sqoiudBs1pTkaR6XZA="
              alt="World-Class Amenities"
            />
            <h3>World-Class Amenities</h3>
            <p>Relax and indulge with premium services.</p>
          </div>
          <div className="card">
            <img
              src="https://www.marketforce.com/hubfs/AdobeStock_431743929.jpeg"
              alt="Customer Reviews"
            />
            <h3>Customer Reviews</h3>
            <p>Our guests love staying with us!</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
