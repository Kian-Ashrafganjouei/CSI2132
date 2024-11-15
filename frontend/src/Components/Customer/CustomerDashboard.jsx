import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import ReusableTable from "../../DevComponents/ReusableTable/ReusableTable";
import Modal from "../../DevComponents/Modal/Modal";
import Button from "../../DevComponents/Button/Button";
import "./Customer.css";

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

const tableColumns = [
  { header: "Customer Name", accessor: "customerName" },
  { header: "Email Address", accessor: "emailAddress" },
  { header: "Phone Number", accessor: "phoneNumber" },
  { header: "Card Number", accessor: "cardNumber" },
  { header: "ID Type", accessor: "idType" },
  { header: "Date of Registration", accessor: "dateOfRegistration" },
];

// Define permissions for each user role
const rolePermissions = {
  Manager: {
    canAddCustomer: true,
    canEditCustomer: true,
    canDeleteCustomer: true,
    canViewTable: true,
  },
  Employee: {
    canAddCustomer: true,
    canEditCustomer: true,
    canDeleteCustomer: false,
    canViewTable: true,
  },
  Customer: {
    canAddCustomer: true,
    canEditCustomer: false,
    canDeleteCustomer: false,
    canViewTable: false,
  },
};

const CustomerDashboard = ({ userRole }) => {
  const permissions = rolePermissions[userRole] || {};
  const [customers, setCustomers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await Promise.all([fetch("/customers")]);
      const data = await Promise.all(response.map((res) => res.json()));
      console.log(data);
      setCustomers(data[0]);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (customerData) => {
    if (!permissions.canAddCustomer) return;
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

  const handleUpdateCustomer = async (customerData) => {
    if (!permissions.canEditCustomer) return;
    try {
      const response = await fetch("/customers", {
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
    if (!permissions.canDeleteCustomer) return;
    try {
      const response = await fetch("/customers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
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
    <div className="dashboard">
      {!permissions.canViewTable && permissions.canAddCustomer ? (
        <h1>Add a Customer</h1>
      ) : (
        <h1>
          Manage Customers{" "}
          <Button className="modal-button" onClick={() => setIsOpened(true)}>
            Add Customer
          </Button>
        </h1>
      )}

      <div className="dashboard-main">
        {permissions.canViewTable && (
          <>
            <ReusableTable
              columns={tableColumns}
              data={customers}
              actions={{
                onEdit: permissions.canEditCustomer
                  ? handleUpdateCustomer
                  : null,
                onDelete: permissions.canDeleteCustomer
                  ? handleDeleteCustomer
                  : null,
              }}
              title="Customers"
              loading={loading}
            />
            <Modal isOpen={isOpened} onClose={() => setIsOpened(false)}>
              <ReusableForm
                formConfig={formConfig}
                onSubmit={handleAddCustomer}
                title="Customer Registration"
              />
            </Modal>
          </>
        )}

        {permissions.canViewTabl && permissions.canAddCustomer && (
          <div className="customer-table-view">
            <ReusableForm
              formConfig={formConfig}
              onSubmit={handleAddCustomer}
              title="Customer Registration"
            />
          </div>
        )}
      </div>

      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default CustomerDashboard;
