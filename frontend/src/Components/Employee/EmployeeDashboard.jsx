// EmployeeDashboard.js
import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import ResuableTable from "../../DevComponents/ReusableTable/ReusableTable";
import Modal from "../../DevComponents/Modal/Modal";
import Button from "../../DevComponents/Button/Button";
import "./Employee.css";

// const [formData, setFormData] = useState({
//     employeeName: "",
//     role: "receptionist",
//     isManager: "false",
//     ssnNumber: "",
//     streetName: "",
//     streetNumber: "",
//     postalCode: "",
//     unitNumber: "",
//     cityName: "",
//     countryName: "",
//   });

const formConfig = [
  {
    type: "text",
    id: "employeeName",
    label: "Employee Name",
    required: true,
  },
  {
    type: "select",
    id: "role",
    label: "Role",
    options: [
      { value: "receptionist", label: "Receptionist" },
      { value: "room service", label: "Room Service" },
      { value: "custodian", label: "Custodian" },
      { value: "cook", label: "Cook" },
      { value: "valet", label: "Valet" },
    ],
    required: true,
  },
  {
    type: "select",
    id: "isManager",
    label: "Manager",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
    required: true,
  },
  {
    type: "text",
    id: "ssnNumber",
    label: "SSN Number",
    required: true,
  },
  {
    type: "text",
    id: "streetName",
    label: "Street Name",
    required: true,
  },
  {
    type: "text",
    id: "streetNumber",
    label: "Street Number",
    required: true,
  },
  {
    type: "text",
    id: "postalCode",
    label: "Postal Code",
    required: true,
  },
  {
    type: "text",
    id: "unitNumber",
    label: "Unit Number",
    required: true,
  },
  {
    type: "text",
    id: "cityName",
    label: "City Name",
    required: true,
  },
  {
    type: "text",
    id: "countryName",
    label: "Country Name",
    required: true,
  },
];

const tableColumns = [
  { header: "Employee Name", accessor: "employeeName" },
  { header: "Role", accessor: "role" },
  { header: "Manager", accessor: "isManager" },
  { header: "SSN Number", accessor: "ssnNumber" },
  { header: "Street Name", accessor: "streetName" },
  { header: "Street Number", accessor: "streetNumber" },
  { header: "Postal Code", accessor: "postalCode" },
  { header: "Unit Number", accessor: "unitNumber" },
  { header: "City Name", accessor: "cityName" },
  { header: "Country Name", accessor: "countryName" },
];

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await Promise.all([fetch("/employees")]);
      const data = await Promise.all(response.map((res) => res.json()));
      setEmployees(data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (employeeData) => {
    employeeData.id = employees.length + 1;
    try {
      const response = await fetch("/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      if (response.ok) {
        fetchEmployees();
        setSuccessMessage("Employee successfully added");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleUpdateEmployee = async (employeeId, employeeData) => {
    try {
      const response = await fetch(`/employees/${employeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      if (response.ok) {
        fetchEmployees();
        setSuccessMessage("Employee successfully updated");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (employee) => {
    console.log(employee);
    const employeeId = employee.id;
    try {
      const response = await fetch(`/employees/${employeeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEmployees();
        setSuccessMessage("Employee successfully deleted");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>
        Manage Employees{" "}
        <Button className="modal-button" onClick={() => setIsOpened(true)}>
          Add Employee
        </Button>
      </h1>
      <div className="dashboard-main">
        <ResuableTable
          data={employees}
          columns={tableColumns}
          actions={{
            onDelete: handleDeleteEmployee,
            onEdit: handleUpdateEmployee,
          }}
          title="Employee List"
          loading={loading}
        />

        <Modal isOpen={isOpened} onClose={() => setIsOpened(false)}>
          <ReusableForm
            formConfig={formConfig}
            onSubmit={handleAddEmployee}
            title="Add an Employee"
          />
        </Modal>
      </div>

      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
