// EmployeeTable.js
import React from "react";

const EmployeeTable = ({ employees, onDeleteEmployee, onUpdateEmployee }) => {
  return (
    <div className="employee-table">
      <h2>Existing Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Role</th>
            <th>Is Manager</th>
            <th>SSN Number</th>
            <th>Postal Code</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employeename}</td>
              <td>{employee.role}</td>
              <td>{employee.ismanager ? "True" : "False"}</td>
              <td>{employee.ssnnumber}</td>
              <td>{employee.postalcode}</td>
              <td>
                <button onClick={() => onDeleteEmployee(employee.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => onUpdateEmployee(employee.id, employee)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
