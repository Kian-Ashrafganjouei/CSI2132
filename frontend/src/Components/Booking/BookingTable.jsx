// BookingTable.js
import React from "react";

const BookingTable = ({ bookings, handleDelete }) => {
  return (
    <div className="booking-table">
      <h2>Existing Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Room Number</th>
            <th>Floor Number</th>
            <th>Hotel ID</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingid}>
              <td>{booking.bookingid}</td>
              <td>{booking.startdate}</td>
              <td>{booking.enddate}</td>
              <td>{booking.customername}</td>
              <td>{booking.emailaddress}</td>
              <td>{booking.phonenumber}</td>
              <td>{booking.roomnumber}</td>
              <td>{booking.floornumber}</td>
              <td>{booking.hotelid}</td>
              <td>
                <button onClick={() => handleDelete(booking.bookingid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
