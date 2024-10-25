// EmployeeForm.js
import React, { useState } from "react";

const EmployeeForm = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({
    employeeName: "",
    role: "receptionist",
    isManager: "false",
    ssnNumber: "",
    streetName: "",
    streetNumber: "",
    postalCode: "",
    unitNumber: "",
    cityName: "",
    countryName: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee(formData);
    setFormData({
      employeeName: "",
      role: "receptionist",
      isManager: "false",
      ssnNumber: "",
      streetName: "",
      streetNumber: "",
      postalCode: "",
      unitNumber: "",
      cityName: "",
      countryName: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>Add An Employee</h2>
      <input
        id="employeeName"
        placeholder="Employee Name"
        value={formData.employeeName}
        onChange={handleChange}
        required
      />
      <select id="role" value={formData.role} onChange={handleChange} required>
        <option value="receptionist">Receptionist</option>
        <option value="room service">Room Service</option>
        <option value="custodian">Custodian</option>
        <option value="cook">Cook</option>
        <option value="valet">Valet</option>
      </select>
      <label>Manager</label>
      <select
        id="isManager"
        value={formData.isManager}
        onChange={handleChange}
        required
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <input
        id="ssnNumber"
        placeholder="SSN Number"
        value={formData.ssnNumber}
        onChange={handleChange}
        required
      />
      <input
        id="streetName"
        placeholder="Street Name"
        value={formData.streetName}
        onChange={handleChange}
        required
      />
      <input
        id="streetNumber"
        placeholder="Street Number"
        value={formData.streetNumber}
        onChange={handleChange}
        required
      />
      <input
        id="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />
      <input
        id="unitNumber"
        placeholder="Unit Number"
        value={formData.unitNumber}
        onChange={handleChange}
      />
      <input
        id="cityName"
        placeholder="City Name"
        value={formData.cityName}
        onChange={handleChange}
        required
      />
      <input
        id="countryName"
        placeholder="Country Name"
        value={formData.countryName}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
