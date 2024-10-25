// RoomForm.js
import React, { useState } from "react";

const RoomForm = ({ onAddRoom, hotelIds }) => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    floorNumber: "",
    hotelID: "",
    amenities: "",
    viewType: "Mountain",
    price: "",
    capacity: "single",
    canBeExtended: "false",
    stringComment: "",
    isRenting: "false",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      ...formData,
      amenities: formData.amenities.split(", "),
    };
    onAddRoom(roomData);
    setFormData({
      roomNumber: "",
      floorNumber: "",
      hotelID: "",
      amenities: "",
      viewType: "Mountain",
      price: "",
      capacity: "single",
      canBeExtended: "false",
      stringComment: "",
      isRenting: "false",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="room-form">
      <h2>Add A Room</h2>
      <input
        id="roomNumber"
        placeholder="Room Number"
        value={formData.roomNumber}
        onChange={handleChange}
        required
      />
      <input
        id="floorNumber"
        placeholder="Floor Number"
        value={formData.floorNumber}
        onChange={handleChange}
        required
      />
      <select
        id="hotelID"
        value={formData.hotelID}
        onChange={handleChange}
        required
      >
        <option value="">Select Hotel ID</option>
        {hotelIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <input
        id="amenities"
        placeholder="Amenities (comma-separated)"
        value={formData.amenities}
        onChange={handleChange}
      />
      <select id="viewType" value={formData.viewType} onChange={handleChange}>
        <option value="Mountain">Mountain</option>
        <option value="Sea">Sea</option>
      </select>
      <input
        id="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <select id="capacity" value={formData.capacity} onChange={handleChange}>
        <option value="single">Single</option>
        <option value="double">Double</option>
        <option value="quad">Quad</option>
      </select>
      <select
        id="canBeExtended"
        value={formData.canBeExtended}
        onChange={handleChange}
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <textarea
        id="stringComment"
        placeholder="Enter a comment"
        value={formData.stringComment}
        onChange={handleChange}
      ></textarea>
      <select id="isRenting" value={formData.isRenting} onChange={handleChange}>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <button type="submit">Add Room</button>
    </form>
  );
};

export default RoomForm;
