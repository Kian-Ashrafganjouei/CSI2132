// HotelDashboard.js
import React, { useEffect, useState } from "react";
import HotelForm from "./HotelForm";
import HotelTable from "./HotelTable";
import { AggregatedCapacity } from "../../Utils/Utils";
import "./Hotel.css";

const HotelDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [hotelChains, setHotelChains] = useState([]);
  const [aggregatedCapacity, setAggregatedCapacity] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchHotels();
    fetchHotelChains();
    fetchAggregatedCapacity();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch("/hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchHotelChains = async () => {
    try {
      const response = await fetch("/hotel_chains");
      const data = await response.json();
      setHotelChains(data);
    } catch (error) {
      console.error("Error fetching hotel chains:", error);
    }
  };

  const fetchAggregatedCapacity = async () => {
    try {
      const response = await fetch("/hotel_aggregated_capacity");
      const data = await response.json();
      setAggregatedCapacity(data.sort((a, b) => a.hotel_id - b.hotel_id));
    } catch (error) {
      console.error("Error fetching aggregated capacity:", error);
    }
  };

  const handleAddHotel = async (hotelData) => {
    try {
      const response = await fetch("/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelData),
      });
      if (response.ok) {
        fetchHotels();
        setSuccessMessage("Hotel successfully added");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  const handleUpdateHotel = async (hotelId, hotelData) => {
    try {
      const response = await fetch(`/hotels/${hotelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelData),
      });
      if (response.ok) {
        fetchHotels();
        setSuccessMessage("Hotel successfully updated");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      const response = await fetch(`/hotels/${hotelId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchHotels();
        setSuccessMessage("Hotel successfully deleted");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="hotel-dashboard">
      <h1>Manage Hotels</h1>
      <HotelForm onAddHotel={handleAddHotel} hotelChains={hotelChains} />
      <HotelTable
        hotels={hotels}
        onDeleteHotel={handleDeleteHotel}
        onUpdateHotel={handleUpdateHotel}
      />
      <AggregatedCapacity capacityData={aggregatedCapacity} />
      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default HotelDashboard;
