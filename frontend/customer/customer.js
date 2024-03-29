document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customerForm');
    const tbody = document.getElementById('customerTableBody');

    // Fetch customers from server and display them
    function fetchCustomers() {
        fetch('/customers')
            .then(response => response.json())
            .then(data => {
                tbody.innerHTML = ''; // Clear existing rows
                data.forEach(customer => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${customer.customername}</td>
                        <td>${customer.emailaddress}</td>
                        <td>${customer.phonenumber}</td>
                        <td>${customer.cardnumber}</td>
                        <td>${customer.idtype}</td>
                        <td>${customer.dateofregistration}</td>
                        <td>${customer.postalcode}</td>
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
                        const customerName = row.querySelector('td:nth-child(1)').innerText;
                        const emailAddress = row.querySelector('td:nth-child(2)').innerText;
                        const phoneNumber = row.querySelector('td:nth-child(3)').innerText;

                        // Send DELETE request to the server
                        fetch('/customers', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                customerName: customerName,
                                emailAddress: emailAddress,
                                phoneNumber: phoneNumber
                            })
                        })
                        .then(response => {
                            if (response.ok) {
                                console.log('Customer successfully deleted');
                                // Optionally, you can remove the row from the table
                                row.remove();
                            } else {
                                console.error('Failed to delete customer');
                            }
                        })
                        .catch(error => console.error('Error deleting customer:', error));
                    });
                });

                const updateBtn = document.querySelectorAll('.updateBtn');
                updateBtn.forEach(button => {
                    button.addEventListener('click', function() {
                        const row = button.closest('tr');
                        const customerName = row.querySelector('td:nth-child(1)').innerText;
                        const emailAddress = row.querySelector('td:nth-child(2)').innerText;
                        const phoneNumber = row.querySelector('td:nth-child(3)').innerText;
                        
                        document.getElementById('customerName').value = customerName;
                        document.getElementById('emailAddress').value = emailAddress;
                        document.getElementById('phoneNumber').value = phoneNumber;


                        const cardNumber = document.getElementById('cardNumber').value;
                        const idType = document.getElementById('idType').value;
                        const dateOfRegistration = document.getElementById('dateOfRegistration').value;
                        const streetName = document.getElementById('streetName').value;
                        const streetNumber = document.getElementById('streetNumber').value;
                        const postalCode = document.getElementById('postalCode').value;
                        const unitNumber = document.getElementById('unitNumber').value;
                        const cityName = document.getElementById('cityName').value;
                        const countryName = document.getElementById('countryName').value;
                        // Check if any of the fields are empty
                        if (!customerName || !emailAddress || !phoneNumber || !cardNumber || !idType || !dateOfRegistration || !dateOfRegistration || !streetNumber  || !postalCode || !cityName || !countryName) {
                            console.error('Please fill out all fields before updating.');
                            return;
                        }
                    
                        console.log('ADDING CUSTOMER:', customerName, emailAddress, phoneNumber);
                    
                        // Create an object with customer data
                        const customerData = {
                            customerName,
                            emailAddress,
                            phoneNumber,
                            cardNumber,
                            idType,
                            dateOfRegistration,
                            address: {
                                streetName,
                                streetNumber,
                                postalCode,
                                unitNumber,
                                cityName,
                                countryName
                            }
                        };
                        fetch(`/customers`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(customerData)
                        })
                        .then(response => {
                            if (response.ok) {
                                fetchCustomers(); // Fetch and display updated customer list
                            } else {
                                throw new Error('Failed to update customer');
                            }
                        })
                        .catch(error => console.error('Error updating customer:', error));
                        
                    });
                });
            })
            .catch(error => console.error('Error fetching customers:', error));
    }

    // Fetch customers on page load
    fetchCustomers();

// Add event listener to customer form for submitting new customer data
customerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const customerName = document.getElementById('customerName').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const idType = document.getElementById('idType').value;
    const dateOfRegistration = document.getElementById('dateOfRegistration').value;
    const streetName = document.getElementById('streetName').value;
    const streetNumber = document.getElementById('streetNumber').value;
    const postalCode = document.getElementById('postalCode').value;
    const unitNumber = document.getElementById('unitNumber').value;
    const cityName = document.getElementById('cityName').value;
    const countryName = document.getElementById('countryName').value;
    console.log('ADDING CUSTOMER:', customerName, emailAddress, phoneNumber);

    // Create an object with customer data
    const customerData = {
        customerName,
        emailAddress,
        phoneNumber,
        cardNumber,
        idType,
        dateOfRegistration,
        address: {
            streetName,
            streetNumber,
            postalCode,
            unitNumber,
            cityName,
            countryName
        }
    };

    fetch('/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
    })
    .then(response => {
        if (response.ok) {
            fetchCustomers(); // Fetch and display updated customer list
            customerForm.reset(); // Clear form fields
        } else {
            throw new Error('Failed to add customer');
        }
    })
    .catch(error => console.error('Error adding customer:', error));
});

});
