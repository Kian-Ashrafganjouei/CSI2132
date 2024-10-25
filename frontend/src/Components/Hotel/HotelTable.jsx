// HotelTable.js
import React from "react";

const HotelTable = ({ hotels, onDeleteHotel, onUpdateHotel }) => {
  return (
    <div className="hotel-table">
      <h2>Existing Hotels</h2>
      <table>
        <thead>
          <tr>
            <th>Hotel ID</th>
            <th>Hotel Chain</th>
            <th>Category (Stars)</th>
            <th>Number of Rooms</th>
            <th>Postal</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.hotel_id}>
              <td>{hotel.hotel_id}</td>
              <td>{hotel.chain_name}</td>
              <td>{hotel.category}</td>
              <td>{hotel.number_of_rooms}</td>
              <td>{hotel.postalcode}</td>
              <td>
                <button onClick={() => onDeleteHotel(hotel.hotel_id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => onUpdateHotel(hotel.hotel_id, hotel)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelTable;
