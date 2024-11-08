// RoomDashboard.js
import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import ResuableTable from "../../DevComponents/ReusableTable/ReusableTable";
import Modal from "../../DevComponents/Modal/Modal";
import Button from "../../DevComponents/Button/Button";
import "./Room.css";

const tableColumns = [
  { header: "Room Number", accessor: "roomNumber" },
  { header: "Floor Number", accessor: "floorNumber" },
  { header: "Hotel ID", accessor: "hotelID" },
  {
    header: "Amenities",
    accessor: "amenities",
    transform: (value) => value.join(", "),
  },
  { header: "View Type", accessor: "viewType" },
  { header: "Price", accessor: "price" },
  { header: "Capacity", accessor: "capacity" },
  {
    header: "Can Be Extended",
    accessor: "canBeExtended",
    transform: (value) => (value ? "Yes" : "No"),
  },
  { header: "Comments", accessor: "stringComment" },
  {
    header: "Is Renting",
    accessor: "isRenting",
    transform: (value) => (value ? "Yes" : "No"),
  },
];

const RoomDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [hotelIds, setHotelIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

  const formConfig = [
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
    {
      label: "Amenities",
      id: "amenities",
      type: "text",
      placeholder: "Enter amenities (comma-separated)",
    },
    {
      label: "View Type",
      id: "viewType",
      type: "select",
      options: [
        {
          label: "City",
          value: "City",
        },
        {
          label: "Mountain",
          value: "Mountain",
        },
        {
          label: "Sea",
          value: "Sea",
        },
        {
          label: "Garden",
          value: "Garden",
        },
      ], // Customize as needed
      required: true,
    },
    {
      label: "Price",
      id: "price",
      type: "number",
      placeholder: "Enter room price",
      required: true,
    },
    {
      label: "Capacity",
      id: "capacity",
      type: "select",
      options: [
        {
          value: "Single",
          label: "Single",
        },
        {
          value: "Double",
          label: "Double",
        },
        {
          value: "Suite",
          label: "Suite",
        },
        {
          value: "Penthouse",
          label: "Penthouse",
        },
      ], // Customize as needed
      required: true,
    },
    {
      label: "Can Be Extended",
      id: "canBeExtended",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      required: true,
    },
    {
      label: "Comments",
      id: "stringComment",
      type: "textarea",
    },
    {
      label: "Is Renting",
      id: "isRenting",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      required: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      fetchRooms();
      fetchHotelIds();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch("/rooms");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchHotelIds = async () => {
    try {
      const response = await fetch("/hotels");
      const data = await response.json();
      setHotelIds(data.map((hotel) => hotel.chain_name + hotel.id));
      console.log("Hotel IDs:", hotelIds);
    } catch (error) {
      console.error("Error fetching hotel ids:", error);
    }
  };

  const handleAddRoom = async (roomData) => {
    roomData.id = roomData.roomNumber + roomData.floorNumber + roomData.hotelID;
    try {
      const response = await fetch("/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });
      if (response.ok) {
        setSuccessMessage("Room successfully added");
        setTimeout(() => setSuccessMessage(""), 3000);
        fetchRooms();
      } else {
        throw new Error("Failed to add room");
      }
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleUpdateRoom = async (
    roomNumber,
    floorNumber,
    hotelID,
    roomData
  ) => {
    try {
      const response = await fetch(
        `/rooms/${roomNumber}/${floorNumber}/${hotelID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roomData),
        }
      );
      if (response.ok) {
        fetchRooms();
        setSuccessMessage("Room successfully updated");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleDeleteRoom = async (room) => {
    try {
      const response = await fetch(`/rooms/${room.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchRooms();
        setSuccessMessage("Room successfully deleted");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>
        Manage Rooms{" "}
        <Button className="modal-button" onClick={() => setIsOpened(true)}>
          Add Renting
        </Button>
      </h1>
      <div className="dashboard-main">
        <ResuableTable
          columns={tableColumns}
          data={rooms}
          title="Room List"
          actions={{
            onDelete: handleDeleteRoom,
            onEdit: handleUpdateRoom,
          }}
        />

        <Modal isOpen={isOpened} onClose={() => setIsOpened(false)}>
          <ReusableForm
            formConfig={formConfig}
            onSubmit={handleAddRoom}
            title="Add a Room"
          />
        </Modal>
      </div>

      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default RoomDashboard;
