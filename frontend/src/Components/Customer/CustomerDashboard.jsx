// CustomerDashboard.js
import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import ReusableTable from "../../DevComponents/ReusableTable/ReusableTable";
import "./Customer.css";

const tableColumns = [
  { header: "Customer ID", accessor: "id" },
  { header: "Customer Name", accessor: "customerName" },
  { header: "Email Address", accessor: "emailAddress" },
  { header: "Phone Number", accessor: "phoneNumber" },
  { header: "Card Number", accessor: "cardNumber" },
  { header: "ID Type", accessor: "idType" },
  { header: "Date of Registration", accessor: "dateOfRegistration" },
];

const formConfig = [
  {
    id: "customerName",
    label: "Customer Name",
    type: "text",
    placeholder: "Customer Name",
    required: true,
  },
  {
    id: "emailAddress",
    label: "Email Address",
    type: "email",
    placeholder: "Email Address",
    required: true,
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Phone Number",
    required: true,
  },
  {
    id: "cardNumber",
    label: "Card Number",
    type: "text",
    placeholder: "Card Number",
    required: true,
  },
  {
    id: "idType",
    label: "ID Type",
    type: "select",
    required: true,
    options: [
      { value: "Driver Licence", label: "Driver Licence" },
      { value: "Passport", label: "Passport" },
      { value: "Health Card", label: "Health Card" },
      { value: "SSN/SIN", label: "SSN/SIN" },
      { value: "Identity Card", label: "Identity Card" },
    ],
  },
  {
    id: "dateOfRegistration",
    label: "Date of Registration",
    type: "date",
    required: true,
  },
  {
    id: "streetName",
    label: "Street Name",
    type: "text",
    placeholder: "Street Name",
    required: true,
  },
  {
    id: "streetNumber",
    label: "Street Number",
    type: "text",
    placeholder: "Street Number",
    required: true,
  },
  {
    id: "postalCode",
    label: "Postal Code",
    type: "text",
    placeholder: "Postal Code",
    required: true,
  },
  {
    id: "unitNumber",
    label: "Unit Number",
    type: "text",
    placeholder: "Unit Number",
  },
  {
    id: "cityName",
    label: "City Name",
    type: "text",
    placeholder: "City Name",
    required: true,
  },
  {
    id: "countryName",
    label: "Country Name",
    type: "text",
    placeholder: "Country Name",
    required: true,
  },
];

const CustomerDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/customers");
      const text = await response.text(); // Read the response as plain text
      console.log("Raw response:", text); // Log raw response to see its format
      const data = JSON.parse(text); // Then parse it as JSON
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (customerData) => {
    // Find the maximum existing ID
    const maxId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) : 0;
    customerData.id = maxId + 1; // Assign a new unique ID
  
    try {
      const response = await fetch("/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
      if (response.ok) {
        fetchCustomers();
        setSuccessMessage("Customer successfully added");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };
  

  const handleUpdateCustomer = async (customerId, customerData) => {
    try {
      const response = await fetch(`/customers/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
      if (response.ok) {
        fetchCustomers();
        setSuccessMessage("Customer successfully updated");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleDeleteCustomer = async (customer) => {
    const customerId = customer.id;
    try {
      const response = await fetch(`/customers/${customerId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCustomers();
        setSuccessMessage("Customer successfully deleted");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="customer-dashboard">
      <h1>Manage Customers</h1>
      <div className="dashboard-main">
        <ReusableForm
          formConfig={formConfig}
          onSubmit={handleAddCustomer}
          title="Customer Registration"
        />
        <ReusableTable
          columns={tableColumns}
          data={customers}
          actions={{
            onEdit: (customer) => handleUpdateCustomer(customer.id, customer),
            onDelete: handleDeleteCustomer,
          }}
          title="Customers"
          loading={loading}
        />
      </div>
      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default CustomerDashboard;
