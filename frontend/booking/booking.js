document.addEventListener('DOMContentLoaded', () => {
    const optionsDropdown = document.getElementById('options');
    const convertButton = document.getElementById('convert-button'); // Fix: Use getElementById instead of querySelector
    const tbody = document.getElementById('bookingTableBody');

    // Fetch booking options from the server
    fetch('/bookings')
        .then(response => response.json())
        .then(data => {
            // Clear existing options
            optionsDropdown.innerHTML = '';

            // Populate dropdown with booking options
            data.forEach(booking => {
                console.log(booking)
                const option = document.createElement('option');
                option.value = `${booking.bookingid}-${booking.roomnumber}-${booking.floornumber}-${booking.hotelid}`; // Concatenate room number, floor number, and hotel ID
                option.textContent = `Booking ${booking.bookingid} Room ${booking.roomnumber}, Floor ${booking.floornumber}, Hotel ${booking.hotelid}`; // Example display text
                optionsDropdown.appendChild(option);
            });


            data.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.bookingid}</td>
                    <td>${booking.startdate}</td>
                    <td>${booking.enddate}</td>
                    <td>${booking.customername}</td>
                    <td>${booking.emailaddress}</td>
                    <td>${booking.phonenumber}</td>
                    <td>${booking.roomnumber}</td>
                    <td>${booking.floornumber}</td>
                    <td>${booking.hotelid}</td>
                    <td><button class="deleteBtn">Delete</button></td>
                `;
                tbody.appendChild(row);
            });


            // Add event listeners to delete buttons after creating them
            const deleteButtons = document.querySelectorAll('.deleteBtn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const row = button.closest('tr');
                    const bookingId = row.querySelector('td:nth-child(1)').innerText; // Assuming the booking ID is in the first column

                    // Send DELETE request to the server
                    fetch(`/bookings/${bookingId}`, { // Adjust the endpoint URL
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Booking successfully deleted');
                            // Optionally, you can remove the row from the table
                            row.remove();
                            showSuccessMessage('Booking successfully removed');
                        } else {
                            console.error('Failed to delete booking');
                        }
                    })
                    .catch(error => console.error('Error deleting booking:', error));
                });
            });

        })
        .catch(error => console.error('Error fetching booking options:', error));

    // Add event listener to convert button
    convertButton.addEventListener('click', () => {
        // Get selected booking info from dropdown
        const selectedBookingInfo = optionsDropdown.value.split('-');
        const roomNumber = selectedBookingInfo[1];
        const floorNumber = selectedBookingInfo[2];
        const hotelID = selectedBookingInfo[3];
        
        // Perform conversion operation or any other action based on the selected booking
        console.log('Selected Booking: Room', roomNumber, ', Floor', floorNumber, ', Hotel', hotelID);

          // Create an object with new booking data
          const convertData = {
            roomNumber,
            floorNumber,
            hotelID
        };

        // Send new booking data to the server
        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(convertData)
        })
        .then(response => {
            if (response.ok) {
                console.log('Converted Successfully');
                // Optionally, perform any additional actions after adding the booking
                showSuccessMessage('Successfully Converted');
            } else {
                console.error('Failed to convert');
            }
        })
        .catch(error => console.error('Error converting:', error));

    });

      // Add event listener to new renting form for submitting new renting data
      const newRentingForm = document.getElementById('newRentingForm');
      newRentingForm.addEventListener('submit', event => {
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
          const hotelID = document.getElementById('hotelID').value;
          const roomNumber = document.getElementById('roomNumber').value;
          const floorNumber = document.getElementById('floorNumber').value;
  
          // Create an object with new booking data
          const newRentingData = {
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
            },
            hotelID,
            roomNumber,
            floorNumber
          };
  
          // Send new booking data to the server
          fetch('/bookings', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newRentingData)
          })
          .then(response => {
              if (response.ok) {
                  console.log('New renting added successfully');
                  // Optionally, perform any additional actions after adding the booking
                  showSuccessMessage('Renting successfully added');
              } else {
                  console.error('Failed to add new renting');
              }
          })
          .catch(error => console.error('Error adding new renting:', error));
      });

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
  });