document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const tbody = document.getElementById('employeeTableBody');
    const successMessage = document.getElementById('successMessage');

    // Fetch employees from server and display them
    function fetchEmployees() {
        fetch('/employees')
            .then(response => response.json())
            .then(data => {
                tbody.innerHTML = ''; // Clear existing rows
                data.forEach(employee => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${employee.id}</td>
                        <td>${employee.employeename}</td>
                        <td>${employee.role}</td>
                        <td>${employee.ismanager ? 'True' : 'False'}</td>
                        <td>${employee.ssnnumber}</td>
                        <td>${employee.postalcode}</td>
                        <td><button class="deleteBtn">Delete</button></td>
                        <td><button class="updateBtn">Update</button></td>
                    `;
                    tbody.appendChild(row);
                });

                // Add event listeners to delete buttons after creating them
                const deleteButtons = document.querySelectorAll('.deleteBtn');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const row = button.closest('tr');
                        const employeeId = row.querySelector('td:nth-child(1)').innerText;
                        console.log('Deleting employee with ID:', employeeId);
                
                        // Send DELETE request to the server
                        fetch(`/employees/${employeeId}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                console.log('Employee successfully deleted');
                                // Optionally, you can remove the row from the table
                                row.remove();
                                showSuccessMessage('Employee successfully deleted');
                            } else {
                                console.error('Failed to delete employee');
                            }
                        })
                        .catch(error => console.error('Error deleting employee:', error));
                    });
                });

                const updateBtn = document.querySelectorAll('.updateBtn');
                updateBtn.forEach(button => {
                    button.addEventListener('click', function() {
                        const row = button.closest('tr');
                        const employeeId = row.querySelector('td:nth-child(1)').innerText;
                        console.log('Updating employee with ID:', employeeId);

                        // Retrieve employee information
                        const employeeName = document.getElementById('employeeName').value;
                        const role = document.getElementById('role').value;
                        const isManager = document.getElementById('isManager').value;
                        const ssnNumber = document.getElementById('ssnNumber').value;

                        // Retrieve address information
                        const streetName = document.getElementById('streetName').value;
                        const streetNumber = document.getElementById('streetNumber').value;
                        const postalCode = document.getElementById('postalCode').value;
                        const unitNumber = document.getElementById('unitNumber').value;
                        const cityName = document.getElementById('cityName').value;
                        const countryName = document.getElementById('countryName').value;

                        // Check if any of the fields are empty
                        if (!employeeName || !role || !ssnNumber || !streetName || !streetNumber || !postalCode || !cityName || !countryName) {
                            console.error('Please fill out all fields before updating.');
                            return;
                        }

                        // Create an object with employee and address data
                        const employeeData = {
                            employeeName,
                            role,
                            isManager,
                            ssnNumber,
                            address: {
                                streetName,
                                streetNumber,
                                postalCode,
                                unitNumber,
                                cityName,
                                countryName
                            }
                        };
                        fetch(`/employees/${employeeId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(employeeData)
                        })
                        .then(response => {
                            if (response.ok) {
                                fetchEmployees(); // Fetch and display updated employee list
                                employeeForm.reset(); // Clear form fields
                                showSuccessMessage('Employee successfully updated');
                            } else {
                                throw new Error('Failed to update employee');
                            }
                        })
                        .catch(error => console.error('Error updating employee:', error));
                        
                    });
                });
            })
            .catch(error => console.error('Error fetching employees:', error));
    }

    function showSuccessMessage(message) {
        const successAlert = document.getElementById('successAlert');
        if (successAlert) {
            successAlert.textContent = message;
            successAlert.style.display = 'block';
        }
        
        // Hide the alert after 3 seconds
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 3000);
    }
     

    // Populate employee roles select options and fetch employees
    fetchEmployees();

    // Add event listener to employee form for submitting new employee data
    employeeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const employeeName = document.getElementById('employeeName').value;
        const role = document.getElementById('role').value;
        const isManager = document.getElementById('isManager').value;
        const ssnNumber = document.getElementById('ssnNumber').value;
        
        // Retrieve address information
        const streetName = document.getElementById('streetName').value;
        const streetNumber = document.getElementById('streetNumber').value;
        const postalCode = document.getElementById('postalCode').value;
        const unitNumber = document.getElementById('unitNumber').value;
        const cityName = document.getElementById('cityName').value;
        const countryName = document.getElementById('countryName').value;

        // Create an object with employee and address data
        const employeeData = {
            employeeName,
            role,
            isManager,
            ssnNumber,
            address: {
                streetName,
                streetNumber,
                postalCode,
                unitNumber,
                cityName,
                countryName
            }
        };
        console.log(employeeName + " ADDED")
        fetch('/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        })
        .then(response => {
            if (response.ok) {
                fetchEmployees(); // Fetch and display updated employee list
                employeeForm.reset(); // Clear form fields
                showSuccessMessage('Employee successfully added');
            } else {
                throw new Error('Failed to add employee');
            }
        })
        .catch(error => console.error('Error adding employee:', error));
    });

});
