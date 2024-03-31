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
        const startDate = document.getElementById('startDate').value || null;
        const endDate = document.getElementById('endDate').value || null;
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
            startDate,
            endDate,
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
});
