// BookingDashboard.js
import React, { useEffect, useState } from "react";
import NewRentingForm from "./NewRentingForm";
import BookingTable from "./BookingTable";
import "./Booking.css";

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching booking options:", error);
    }
  };

  const handleConvertBooking = async () => {
    const [bookingId, roomNumber, floorNumber, hotelID] =
      selectedBooking.split("-");
    const convertData = { roomNumber, floorNumber, hotelID };

    try {
      const response = await fetch("/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertData),
      });
      if (response.ok) {
        setSuccessMessage("Successfully Converted");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error converting:", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`/bookings/${bookingId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setBookings(
          bookings.filter((booking) => booking.bookingid !== bookingId)
        );
        setSuccessMessage("Booking successfully removed");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Convert Renting / Not Renting</h1>
      <div className="select-wrapper">
        <label>Select a Booking:</label>
        <select
          value={selectedBooking}
          onChange={(e) => setSelectedBooking(e.target.value)}
        >
          {bookings.map((booking) => (
            <option
              key={booking.bookingid}
              value={`${booking.bookingid}-${booking.roomnumber}-${booking.floornumber}-${booking.hotelid}`}
            >
              Booking {booking.bookingid} Room {booking.roomnumber}, Floor{" "}
              {booking.floornumber}, Hotel {booking.hotelid}
            </option>
          ))}
        </select>
        <button onClick={handleConvertBooking}>
          Convert Renting/Not Renting
        </button>
      </div>
      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
      <NewRentingForm fetchBookings={fetchBookings} />
      <BookingTable bookings={bookings} handleDelete={handleDeleteBooking} />
    </div>
  );
};

export default BookingDashboard;
