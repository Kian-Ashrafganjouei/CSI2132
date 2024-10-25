// components/HotelRoomSearchForm.js
import React, { useState } from "react";

const HotelRoomSearchForm = ({ onSearch, hotelChains, postals }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    roomCapacity: "",
    area: "",
    hotelChain: "",
    hotelCategory: "",
    viewType: "",
    minRooms: "",
    maxRooms: "",
    minRoomPrice: "",
    maxRoomPrice: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.startDate) <= new Date()) {
      alert("Start date must be in the future.");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert("End date cannot be before start date.");
      return;
    }
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="hotel-room-search">
      <h1>Hotel Room Search</h1>
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={formData.startDate}
        onChange={handleChange}
      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={formData.endDate}
        onChange={handleChange}
      />
      <label htmlFor="roomCapacity">Room Capacity:</label>
      <select
        id="roomCapacity"
        value={formData.roomCapacity}
        onChange={handleChange}
      >
        <option value=""></option>
        <option value="Single">Single</option>
        <option value="Double">Double</option>
        <option value="Quad">Quad</option>
      </select>
      <label htmlFor="area">Postals:</label>
      <select id="area" value={formData.area} onChange={handleChange}>
        {postals.map((postal) => (
          <option key={postal.postalcode} value={postal.postalcode}>
            {postal.postalcode}
          </option>
        ))}
      </select>
      <label htmlFor="hotelChain">Hotel Chain:</label>
      <select
        id="hotelChain"
        value={formData.hotelChain}
        onChange={handleChange}
      >
        {hotelChains.map((chain) => (
          <option key={chain.chain_name} value={chain.chain_name}>
            {chain.chain_name}
          </option>
        ))}
      </select>
      <label htmlFor="hotelCategory">Hotel Category:</label>
      <select
        id="hotelCategory"
        value={formData.hotelCategory}
        onChange={handleChange}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star
          </option>
        ))}
      </select>
      <label htmlFor="viewType">View Type:</label>
      <select id="viewType" value={formData.viewType} onChange={handleChange}>
        <option value=""></option>
        <option value="Mountain">Mountain</option>
        <option value="Sea">Sea</option>
      </select>
      <label htmlFor="minRooms">Min Rooms:</label>
      <input
        type="number"
        id="minRooms"
        value={formData.minRooms}
        onChange={handleChange}
      />
      <label htmlFor="maxRooms">Max Rooms:</label>
      <input
        type="number"
        id="maxRooms"
        value={formData.maxRooms}
        onChange={handleChange}
      />
      <label htmlFor="minRoomPrice">Min Room Price:</label>
      <input
        type="number"
        id="minRoomPrice"
        value={formData.minRoomPrice}
        onChange={handleChange}
      />
      <label htmlFor="maxRoomPrice">Max Room Price:</label>
      <input
        type="number"
        id="maxRoomPrice"
        value={formData.maxRoomPrice}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default HotelRoomSearchForm;
