document.addEventListener('DOMContentLoaded', () => {
    const optionsDropdown = document.getElementById('options');
    const convertButton = document.getElementById('convert-button'); // Fix: Use getElementById instead of querySelector

    // Fetch booking options from the server
    fetch('/bookings')
        .then(response => response.json())
        .then(data => {
            // Clear existing options
            optionsDropdown.innerHTML = '';

            // Populate dropdown with booking options
            data.forEach(booking => {
                const option = document.createElement('option');
                option.value = `${booking.roomnumber}-${booking.floornumber}-${booking.hotelid}`; // Concatenate room number, floor number, and hotel ID
                option.textContent = `Room ${booking.roomnumber}, Floor ${booking.floornumber}, Hotel ${booking.hotelid}`; // Example display text
                optionsDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching booking options:', error));

    // Add event listener to convert button
    convertButton.addEventListener('click', () => {
        // Get selected booking info from dropdown
        const selectedBookingInfo = optionsDropdown.value.split('-');
        const roomNumber = selectedBookingInfo[0];
        const floorNumber = selectedBookingInfo[1];
        const hotelID = selectedBookingInfo[2];
        
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
            } else {
                console.error('Failed to convert');
            }
        })
        .catch(error => console.error('Error converting:', error));

    });

      // Add event listener to new booking form for submitting new booking data
      const newRentingForm = document.getElementById('newRentingForm');
      newRentingForm.addEventListener('submit', event => {
          event.preventDefault();
          const customerName = document.getElementById('customerName').value;
          const email = document.getElementById('email').value;
          const ssn = document.getElementById('ssn').value;
          const hotelID = document.getElementById('hotelID').value;
          const roomNumber = document.getElementById('roomNumber').value;
          const floorNumber = document.getElementById('floorNumber').value;
  
          // Create an object with new booking data
          const newBookingData = {
              customerName,
              email,
              ssn,
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
              body: JSON.stringify(newBookingData)
          })
          .then(response => {
              if (response.ok) {
                  console.log('New booking added successfully');
                  // Optionally, perform any additional actions after adding the booking
              } else {
                  console.error('Failed to add new booking');
              }
          })
          .catch(error => console.error('Error adding new booking:', error));
      });
  });
