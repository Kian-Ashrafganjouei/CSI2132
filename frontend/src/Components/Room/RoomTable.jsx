// RoomTable.js
import React from "react";

const RoomTable = ({ rooms, onDeleteRoom, onUpdateRoom }) => {
  return (
    <div className="room-table">
      <h2>Existing Rooms</h2>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Floor Number</th>
            <th>Hotel ID</th>
            <th>Amenities</th>
            <th>View Type</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Can Be Extended</th>
            <th>Comment</th>
            <th>Is Renting</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={`${room.roomnumber}-${room.floornumber}-${room.hotelid}`}>
              <td>{room.roomnumber}</td>
              <td>{room.floornumber}</td>
              <td>{room.hotelid}</td>
              <td>{room.amenities.join(", ")}</td>
              <td>{room.viewtype}</td>
              <td>{room.price}</td>
              <td>{room.capacity}</td>
              <td>{room.canbeextended ? "true" : "false"}</td>
              <td>{room.stringcomment}</td>
              <td>{room.isrenting ? "true" : "false"}</td>
              <td>
                <button
                  onClick={() =>
                    onDeleteRoom(
                      room.roomnumber,
                      room.floornumber,
                      room.hotelid
                    )
                  }
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    onUpdateRoom(
                      room.roomnumber,
                      room.floornumber,
                      room.hotelid,
                      room
                    )
                  }
                >
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

export default RoomTable;
