document.addEventListener('DOMContentLoaded', () => {
    const hotelForm = document.getElementById('hotelForm');
    const hotelChainForm = document.getElementById('hotelChainForm');
    const hotelList = document.getElementById('hotelList');
    const hotelChainList = document.getElementById('hotelChainList');
    const chainNameSelect = document.getElementById('chain_name_dynamic');

    // Fetch hotels from server and display them
    function fetchHotelChains() {
        fetch('/hotel_chains')
            .then(response => response.json())
            .then(data => {
                hotelChainList.innerHTML = '';
                chainNameSelect.innerHTML = '';

                data.forEach(chain => {

                    const option = document.createElement('option');
                    option.value = chain.chain_name;
                    option.textContent = chain.chain_name;
                    chainNameSelect.appendChild(option);

                    const item = document.createElement('div');

                    const chainNameElement = document.createElement('p');
                    chainNameElement.textContent = `Hotel Chain Name: ${chain.chain_name}`;
                    

                    const phoneNumberElement = document.createElement('p');
                    phoneNumberElement.textContent = `Phone Number: ${chain.phone_number}`;
                    
                    const emailAddressElement = document.createElement('p');
                    emailAddressElement.textContent = `Email Address: ${chain.email_address}`;
                    
                    const numberOfHotelsElement = document.createElement('p');
                    numberOfHotelsElement.textContent = `Number of Hotels: ${chain.number_of_hotels}`;
                    
                    // Append each element to the item container
                    item.appendChild(chainNameElement);
                    item.appendChild(phoneNumberElement);
                    item.appendChild(emailAddressElement);
                    item.appendChild(numberOfHotelsElement);
                    
                    // Append the item container to the hotelChainList
                    hotelChainList.appendChild(item);
                    // Add a line break after appending the item container
                    hotelChainList.appendChild(document.createElement('br'));
                });
            })
            .catch(error => console.error('Error fetching hotel chains:', error));
    }

        // Fetch hotels from server and display them
        function fetchHotels() {
            fetch('/hotels')
                .then(response => response.json())
                .then(data => {
                    hotelList.innerHTML = '';
    
                    data.forEach(hotel => {
    
                        // const option = document.createElement('option');
                        // option.value = chain.chain_name;
                        // option.textContent = chain.chain_name;
                        // chainNameSelect.appendChild(option);
    
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
    
    fetchHotels();
    fetchHotelChains();

    // Add new hotel chain
    hotelChainForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const chain_name = document.getElementById('chain_name').value;
        const phone_number = document.getElementById('phone_number').value;
        const email_address = document.getElementById('email_address').value;
        const number_of_hotels = document.getElementById('number_of_hotels').value;
        fetch('/hotel_chain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chain_name, phone_number, email_address, number_of_hotels })
        })
        .then(response => {
            if (response.ok) {
                fetchHotels();
                hotelChainForm.reset();
            } else {
                throw new Error('Failed to add hotel chain');
            }
        })
        .catch(error => console.error('Error adding hotel chain:', error));
    });


    // Add new hotel
    hotelForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const chain_name = document.getElementById('chain_name_dynamic').value;
        const category = document.getElementById('category').value;
        const numberOfRooms = document.getElementById('numberOfRooms').value;
        fetch('/hotels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chain_name, category, numberOfRooms})
        })
        .then(response => {
            if (response.ok) {
                fetchHotels();
                hotelChainForm.reset();
            } else {
                throw new Error('Failed to add hotel');
            }
        })
        .catch(error => console.error('Error adding hotel:', error));
    });
});