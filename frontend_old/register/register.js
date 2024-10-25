document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customerForm');

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
                console.log('Customer successfully added');
                customerForm.reset(); // Clear form fields
                // Show the success message
                successMessage.style.display = 'block';
                // Hide the success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            } else {
                throw new Error('Failed to add customer');
            }
        })
        .catch(error => console.error('Error adding customer:', error));
    });
});
