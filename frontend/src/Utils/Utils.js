// AggregatedCapacity.js
import React from "react";

export const AggregatedCapacity = ({ capacityData }) => {
  return (
    <div className="aggregated-capacity">
      <h2>Aggregated Capacity Per Hotel</h2>
      <div className="grid-container">
        {capacityData.map((hotel) => (
          <div className="grid-item" key={hotel.hotel_id}>
            <h2>{hotel.chain_name}</h2>
            <h3>Hotel ID: {hotel.id}</h3>
            <p>Total Capacity: {hotel.number_of_rooms}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
