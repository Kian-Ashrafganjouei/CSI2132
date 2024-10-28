// HotelDashboard.js
import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import ReusableTable from "../../DevComponents/ReusableTable/ReusableTable";
import { AggregatedCapacity } from "../../Utils/Utils";
import "./Hotel.css";

const tableColumns = [
  { header: "Hotel ID", accessor: "hotel_id" },
  { header: "Hotel Chain", accessor: "chain_name" },
  { header: "Category (Stars)", accessor: "category" },
  { header: "Number of Rooms", accessor: "number_of_rooms" },
  { header: "Street Name", accessor: "streetName" },
  { header: "Street Number", accessor: "streetNumber" },
  { header: "Postal Code", accessor: "postalCode" },
  { header: "City", accessor: "cityName" },
  { header: "Country", accessor: "countryName" },
];

const HotelDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [hotelChains, setHotelChains] = useState([]);
  const [aggregatedCapacity, setAggregatedCapacity] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formConfig = [
    {
      label: "Hotel Chain",
      accessor: "chain_name",
      type: "select",
      options: hotelChains.map((chain) => ({
        label: chain.chain_name,
        value: chain.chain_name,
      })),
    },
    {
      label: "Category (1-5)",
      accessor: "category",
      type: "select",
      options: Array.from({ length: 5 }, (_, i) => ({
        label: i + 1,
        value: i + 1,
      })),
    },
    { label: "Number of Rooms", accessor: "numberOfRooms", type: "number" },
    { label: "Street Name", accessor: "streetName", type: "text" },
    { label: "Street Number", accessor: "streetNumber", type: "text" },
    { label: "Postal Code", accessor: "postalCode", type: "text" },
    { label: "Unit Number", accessor: "unitNumber", type: "text" },
    { label: "City", accessor: "cityName", type: "text" },
    { label: "Country", accessor: "countryName", type: "text" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (url, setter) => {
    setLoading(true); // Start spinner before fetching
    try {
      await Promise.all([
        fetchHotels(),
        fetchHotelChains(),
        fetchAggregatedCapacity(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop spinner after fetching
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch("/hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchHotelChains = async () => {
    try {
      const response = await fetch("/hotel_chains");
      const data = await response.json();
      setHotelChains(data);
    } catch (error) {
      console.error("Error fetching hotel chains:", error);
    }
  };

  const fetchAggregatedCapacity = async () => {
    try {
      const response = await fetch("/hotels");
      const data = await response.json();
      setAggregatedCapacity(data.sort((a, b) => a.hotel_id - b.hotel_id));
      console.log(data);
    } catch (error) {
      console.error("Error fetching aggregated capacity:", error);
    }
  };

  const handleAddHotel = async (hotelData) => {
    try {
      const response = await fetch("/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelData),
      });
      if (response.ok) {
        fetchHotels();
        setSuccessMessage("Hotel successfully added");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  const handleUpdateHotel = async (hotelId, hotelData) => {
    try {
      const response = await fetch(`/hotels/${hotelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelData),
      });
      if (response.ok) {
        fetchHotels();
        setSuccessMessage("Hotel successfully updated");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      const response = await fetch(`/hotels/${hotelId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchHotels();
        setSuccessMessage("Hotel successfully deleted");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="hotel-dashboard">
      <h1>Manage Hotels</h1>
      <div className="dashboard-main">
        <ReusableForm
          formConfig={formConfig}
          onSubmit={handleAddHotel}
          title="Add A Hotel"
        />
        <ReusableTable
          columns={tableColumns}
          data={hotels}
          actions={{ onEdit: handleUpdateHotel, onDelete: handleDeleteHotel }}
          loading={loading}
          title="Hotel List"
        />
      </div>

      <AggregatedCapacity capacityData={aggregatedCapacity} />
      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default HotelDashboard;
