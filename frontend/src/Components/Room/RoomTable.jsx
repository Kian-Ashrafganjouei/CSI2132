import React from "react";

const RoomTable = ({ rooms, onDeleteRoom, onUpdateRoom }) => {
  return (
    <div className="room-table">
      <h2>Existing Rooms</h2>
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
            <th>Comment</th>
            <th>Is Renting</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.roomId}</td>
              <td>{room.roomNumber}</td>
              <td>{room.floorNumber}</td>
              <td>{room.hotelID}</td>
              <td>{Array.isArray(room.amenities) ? room.amenities.join(", ") : room.amenities}</td>
              <td>{room.viewType}</td>
              <td>{room.price}</td>
              <td>{room.capacity}</td>
              <td>{room.canBeExtended ? "true" : "false"}</td>
              <td>{room.stringComment}</td>
              <td>{room.isRenting ? "true" : "false"}</td>
              <td>
                <button onClick={() => onDeleteRoom(room.roomId)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => onUpdateRoom(room.roomId, room)}>
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
