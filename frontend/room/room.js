document.addEventListener('DOMContentLoaded', () => {
    const roomForm = document.getElementById('roomForm');
    const tbody = document.getElementById('roomTableBody');
    const hotelIDInput = document.getElementById('hotelID_dynamic');

    // Fetch hotel chains from server and populate select options
    function fetchHotelIds() {
        fetch('/hotel_ids')
            .then(response => response.json())
            .then(data => {
                hotelIDInput.innerHTML = '';
                data.forEach(hotel => {
                    const option = document.createElement('option');
                    option.value = hotel.hotel_id;
                    option.textContent = hotel.hotel_id;
                    hotelIDInput.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching hotel chains:', error));
    }

    // Fetch rooms from server and display them
    function fetchRooms() {
        fetch('/rooms')
            .then(response => response.json())
            .then(data => {
                tbody.innerHTML = ''; // Clear existing rows
                data.forEach(room => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${room.roomnumber}</td>
                        <td>${room.floornumber}</td>
                        <td>${room.hotelid}</td>
                        <td>${room.amenities.join(', ')}</td>
                        <td>${room.viewtype}</td>
                        <td>${room.price}</td>
                        <td>${room.capacity}</td>
                        <td>${room.canbeextended ? 'true' : 'false'}</td>
                        <td>${room.stringcomment}</td>
                        <td>${room.isrenting ? 'true' : 'false'}</td>
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
                        const roomNumber = row.querySelector('td:nth-child(1)').innerText;
                        const floorNumber = row.querySelector('td:nth-child(2)').innerText;
                        const hotelID = row.querySelector('td:nth-child(3)').innerText;

                        console.log('Deleting room with room number:', roomNumber, ' on floor:', floorNumber, ' in hotel:', hotelID);
                
                        // Send DELETE request to the server
                        fetch(`/rooms/${roomNumber}/${floorNumber}/${hotelID}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                console.log('Room successfully deleted');
                                // Optionally, you can remove the row from the table
                                row.remove();
                                showSuccessMessage('Room successfully deleted');
                            } else {
                                console.error('Failed to delete room');
                            }
                        })
                        .catch(error => console.error('Error deleting room:', error));
                    });
                });

                const updateBtn = document.querySelectorAll('.updateBtn');
                updateBtn.forEach(button => {
                    button.addEventListener('click', function() {
                        const row = button.closest('tr');
                        const roomNumber = row.querySelector('td:nth-child(1)').innerText;
                        const floorNumber = row.querySelector('td:nth-child(2)').innerText;
                        const hotelID = row.querySelector('td:nth-child(3)').innerText;

                        document.getElementById('roomNumber').value = roomNumber;
                        document.getElementById('floorNumber').value = floorNumber;
                        document.getElementById('hotelID_dynamic').value = hotelID;

                        console.log('Updating room with room number:', roomNumber, ' on floor:', floorNumber, ' in hotel:', hotelID);

                        const amenities = document.getElementById('amenities').value.split(', ');
                        const viewType = document.getElementById('viewType').value;
                        const price = document.getElementById('price').value;
                        const capacity = document.getElementById('capacity').value;
                        const canBeExtended = document.getElementById('canBeExtended').value;
                        const stringComment = document.getElementById('stringComment').value;
                        const isRenting = document.getElementById('isRenting').value;
                        


                        // Check if any of the fields are empty
                        if (!hotelID || !amenities || !viewType || !canBeExtended || !stringComment || !isRenting || !roomNumber  || !floorNumber || !price || !capacity) {
                            console.error('Please fill out all fields before updating.');
                            return;
                        }

                        // Construct the room data object
                        const roomData = {
                            floorNumber,
                            hotelID,
                            amenities,
                            viewType,
                            price,
                            capacity,
                            canBeExtended,
                            stringComment,
                            isRenting
                        };
                        fetch(`/rooms/${roomNumber}/${floorNumber}/${hotelID}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(roomData)
                        })
                        .then(response => {
                            if (response.ok) {
                                fetchRooms(); // Fetch and display updated room list
                                roomForm.reset(); // Clear form fields
                                showSuccessMessage('Room successfully updated');
                            } else {
                                throw new Error('Failed to update room');
                            }
                        })
                        .catch(error => console.error('Error updating room:', error));
                        
                    });
                });
            })
            .catch(error => console.error('Error fetching rooms:', error));
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
    // Fetch and display existing rooms
    fetchRooms();
    fetchHotelIds();

    // Add event listener to room form for submitting new room data
    roomForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const roomNumber = document.getElementById('roomNumber').value;
        const floorNumber = document.getElementById('floorNumber').value;
        const hotelID = document.getElementById('hotelID_dynamic').value;
        const amenities = document.getElementById('amenities').value.split(', ');
        const viewType = document.getElementById('viewType').value;
        const price = document.getElementById('price').value;
        const capacity = document.getElementById('capacity').value;
        const canBeExtended = document.getElementById('canBeExtended').value;
        const stringComment = document.getElementById('stringComment').value;
        const isRenting = document.getElementById('isRenting').value;

        // Check if any of the fields are empty
        if (!hotelID || !amenities || !viewType || !canBeExtended || !stringComment || !isRenting || !roomNumber  || !floorNumber || !price || !capacity) {
            console.error('Please fill out all fields before adding.');
            return;
        }

        // Create an object with room data
        const roomData = {
            roomNumber,
            floorNumber,
            hotelID,
            amenities,
            viewType,
            price,
            capacity,
            canBeExtended,
            stringComment,
            isRenting
        };
        console.log(roomData)

        fetch('/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roomData)
        })
        .then(response => {
            if (response.ok) {
                fetchRooms(); // Fetch and display updated room list
                roomForm.reset(); // Clear form fields
                showSuccessMessage('Room successfully added');
            } else {
                throw new Error('Failed to add room');
            }
        })
        .catch(error => console.error('Error adding room:', error));
    });
});
