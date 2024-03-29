document.addEventListener('DOMContentLoaded', () => {
    const roomForm = document.getElementById('roomForm');
    const tbody = document.getElementById('roomTableBody');

    // Fetch rooms from server and display them
    function fetchRooms() {
        fetch('/rooms')
            .then(response => response.json())
            .then(data => {
                tbody.innerHTML = ''; // Clear existing rows
                data.forEach(room => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${room.roomNumber}</td>
                        <td>${room.floorNumber}</td>
                        <td>${room.hotelID}</td>
                        <td>${room.chain_name}</td>
                        <td>${room.amenities.join(', ')}</td>
                        <td>${room.viewType}</td>
                        <td>${room.canBeExtended ? 'Yes' : 'No'}</td>
                        <td>${room.stringComment}</td>
                        <td>${room.isRenting ? 'Yes' : 'No'}</td>
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
                        console.log('Deleting room with room number:', roomNumber);
                
                        // Send DELETE request to the server
                        fetch(`/rooms/${roomNumber}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                console.log('Room successfully deleted');
                                // Optionally, you can remove the row from the table
                                row.remove();
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
                        console.log('Updating room with room number:', roomNumber);

                        // Retrieve other room details here
                        const floorNumber = row.querySelector('td:nth-child(2)').innerText;
                        const hotelID = row.querySelector('td:nth-child(3)').innerText;
                        const chainName = row.querySelector('td:nth-child(4)').innerText;
                        const amenities = row.querySelector('td:nth-child(5)').innerText.split(', ');
                        const viewType = row.querySelector('td:nth-child(6)').innerText;
                        const canBeExtended = row.querySelector('td:nth-child(7)').innerText === 'Yes';
                        const stringComment = row.querySelector('td:nth-child(8)').innerText;
                        const isRenting = row.querySelector('td:nth-child(9)').innerText === 'Yes';

                        // Construct the room data object
                        const roomData = {
                            floorNumber,
                            hotelID,
                            chainName,
                            amenities,
                            viewType,
                            canBeExtended,
                            stringComment,
                            isRenting
                        };
                        fetch(`/rooms/${roomNumber}`, {
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

    // Fetch and display existing rooms
    fetchRooms();

    // Add event listener to room form for submitting new room data
    roomForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const roomNumber = document.getElementById('roomNumber').value;
        const floorNumber = document.getElementById('floorNumber').value;
        const hotelID = document.getElementById('hotelID').value;
        const chainName = ''; document.getElementById('chainName').value;
        const amenities = []; document.getElementById('amenities').value.split(', ');
        const viewType = ''; document.getElementById('viewType').value;
        const canBeExtended = false; document.getElementById('canBeExtended').checked;
        const stringComment = ''; document.getElementById('stringComment').value;
        const isRenting = false; document.getElementById('isRenting').checked;
        
        // Create an object with room data
        const roomData = {
            roomNumber,
            floorNumber,
            hotelID,
            chainName,
            amenities,
            viewType,
            canBeExtended,
            stringComment,
            isRenting
        };

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
            } else {
                throw new Error('Failed to add room');
            }
        })
        .catch(error => console.error('Error adding room:', error));
    });
});
