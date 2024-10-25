// RoomDashboard.js
import React, { useEffect, useState } from "react";
import RoomForm from "./RoomForm";
import RoomTable from "./RoomTable";
import "./Room.css";

const RoomDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [hotelIds, setHotelIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchRooms();
    fetchHotelIds();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("/rooms");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchHotelIds = async () => {
    try {
      const response = await fetch("/hotel_ids");
      const data = await response.json();
      setHotelIds(data.map((hotel) => hotel.hotel_id));
    } catch (error) {
      console.error("Error fetching hotel ids:", error);
    }
  };

  const handleAddRoom = async (roomData) => {
    try {
      const response = await fetch("/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });
      if (response.ok) {
        fetchRooms();
        setSuccessMessage("Room successfully added");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error("Failed to add room");
      }
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleUpdateRoom = async (
    roomNumber,
    floorNumber,
    hotelID,
    roomData
  ) => {
    try {
      const response = await fetch(
        `/rooms/${roomNumber}/${floorNumber}/${hotelID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roomData),
        }
      );
      if (response.ok) {
        fetchRooms();
        setSuccessMessage("Room successfully updated");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleDeleteRoom = async (roomNumber, floorNumber, hotelID) => {
    try {
      const response = await fetch(
        `/rooms/${roomNumber}/${floorNumber}/${hotelID}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchRooms();
        setSuccessMessage("Room successfully deleted");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="room-dashboard">
      <h1>Manage Rooms</h1>
      <RoomForm onAddRoom={handleAddRoom} hotelIds={hotelIds} />
      <RoomTable
        rooms={rooms}
        onDeleteRoom={handleDeleteRoom}
        onUpdateRoom={handleUpdateRoom}
      />
      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default RoomDashboard;
