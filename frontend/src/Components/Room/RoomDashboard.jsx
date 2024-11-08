// RoomDashboard.js
import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import "./Room.css";

const RoomDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [hotelIds, setHotelIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const formConfig = [
    {
      label: "Room Number",
      id: "roomNumber",
      type: "text",
      placeholder: "Enter room number",
      required: true,
    },
    {
      label: "Floor Number",
      id: "floorNumber",
      type: "text",
      placeholder: "Enter floor number",
      required: true,
    },
    {
      label: "Hotel ID",
      id: "hotelID",
      type: "select",
      options: hotelIds.map((hotel) => ({
        label: hotel,
        value: hotel,
      })),
      required: true,
    },
    {
      label: "Amenities",
      id: "amenities",
      type: "text",
      placeholder: "Enter amenities (comma-separated)",
    },
    {
      label: "View Type",
      id: "viewType",
      type: "select",
      options: [
        { label: "City", value: "City" },
        { label: "Mountain", value: "Mountain" },
        { label: "Sea", value: "Sea" },
        { label: "Garden", value: "Garden" },
      ],
      required: true,
    },
    {
      label: "Price",
      id: "price",
      type: "number",
      placeholder: "Enter room price",
      required: true,
    },
    {
      label: "Capacity",
      id: "capacity",
      type: "select",
      options: [
        { value: "Single", label: "Single" },
        { value: "Double", label: "Double" },
        { value: "Suite", label: "Suite" },
        { value: "Penthouse", label: "Penthouse" },
      ],
      required: true,
    },
    {
      label: "Can Be Extended",
      id: "canBeExtended",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      required: true,
    },
    {
      label: "Comments",
      id: "stringComment",
      type: "textarea",
    },
    {
      label: "Is Renting",
      id: "isRenting",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      required: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchRooms(), fetchHotelIds()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
      const response = await fetch("/hotels");
      const data = await response.json();
      setHotelIds(data.map((hotel) => hotel.id));
    } catch (error) {
      console.error("Error fetching hotel ids:", error);
    }
  };

  const handleAddRoom = async (roomData) => {
    // Find the maximum existing id
    const maxid = rooms.length > 0 ? Math.max(...rooms.map(room => room.id)) : 0;
    roomData.id = maxid + 1; // Assign a new unique id based on the highest current id
  
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
  

  const handleUpdateRoom = async (id, roomData) => {
    try {
      const response = await fetch(`/rooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });
      if (response.ok) {
        fetchRooms();
        setSuccessMessage("Room successfully updated");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      const response = await fetch(`/rooms/${id}`, {
        method: "DELETE",
      });
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
    <div className="dashboard">
      <h1>Manage Rooms</h1>
      <div className="dashboard-main">
        <ReusableForm
          formConfig={formConfig}
          onSubmit={handleAddRoom}
          title="Add a Room"
        />
        
        <div className="room-table">
          <h2>Room List</h2>
          <table>
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Room Number</th>
                <th>Floor Number</th>
                <th>Hotel ID</th>
                <th>Amenities</th>
                <th>View Type</th>
                <th>Price</th>
                <th>Capacity</th>
                <th>Can Be Extended</th>
                <th>Comments</th>
                <th>Is Renting</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.floorNumber}</td>
                  <td>{room.hotelID}</td>
                  <td>{Array.isArray(room.amenities) ? room.amenities.join(", ") : room.amenities}</td>
                  <td>{room.viewType}</td>
                  <td>{room.price}</td>
                  <td>{room.capacity}</td>
                  <td>{room.canBeExtended ? "Yes" : "No"}</td>
                  <td>{room.stringComment}</td>
                  <td>{room.isRenting ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => handleUpdateRoom(room.id, room)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {successMessage && <div className="alert success-alert">{successMessage}</div>}
    </div>
  );
};

export default RoomDashboard;
