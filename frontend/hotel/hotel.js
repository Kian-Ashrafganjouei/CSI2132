document.addEventListener('DOMContentLoaded', () => {
    const hotelForm = document.getElementById('hotelForm');
    const chainNameSelect = document.getElementById('chain_name_dynamic');
    const tbody = document.getElementById('hotelTableBody');
    const aggregatedCapacityList = document.getElementById('aggregatedCapacityList');

    

    // Fetch hotel chains from server and populate select options
    function fetchHotelChains() {
        fetch('/hotel_chains')
            .then(response => response.json())
            .then(data => {
                chainNameSelect.innerHTML = '';
                data.forEach(chain => {
                    const option = document.createElement('option');
                    option.value = chain.chain_name;
                    option.textContent = chain.chain_name;
                    chainNameSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching hotel chains:', error));
    }
    
    function fetchAggregatedCapacity() {
        fetch('/hotel_aggregated_capacity')
          .then(response => response.json())
          .then(data => {
            const gridContainer = document.getElementById('aggregatedCapacityGrid');
            gridContainer.innerHTML = ''; // Clear existing data
      
            // Sort the data array by hotel_id in ascending order
            data.sort((a, b) => a.hotel_id - b.hotel_id);
      
            // Loop through each hotel and create a grid item for it
            data.forEach(hotel => {
              const gridItem = document.createElement('div');
              gridItem.classList.add('grid-item');
              gridItem.innerHTML = `
                <h3>Hotel ID: ${hotel.hotel_id}</h3>
                <p>Total Capacity: ${hotel.total_capacity}</p>
              `;
              gridContainer.appendChild(gridItem);
            });
          })
          .catch(error => console.error('Error fetching aggregated capacity:', error));
      }   
    
    // Fetch hotels from server and display them
    function fetchHotels() {
        fetch('/hotels')
            .then(response => response.json())
            .then(data => {
                tbody.innerHTML = ''; // Clear existing rows
                data.forEach(hotel => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${hotel.hotel_id}</td>
                        <td>${hotel.chain_name}</td>
                        <td>${hotel.category}</td>
                        <td>${hotel.number_of_rooms}</td>
                        <td>${hotel.postalcode}</td>
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
                        const hotelId = row.querySelector('td:nth-child(1)').innerText;
                        console.log('Deleting hotel with ID:', hotelId);
                
                        // Send DELETE request to the server
                        fetch(`/hotels/${hotelId}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                console.log('Hotel successfully deleted');
                                // Optionally, you can remove the row from the table
                                row.remove();
                            } else {
                                console.error('Failed to delete hotel');
                            }
                        })
                        .catch(error => console.error('Error deleting hotel:', error));
                    });
                });

                const updateBtn = document.querySelectorAll('.updateBtn');
                updateBtn.forEach(button => {
                    button.addEventListener('click', function() {
                        const row = button.closest('tr');
                        const hotelId = row.querySelector('td:nth-child(1)').innerText;
                        console.log('Updating hotel with ID:', hotelId);

                        const chain_name = document.getElementById('chain_name_dynamic').value;
                        const category = document.getElementById('category').value;
                        const numberOfRooms = document.getElementById('numberOfRooms').value;
                        
                        // Retrieve address information
                        const streetName = document.getElementById('streetName').value;
                        const streetNumber = document.getElementById('streetNumber').value;
                        const postalCode = document.getElementById('postalCode').value;
                        const unitNumber = document.getElementById('unitNumber').value;
                        const cityName = document.getElementById('cityName').value;
                        const countryName = document.getElementById('countryName').value;

                        // Check if any of the fields are empty
                        if (!chain_name || !category || !numberOfRooms || !streetName || !streetNumber || !postalCode || !cityName || !countryName) {
                            console.error('Please fill out all fields before updating.');
                            return;
                        }

                        // Create an object with hotel and address data
                        const hotelData = {
                            chain_name,
                            category,
                            numberOfRooms,
                            address: {
                                streetName,
                                streetNumber,
                                postalCode,
                                unitNumber,
                                cityName,
                                countryName
                            }
                        };
                        fetch(`/hotels/${hotelId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(hotelData)
                        })
                        .then(response => {
                            if (response.ok) {
                                fetchHotels(); // Fetch and display updated hotel list
                                hotelForm.reset(); // Clear form fields
                            } else {
                                throw new Error('Failed to update hotel');
                            }
                        })
                        .catch(error => console.error('Error updating hotel:', error));
                        
                    });
                });
            })
            .catch(error => console.error('Error fetching hotels:', error));
    }

    // Populate hotel chains select options and fetch hotels
    fetchHotelChains();
    fetchHotels();
    fetchAggregatedCapacity();

// Add event listener to hotel form for submitting new hotel data
hotelForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const chain_name = document.getElementById('chain_name_dynamic').value;
    const category = document.getElementById('category').value;
    const numberOfRooms = document.getElementById('numberOfRooms').value;
    
    // Retrieve address information
    const streetName = document.getElementById('streetName').value;
    const streetNumber = document.getElementById('streetNumber').value;
    const postalCode = document.getElementById('postalCode').value;
    const unitNumber = document.getElementById('unitNumber').value;
    const cityName = document.getElementById('cityName').value;
    const countryName = document.getElementById('countryName').value;

    // Create an object with hotel and address data
    const hotelData = {
        chain_name,
        category,
        numberOfRooms,
        address: {
            streetName,
            streetNumber,
            postalCode,
            unitNumber,
            cityName,
            countryName
        }
    };
    console.log(chain_name + " ADDED")
    fetch('/hotels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotelData)
    })
    .then(response => {
        if (response.ok) {
            fetchHotels(); // Fetch and display updated hotel list
            hotelForm.reset(); // Clear form fields
        } else {
            throw new Error('Failed to add hotel');
        }
    })
    .catch(error => console.error('Error adding hotel:', error));
});

});
