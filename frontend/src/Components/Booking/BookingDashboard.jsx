import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import ReusableTable from "../../DevComponents/ReusableTable/ReusableTable";
import Modal from "../../DevComponents/Modal/Modal";
import Input from "../../DevComponents/Input/Input";
import Button from "../../DevComponents/Button/Button";
import "./Booking.css";

const tableColumns = [
  { header: "Booking ID", accessor: "id" },
  { header: "Start Date", accessor: "startDate" },
  { header: "End Date", accessor: "endDate" },
  { header: "Customer Name", accessor: "customerName" },
  { header: "Email", accessor: "emailAddress" },
  { header: "Phone", accessor: "phoneNumber" },
  { header: "Room Number", accessor: "roomNumber" },
  { header: "Floor Number", accessor: "floorNumber" },
  { header: "Hotel ID", accessor: "hotelID" },
];

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [hotelIds, setHotelIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

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
      })), // Dynamically populated from state
      required: true,
    },
    { label: "Start Date", id: "startDate", type: "date", required: true },
    { label: "End Date", id: "endDate", type: "date", required: true },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      fetchBookings();
      fetchHotelIds();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setSelectedBooking(
        `${bookings[0]?.id}-${bookings[0]?.roomNumber}-${bookings[0]?.floorNumber}-${bookings[0]?.hotelID}`
      );
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch("/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching booking options:", error);
    }
  };

  const fetchHotelIds = async () => {
    try {
      const response = await fetch("/hotels");
      const data = await response.json();
      setHotelIds(data.map((hotel) => hotel.chain_name + hotel.id));
    } catch (error) {
      console.error("Error fetching hotel ids:", error);
    }
  };

  const handleAddRenting = async (formData) => {
    formData.id = bookings.length + 1;
    try {
      const response = await fetch("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage("Successfully Added Renting");
        setTimeout(() => setSuccessMessage(""), 3000);
        fetchBookings();
      }
    } catch (error) {
      console.error("Error adding renting:", error);
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

  const handleDeleteBooking = async (booking) => {
    const bookingId = booking.id;
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
    <div className="dashboard">
      <h1>
        Manage Bookings{" "}
        <Button className="modal-button" onClick={() => setIsOpened(true)}>
          Add Renting
        </Button>
      </h1>
      <div className="select-wrapper">
        <h1>Convert Renting / Not Renting</h1>

        <Input
          id={"bookingID"}
          value={selectedBooking}
          label={"Select a Booking"}
          type="select"
          options={bookings.map((booking) => ({
            label: `${booking.customerName} Booking ${booking.id} Room ${booking.roomNumber}, Floor ${booking.floorNumber}, Hotel ${booking.hotelID}`,
            value: `${booking.id}-${booking.roomNumber}-${booking.floorNumber}-${booking.hotelID}`,
          }))}
          onInputChange={(value) => setSelectedBooking(value)}
        />
        <button onClick={handleConvertBooking}>
          Convert Renting/Not Renting
        </button>
      </div>
      <div className="dashboard-main">
        <ReusableTable
          columns={tableColumns}
          data={bookings}
          actions={{ onEdit: () => {}, onDelete: handleDeleteBooking }}
          title="Booking List"
        />

        <Modal isOpen={isOpened} onClose={() => setIsOpened(false)}>
          <ReusableForm
            formConfig={formConfig}
            title="Add An Immediate Renting"
            onSubmit={handleAddRenting}
          />
        </Modal>
      </div>
      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default BookingDashboard;
