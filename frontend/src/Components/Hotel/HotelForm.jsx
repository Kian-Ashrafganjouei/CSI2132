// HotelForm.js
import React, { useState } from "react";

const HotelForm = ({ onAddHotel, hotelChains }) => {
  const [formData, setFormData] = useState({
    chain_name: "",
    category: "1",
    numberOfRooms: "",
    streetName: "",
    streetNumber: "",
    postalCode: "",
    unitNumber: "",
    cityName: "",
    countryName: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHotel(formData);
    setFormData({
      chain_name: "",
      category: "1",
      numberOfRooms: "",
      streetName: "",
      streetNumber: "",
      postalCode: "",
      unitNumber: "",
      cityName: "",
      countryName: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="hotel-form">
      <h2>Add A Hotel</h2>
      <select
        id="chain_name"
        value={formData.chain_name}
        onChange={handleChange}
        required
      >
        <option value="">Select Hotel Chain</option>
        {hotelChains.map((chain) => (
          <option key={chain.chain_name} value={chain.chain_name}>
            {chain.chain_name}
          </option>
        ))}
      </select>
      <select
        id="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <input
        id="numberOfRooms"
        placeholder="Number of Rooms"
        value={formData.numberOfRooms}
        onChange={handleChange}
        required
      />
      <input
        id="streetName"
        placeholder="Street Name"
        value={formData.streetName}
        onChange={handleChange}
        required
      />
      <input
        id="streetNumber"
        placeholder="Street Number"
        value={formData.streetNumber}
        onChange={handleChange}
        required
      />
      <input
        id="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />
      <input
        id="unitNumber"
        placeholder="Unit Number"
        value={formData.unitNumber}
        onChange={handleChange}
      />
      <input
        id="cityName"
        placeholder="City Name"
        value={formData.cityName}
        onChange={handleChange}
        required
      />
      <input
        id="countryName"
        placeholder="Country Name"
        value={formData.countryName}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Hotel</button>
    </form>
  );
};

export default HotelForm;
