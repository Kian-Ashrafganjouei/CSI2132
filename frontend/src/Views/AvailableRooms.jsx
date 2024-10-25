// components/AvailableRooms.js
import React, { useEffect, useState } from "react";

const AvailableRooms = () => {
  const [roomsByArea, setRoomsByArea] = useState([]);

  useEffect(() => {
    fetchAvailableRoomsPerArea();
  }, []);

  const fetchAvailableRoomsPerArea = async () => {
    try {
      const response = await fetch("/available_rooms_per_area");
      const data = await response.json();
      setRoomsByArea(data);
    } catch (error) {
      console.error("Error fetching available rooms per area:", error);
    }
  };

  return (
    <section className="available-rooms">
      <h2>Explore Available Rooms in Different Cities</h2>
      <div className="card-container">
        {roomsByArea.map((area) => (
          <div className="card" key={area.area}>
            <h3>{area.area}</h3>
            <p>Available Rooms: {area.available_rooms}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableRooms;
