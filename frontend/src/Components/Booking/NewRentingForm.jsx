// NewRentingForm.js
import React, { useState } from "react";

const NewRentingForm = ({ fetchBookings }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    emailAddress: "",
    phoneNumber: "",
    cardNumber: "",
    idType: "",
    dateOfRegistration: "",
    streetName: "",
    streetNumber: "",
    postalCode: "",
    unitNumber: "",
    cityName: "",
    countryName: "",
    hotelID: "",
    roomNumber: "",
    floorNumber: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) fetchBookings();
    } catch (error) {
      console.error("Error adding new renting:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-booking-form">
      <h2>Add An Immediate Renting (walk-in customer)</h2>
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          id={key}
          placeholder={key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
          value={formData[key]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Create renting</button>
    </form>
  );
};

export default NewRentingForm;
