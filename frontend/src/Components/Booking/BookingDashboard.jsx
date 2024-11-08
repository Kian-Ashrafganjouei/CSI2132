import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import Input from "../../DevComponents/Input/Input";
import "./Booking.css";

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [hotelIds, setHotelIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const formConfig = [
    {
      label: "Customer Name",
      id: "customerName",
      type: "text",
      placeholder: "Enter customer name",
      required: true,
    },
    {
      label: "Email Address",
      id: "emailAddress",
      type: "email",
      placeholder: "Enter email address",
      required: true,
    },
    {
      label: "Phone Number",
      id: "phoneNumber",
      type: "tel",
      placeholder: "Enter phone number",
      required: true,
    },
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
    { label: "Start Date", id: "startDate", type: "date", required: true },
    { label: "End Date", id: "endDate", type: "date", required: true },
  ];

  useEffect(() => {
    fetchData();
    // Retrieve user role from localStorage
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      setUserRole(authData.role);
    }
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchBookings(), fetchHotelIds()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch("/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
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

  const handleAddBooking = async (formData) => {
    // Calculate new booking ID based on max existing ID
    const maxId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) : 0;
    formData.id = maxId + 1;

    try {
      const response = await fetch("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchBookings();
        setSuccessMessage("Booking successfully added");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const response = await fetch(`/bookings/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setBookings(bookings.filter((booking) => booking.id !== id));
        setSuccessMessage("Booking successfully removed");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Manage Bookings</h1>

      <div className="dashboard-main">
        <ReusableForm
          formConfig={formConfig}
          title="Add An Immediate Booking"
          onSubmit={handleAddBooking}
        />

        {/* Show the booking table only if the user is an admin */}
        {userRole === "admin" && (
          <div className="booking-table">
            <h2>Booking List</h2>
            {loading ? (
              <p>Loading bookings...</p>
            ) : (
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
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.startDate}</td>
                      <td>{booking.endDate}</td>
                      <td>{booking.customerName}</td>
                      <td>{booking.emailAddress}</td>
                      <td>{booking.phoneNumber}</td>
                      <td>{booking.roomNumber}</td>
                      <td>{booking.floorNumber}</td>
                      <td>{booking.hotelID}</td>
                      <td>
                        <button onClick={() => handleDeleteBooking(booking.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {successMessage && <div className="alert success-alert">{successMessage}</div>}
    </div>
  );
};

export default BookingDashboard;
