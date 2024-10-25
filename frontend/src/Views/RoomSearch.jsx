// components/RoomSearchResults.js
import React from "react";

const RoomSearchResults = ({ searchResults }) => {
  return (
    <div className="room-search-results">
      <h2>Search Results</h2>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Floor Number</th>
            <th>Hotel ID</th>
            <th>Hotel Num Of Rooms</th>
            <th>Hotel Category</th>
            <th>Chain Name</th>
            <th>Postal Code</th>
            <th>View Type</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((room) => (
            <tr key={`${room.roomnumber}-${room.hotelid}`}>
              <td>{room.roomnumber}</td>
              <td>{room.floornumber}</td>
              <td>{room.hotelid}</td>
              <td>{room.number_of_rooms}</td>
              <td>{room.category}</td>
              <td>{room.chain_name}</td>
              <td>{room.postalcode}</td>
              <td>{room.viewtype}</td>
              <td>{room.price}</td>
              <td>{room.capacity}</td>
              <td>
                <button
                  className="bookRoom"
                  onClick={() => alert(`Book room ${room.roomnumber}`)}
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomSearchResults;
