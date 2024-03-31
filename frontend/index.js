document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('hotelRoomSearch');
    const tbody = document.getElementById('searchResultsBody');

    // Function to fetch and display search results
    function fetchResults(searchParams) {
        fetch('/search_rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchParams)
        })
        .then(response => response.json())
        .then(data => {
            tbody.innerHTML = ''; // Clear existing rows
            data.forEach(room => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${room.roomnumber}</td>
                    <td>${room.floornumber}</td>
                    <td>${room.hotelid}</td>
                    <td>${room.number_of_rooms}</td>
                    <td>${room.category}</td>
                    <td>${room.chain_name}</td>
                    <td>${room.postalcode}</td>
                    <td>${room.viewtype}</td>
                    <td>${room.price}</td>
                    <td>${room.capacity}</td>
                    <td><button class="bookRoom">Book</button></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching search results:', error));
    }

    // Add event listener to search form for submitting search criteria
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');

        // Get the current date
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Convert input date strings to Date objects
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        // Validate start date is in the future
        if (startDate <= currentDate) {
            alert('Start date must be in the future.');
            return;
        }

        // Validate end date is not before start date
        if (endDate < startDate) {
            alert('End date cannot be before start date.');
            return;
        }
        
        const roomCapacity = document.getElementById('roomCapacity').value || null;
        const area = document.getElementById('area').value || null;
        const hotelChain = document.getElementById('hotelChain').value || null;
        const hotelCategory = document.getElementById('hotelCategory').value || null;
        const viewType = document.getElementById('viewType').value || null;
        const minRooms = document.getElementById('minRooms').value || null;
        const maxRooms = document.getElementById('maxRooms').value || null;
        const minRoomPrice = document.getElementById('minRoomPrice').value || null;
        const maxRoomPrice = document.getElementById('maxRoomPrice').value || null;

        // Create an object with search parameters
        const searchParams = {
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            roomCapacity,
            area,
            hotelChain,
            hotelCategory,
            viewType,
            minRooms,
            maxRooms,
            minRoomPrice,
            maxRoomPrice
        };

        // Fetch and display search results
        fetchResults(searchParams);
    });

    // Add event listener to dynamically created book buttons
    tbody.addEventListener('click', (event) => {
        if (event.target.classList.contains('bookRoom')) {
            const roomNumber = event.target.dataset.room;
            const floorNumber = event.target.dataset.floor;
            const hotelID = event.target.dataset.hotel;

            // Prompt user for customer information
            let customerName = prompt('Enter customer name:');
            let emailAddress = prompt('Enter email address:');

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            while (!emailRegex.test(emailAddress)) {
                emailAddress = prompt('Please enter a valid email address in the format name@domain.tld:');
            }

            let phoneNumber = prompt('Enter phone number:');
            // Validate phone number length
            const phoneRegex = /^\d{9}$/;
            while (!phoneRegex.test(phoneNumber)) {
                phoneNumber = prompt('Please enter a valid 9-digit phone number:');
            }

            if (!customerName || !emailAddress || !phoneNumber) {
                alert('Please provide all customer information.');
                return;
            }

            // Create an object with booking parameters
            const bookParams = {
                startDate,
                endDate,
                customerName,
                emailAddress,
                phoneNumber,
                roomNumber,
                floorNumber,
                hotelID
            };

            console.log('Booking room:', bookParams);

            // Fetch and book the room
            fetch('/book_room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookParams)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Room successfully booked');
                } else {
                    throw new Error('Failed to book room');
                }
            })
            .catch(error => console.error('Error booking room:', error));
        }
    });
});
