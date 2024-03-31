document.addEventListener('DOMContentLoaded', () => {
    const hotelForm = document.getElementById('hotelForm');
    const hotelList = document.getElementById('hotelList');
    const hotelChainList = document.getElementById('hotelChainList');
    const chainNameSelect = document.getElementById('chain_name_dynamic');
    const availableRoomsPerAreaList = document.getElementById('availableRoomsPerAreaList');


        // Fetch hotels from server and display them
        function fetchHotels() {
            fetch('/hotels')
                .then(response => response.json())
                .then(data => {
                    hotelList.innerHTML = '';
    
                    data.forEach(hotel => {
                        const item = document.createElement('div');
    
                        const hotelIDElement = document.createElement('p');
                        hotelIDElement.textContent = `Hotel ID: ${hotel.hotel_id}`;
                        
                        const hotelCategoryElement = document.createElement('p');
                        hotelCategoryElement.textContent = `Category: ${hotel.category}`;
                        
                        const number_of_rooms = document.createElement('p');
                        number_of_rooms.textContent = `Number of Rooms: ${hotel.number_of_rooms}`;
                        
                        const hotelChainElement = document.createElement('p');
                        hotelChainElement.textContent = `Chain Name: ${hotel.chain_name}`;
                        
                        // Append each element to the item container
                        item.appendChild(hotelIDElement);
                        item.appendChild(hotelCategoryElement);
                        item.appendChild(number_of_rooms);
                        item.appendChild(hotelChainElement);
                        
                        // Append the item container to the hotelChainList
                        hotelList.appendChild(item);
                        // Add a line break after appending the item container
                        hotelList.appendChild(document.createElement('br'));
                    });
                })
                .catch(error => console.error('Error fetching hotel:', error));
        }
    
    // Fetch available rooms per area from server and display them as cards
    function fetchAvailableRoomsPerArea() {
        fetch('/available_rooms_per_area')
            .then(response => response.json())
            .then(data => {
                const cardContainer = document.getElementById('availableRoomsPerAreaList');
                cardContainer.innerHTML = ''; // Clear existing data
    
                // Loop through each area and create a card for it
                data.forEach(area => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <h3>${area.area}</h3>
                        <p>Available Rooms: ${area.available_rooms}</p>
                    `;
                    cardContainer.appendChild(card);
                });
    
                // Calculate and set the width of the card container
                const cards = cardContainer.querySelectorAll('.card');
                const containerWidth = cards.length * (cards[0].offsetWidth + 10); // Total width needed
                cardContainer.style.width = `${containerWidth}px`;
            })
            .catch(error => console.error('Error fetching available rooms per area:', error));
    }


    fetchAvailableRoomsPerArea();
    fetchHotelChains();
    fetchHotels();

});