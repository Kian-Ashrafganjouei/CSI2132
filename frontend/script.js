document.addEventListener('DOMContentLoaded', () => {
    const hotelForm = document.getElementById('hotelForm');
    const hotelList = document.getElementById('hotelList');

    // Fetch hotels from server and display them
    function fetchHotels() {
        fetch('/hotels')
            .then(response => response.json())
            .then(data => {
                hotelList.innerHTML = '';
                data.forEach(hotel => {
                    const item = document.createElement('div');
                    item.textContent = `Hotel Name: ${hotel.hotel_name}, User Input: ${hotel.user_input}`;
                    hotelList.appendChild(item);
                });
            })
            .catch(error => console.error('Error fetching hotels:', error));
    }

    fetchHotels();

    // Add new hotel
    hotelForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const hotelName = document.getElementById('hotelName').value;
        const userInput = document.getElementById('userInput').value;

        fetch('/hotels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hotelName, userInput })
        })
        .then(response => {
            if (response.ok) {
                fetchHotels();
                hotelForm.reset();
            } else {
                throw new Error('Failed to add hotel');
            }
        })
        .catch(error => console.error('Error adding hotel:', error));
    });
});