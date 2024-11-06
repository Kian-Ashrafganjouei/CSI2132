// HotelDashboard.js
import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import ReusableTable from "../../DevComponents/ReusableTable/ReusableTable";
import { AggregatedCapacity } from "../../Utils/Utils";
import "./Hotel.css";

const tableColumns = [
  { header: "Hotel ID", accessor: "id" },
  { header: "Hotel Chain", accessor: "chain_name" },
  { header: "Category (Stars)", accessor: "category" },
  { header: "Number of Rooms", accessor: "number_of_rooms" },
  { header: "Street Name", accessor: "street_name" },
  { header: "Street Number", accessor: "street_number" },
  { header: "Postal Code", accessor: "postal_code" },
  { header: "City", accessor: "city" },
  { header: "Country", accessor: "country" },
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
      id: "chain_name",
      accessor: "chain_name",
      type: "select",
      options: hotelChains.map((chain) => ({
        label: chain.chain_name,
        value: chain.chain_name,
      })),
    },
    {
      id: "category",
      label: "Category (1-5)",
      accessor: "category",
      type: "select",
      options: Array.from({ length: 5 }, (_, i) => ({
        label: i + 1,
        value: i + 1,
      })),
    },
    {
      id: "number_of_rooms",
      label: "Number of Rooms",
      accessor: "number_of_rooms",
      type: "number",
    },
    {
      type: "subform",
      id: "address",
      subfields: [
        {
          id: "street_name",
          label: "Street Name",
          accessor: "address.streetName",
          type: "text",
        },
        {
          id: "street_number",
          label: "Street Number",
          accessor: "address.streetNumber",
          type: "text",
        },
        {
          id: "postal_code",
          label: "Postal Code",
          accessor: "address.postalCode",
          type: "text",
        },
        {
          id: "unit_number",
          label: "Unit Number",
          accessor: "address.unitNumber",
          type: "text",
        },
        {
          id: "city",
          label: "City",
          accessor: "address.cityName",
          type: "text",
        },
        {
          id: "country",
          label: "Country",
          accessor: "address.countryName",
          type: "text",
        },
      ],
    },
  ];

  useEffect(() => {
    fetchData();
    console.log("hotelChains", hotels);
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
      console.log(data);
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
    hotelData.id = hotels.length + 1;
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

  const handleDeleteHotel = async (hotel) => {
    const hotelId = hotel.id;
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
