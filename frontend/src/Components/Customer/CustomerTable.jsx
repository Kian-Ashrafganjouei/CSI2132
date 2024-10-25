// CustomerTable.js
import React from "react";

const CustomerTable = ({ customers, onDeleteCustomer, onUpdateCustomer }) => {
  const handleDelete = (customer) => onDeleteCustomer(customer);

  const handleUpdate = (customer) => onUpdateCustomer(customer);

  return (
    <div className="customer-table">
      <h2>Existing Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Card Number</th>
            <th>ID Type</th>
            <th>Date of Registration</th>
            <th>Postal Code</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.customername}</td>
              <td>{customer.emailaddress}</td>
              <td>{customer.phonenumber}</td>
              <td>{customer.cardnumber}</td>
              <td>{customer.idtype}</td>
              <td>{customer.dateofregistration}</td>
              <td>{customer.postalcode}</td>
              <td>
                <button onClick={() => handleDelete(customer)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(customer)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
