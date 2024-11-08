// EmployeeDashboard.js
import React, { useEffect, useState } from "react";
import ReusableForm from "../../DevComponents/ResuableForm/ResuableForm";
import "./Employee.css";

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

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch("/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (employeeData) => {
    // Calculate the next id based on the highest existing id
    const maxId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) : 0;
    employeeData.id = maxId + 1;

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

  const handleUpdateEmployee = async (id, employeeData) => {
    try {
      const response = await fetch(`/employees/${id}`, {
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

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`/employees/${id}`, {
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
    <div className="employee-dashboard">
      <h1>Manage Employees</h1>
      <div className="dashboard-main">
        <ReusableForm
          formConfig={formConfig}
          onSubmit={handleAddEmployee}
          title="Add An Employee"
        />
        
        <div className="employee-table">
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Role</th>
                <th>Manager</th>
                <th>SSN Number</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.employeeName}</td>
                  <td>{employee.role}</td>
                  <td>{employee.isManager === "true" ? "Yes" : "No"}</td>
                  <td>{employee.ssnNumber}</td>
                  <td>
                    <button onClick={() => handleDeleteEmployee(employee.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {successMessage && (
        <div className="alert success-alert">{successMessage}</div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
