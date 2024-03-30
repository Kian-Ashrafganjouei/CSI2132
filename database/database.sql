-- Create Database
CREATE DATABASE hotel_database;

-- Connect to the newly created database
\c hotel_database;

-- Address 
CREATE TABLE address (
    addressID SERIAL PRIMARY KEY,
    streetName VARCHAR(255) NOT NULL,
    streetNumber VARCHAR(20) NOT NULL,
    postalCode VARCHAR(20) NOT NULL,
    unitNumber VARCHAR(20),
    cityName VARCHAR(100) NOT NULL,
    countryName VARCHAR(100) NOT NULL
);

-- Create Hotel Chains Table with Chain Name as Primary Key
CREATE TABLE hotel_chain (
    chain_name VARCHAR(100) PRIMARY KEY,
    phone_number VARCHAR(20),
    email_address VARCHAR(100),
    number_of_hotels INT
);

-- Create Hotels Table with Hotel ID, Category, and Number of Rooms
CREATE TABLE hotel (
    hotel_id SERIAL PRIMARY KEY,
    category INT CHECK (category BETWEEN 1 AND 5),
    number_of_rooms INT,
    chain_name VARCHAR(100) REFERENCES hotel_chain(chain_name),
    addressID INT REFERENCES address(addressID)
);

-- Room 
CREATE TABLE room (
    roomNumber INT,
    floorNumber INT,
    hotelID INT REFERENCES hotel(hotel_id),
    amenities TEXT[],
    viewType VARCHAR(20) CHECK (viewType IN ('Mountain', 'Sea')),
    price INT,
    capacity VARCHAR(20) CHECK (capacity IN ('Single', 'Double', 'Quad')),
    canBeExtended BOOLEAN,
    stringComment TEXT,
    isRenting BOOLEAN,
    PRIMARY KEY (roomNumber, floorNumber, hotelID)
);

-- Customer
CREATE TABLE customer (
    customerName VARCHAR(100),
    emailAddress VARCHAR(255),
    phoneNumber VARCHAR(10),
    cardNumber VARCHAR(9) NOT NULL CHECK (LENGTH(cardNumber) = 9),
    idType VARCHAR(20) CHECK (idType IN ('Driver Licence', 'Passport', 'Health Card', 'SSN/SIN', 'Identity Card')),
    dateOfRegistration DATE NOT NULL,
    PRIMARY KEY (customerName, emailAddress, phoneNumber),
    addressID INT REFERENCES address(addressID)
);

-- Employee
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    employeeName VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('receptionist', 'room service', 'custodian', 'cook', 'valet')),
    isManager BOOLEAN,
    ssnNumber VARCHAR(9) NOT NULL CHECK (LENGTH(ssnNumber) = 9),
    addressID INT REFERENCES address(addressID)
);

-- Booking
CREATE TABLE book (
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    customerName VARCHAR(100) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    roomNumber INT,
    floorNumber INT,
    hotelID INT REFERENCES hotel(hotel_id),
    PRIMARY KEY (roomNumber, floorNumber, hotelID), -- Primary key declaration
    FOREIGN KEY (roomNumber, floorNumber, hotelID) REFERENCES room(roomNumber, floorNumber, hotelID),
    FOREIGN KEY (customerName, emailAddress, phoneNumber) REFERENCES customer(customerName, emailAddress, phoneNumber)
);

-- Create 5 Initial Hotel Chains with Random Data
INSERT INTO hotel_chain (chain_name, phone_number, email_address, number_of_hotels)
VALUES
    ('Trader Bay', '123-456-7890', 'info@traderbay.com', 10),
    ('Hospitality Group', '987-654-3210', 'info@hospitalitygroup.com', 15),
    ('Sunset Resorts', '555-555-5555', 'info@sunsetresorts.com', 8),
    ('Grand Lodges', '111-222-3333', 'info@grandlodges.com', 12),
    ('Pacific Hospitality', '777-888-9999', 'info@pacifichospitality.com', 20);

-- Insert addresses for Trader Bay hotels
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('123 Main Street', '1', '12345', NULL, 'Tradersville', 'Country A'),  -- Address for the first Trader Bay hotel
    ('456 Oak Avenue', '10', '54321', NULL, 'Tradersville', 'Country A'),  -- Address for the second Trader Bay hotel
    ('789 Elm Road', '5', '67890', NULL, 'Tradersville', 'Country A');     -- Address for the third Trader Bay hotel

-- Insert addresses for Hospitality Group hotels
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('111 Pine Street', '20', '13579', NULL, 'Hospitalityville', 'Country B'),  -- Address for the first Hospitality Group hotel
    ('222 Cedar Avenue', '30', '97531', NULL, 'Hospitalityville', 'Country B'),  -- Address for the second Hospitality Group hotel
    ('333 Maple Road', '25', '24680', NULL, 'Hospitalityville', 'Country B');     -- Address for the third Hospitality Group hotel

-- Insert addresses for Sunset Resorts hotels
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('444 Sunset Boulevard', '40', '86420', NULL, 'Sunsetville', 'Country C'),  -- Address for the first Sunset Resorts hotel
    ('555 Sunrise Street', '50', '09876', NULL, 'Sunsetville', 'Country C'),  -- Address for the second Sunset Resorts hotel
    ('666 Dusk Avenue', '45', '13579', NULL, 'Sunsetville', 'Country C');     -- Address for the third Sunset Resorts hotel

-- Insert addresses for Grand Lodges hotels
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('777 Forest Lane', '60', '75319', NULL, 'Grandville', 'Country D'),  -- Address for the first Grand Lodges hotel
    ('888 Mountain Road', '70', '95173', NULL, 'Grandville', 'Country D'),  -- Address for the second Grand Lodges hotel
    ('999 Lake Avenue', '65', '35791', NULL, 'Grandville', 'Country D');     -- Address for the third Grand Lodges hotel

-- Insert addresses for Pacific Hospitality hotels
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('101 Ocean Boulevard', '80', '24680', NULL, 'Pacificville', 'Country E'),  -- Address for the first Pacific Hospitality hotel
    ('202 Bay Street', '90', '86420', NULL, 'Pacificville', 'Country E'),  -- Address for the second Pacific Hospitality hotel
    ('303 Sea Road', '85', '97531', NULL, 'Pacificville', 'Country E');     -- Address for the third Pacific Hospitality hotel

-- Insert hotels for "Trader Bay" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (3, 3, 'Trader Bay', 1),  -- AddressID 1 is assumed to be for Trader Bay
    (4, 3, 'Trader Bay', 2),
    (2, 3, 'Trader Bay', 3);

-- Insert hotels for "Hospitality Group" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (5, 3, 'Hospitality Group', 4),  -- AddressID 4 is assumed to be for Hospitality Group
    (3, 3, 'Hospitality Group', 5),
    (4, 3, 'Hospitality Group', 6);

-- Insert hotels for "Sunset Resorts" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (4, 3, 'Sunset Resorts', 7),  -- AddressID 7 is assumed to be for Sunset Resorts
    (3, 3, 'Sunset Resorts', 8),
    (2, 3, 'Sunset Resorts', 9);

-- Insert hotels for "Grand Lodges" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (3, 3, 'Grand Lodges', 10),  -- AddressID 10 is assumed to be for Grand Lodges
    (4, 3, 'Grand Lodges', 11),
    (5, 3, 'Grand Lodges', 12);

-- Insert hotels for "Pacific Hospitality" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (5, 3, 'Pacific Hospitality', 13),  -- AddressID 13 is assumed to be for Pacific Hospitality
    (4, 3, 'Pacific Hospitality', 14),
    (3, 3, 'Pacific Hospitality', 15);
    

-- Insert additional default addresses
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('111 Pine Street', '20', '13579', NULL, 'Exampleville', 'Country A'),
    ('222 Cedar Avenue', '30', '97531', NULL, 'Exampletown', 'Country B'),
    ('333 Maple Road', '25', '24680', NULL, 'Examplecity', 'Country C'),
    ('444 Oak Street', '40', '86420', NULL, 'Exampleville', 'Country A'),
    ('555 Elm Avenue', '50', '09876', NULL, 'Exampletown', 'Country B'),
    ('666 Pine Road', '45', '13579', NULL, 'Examplecity', 'Country C'),
    ('777 Maple Street', '60', '75319', NULL, 'Exampleville', 'Country A'),
    ('888 Cedar Avenue', '70', '95173', NULL, 'Exampletown', 'Country B'),
    ('999 Oak Road', '65', '35791', NULL, 'Examplecity', 'Country C'),
    ('123 Elm Street', '80', '24680', NULL, 'Exampleville', 'Country A');

-- Insert additional default employees
INSERT INTO employee (employeeName, role, isManager, ssnNumber, addressID)
VALUES
    ('Mark Johnson', 'receptionist', false, '123456789', 16),   
    ('Emily Davis', 'room service', false, '987654321', 17),    
    ('David Wilson', 'custodian', false, '123123123', 18),     
    ('Sarah Martinez', 'receptionist', false, '123456789', 19), 
    ('Michael Anderson', 'room service', false, '987654321', 20), 
    ('Jessica Thomas', 'custodian', false, '123123123', 21),      
    ('Daniel Jackson', 'receptionist', false, '123456789', 22), 
    ('Linda White', 'room service', false, '987654321', 23),    
    ('Christopher Harris', 'custodian', false, '123123123', 24), 
    ('Amanda Lee', 'receptionist', false, '123456789', 25);     


-- Insert 10 new addresses
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName) VALUES
('Street A', '123', '12345', NULL, 'City A', 'Country A'),
('Street B', '456', '23456', NULL, 'City B', 'Country B'),
('Street C', '789', '34567', NULL, 'City C', 'Country C'),
('Street D', '1011', '45678', NULL, 'City D', 'Country D'),
('Street E', '1213', '56789', NULL, 'City E', 'Country E'),
('Street F', '1415', '67890', NULL, 'City F', 'Country F'),
('Street G', '1617', '78901', NULL, 'City G', 'Country G'),
('Street H', '1819', '89012', NULL, 'City H', 'Country H'),
('Street I', '2021', '90123', NULL, 'City I', 'Country I'),
('Street J', '2223', '01234', NULL, 'City J', 'Country J');

-- Insert 10 new customers with the inserted addresses
INSERT INTO customer (customerName, emailAddress, phoneNumber, cardNumber, idType, dateOfRegistration, addressID) VALUES
('Customer 1', 'customer1@example.com', '1234567890', '123456789', 'Driver Licence', '2024-03-28', 26),
('Customer 2', 'customer2@example.com', '2345678901', '234567890', 'Passport', '2024-03-28', 27),
('Customer 3', 'customer3@example.com', '3456789012', '345678901', 'Health Card', '2024-03-28', 28),
('Customer 4', 'customer4@example.com', '4567890123', '456789012', 'SSN/SIN', '2024-03-28', 29),
('Customer 5', 'customer5@example.com', '5678901234', '567890123', 'Identity Card', '2024-03-28', 30),
('Customer 6', 'customer6@example.com', '6789012345', '678901234', 'Driver Licence', '2024-03-28', 31),
('Customer 7', 'customer7@example.com', '7890123456', '789012345', 'Passport', '2024-03-28', 32),
('Customer 8', 'customer8@example.com', '8901234567', '890123456', 'Health Card', '2024-03-28', 33),
('Customer 9', 'customer9@example.com', '9012345678', '901234567', 'SSN/SIN', '2024-03-28', 34),
('Customer 10', 'customer10@example.com', '0123456789', '012345678', 'Identity Card', '2024-03-28', 35);

-- Insert rooms for multiple hotels at once
INSERT INTO room (roomNumber, floorNumber, hotelID, amenities, viewType, price, capacity, canBeExtended, stringComment, isRenting)
VALUES
    (101, 1, 1, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Single', true, 'Room with a view of the mountains', false),
    (102, 1, 1, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (103, 1, 1, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 2, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Single', true, 'Room with a view of the mountains', false),
    (102, 1, 2, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (103, 1, 2, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 3, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Single', true, 'Room with a view of the mountains', false),
    (102, 1, 3, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (103, 1, 3, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 4, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Single', true, 'Room with a view of the mountains', false),
    (102, 1, 4, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (103, 1, 4, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),

    (201, 2, 5, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Mountain', 110, 'Single', true, 'Room with a view of the mountains and balcony', false),
    (202, 2, 5, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Sea', 130, 'Single', true, 'Room with a view of the sea and air conditioning', false),
    (203, 2, 5, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 95, 'Single', true, 'Room with a mountain view and bathtub', false),

    (201, 2, 6, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Mountain', 110, 'Single', true, 'Room with a view of the mountains and balcony', false),
    (202, 2, 6, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Sea', 130, 'Single', true, 'Room with a view of the sea and air conditioning', false),
    (203, 2, 6, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 95, 'Single', true, 'Room with a mountain view and bathtub', false),

    (301, 3, 7, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 105, 'Single', true, 'Room with a view of the mountains and air conditioning', false),
    (302, 3, 7, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 125, 'Single', true, 'Room with a view of the sea and balcony', false),
    (303, 3, 7, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 95, 'Single', true, 'Room with a mountain view and bathtub', false),

    (301, 3, 8, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 105, 'Single', true, 'Room with a view of the mountains and air conditioning', false),
    (302, 3, 8, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 125, 'Single', true, 'Room with a view of the sea and balcony', false),
    (303, 3, 8, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 95, 'Single', true, 'Room with a mountain view and bathtub', false),

    (301, 3, 9, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 105, 'Double', true, 'Room with a view of the mountains and air conditioning', false),
    (302, 3, 9, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 125, 'Double', true, 'Room with a view of the sea and balcony', false),
    (303, 3, 9, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 95, 'Double', true, 'Room with a mountain view and bathtub', false),

    (401, 4, 10, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Mountain', 115, 'Double', true, 'Room with a view of the mountains and balcony', false),
    (402, 4, 10, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Sea', 135, 'Double', true, 'Room with a view of the sea and air conditioning', false),
    (403, 4, 10, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 100, 'Double', true, 'Room with a mountain view and bathtub', false),

    (401, 4, 11, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Mountain', 115, 'Double', true, 'Room with a view of the mountains and balcony', false),
    (402, 4, 11, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Sea', 135, 'Double', true, 'Room with a view of the sea and air conditioning', false),
    (403, 4, 11, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 100, 'Double', true, 'Room with a mountain view and bathtub', false),
    
    (401, 4, 12, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Mountain', 125, 'Double', true, 'Room with a view of the mountains and balcony', false),
    (402, 4, 12, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Sea', 135, 'Double', true, 'Room with a view of the sea and air conditioning', false),
    (403, 4, 12, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 100, 'Double', true, 'Room with a mountain view and bathtub', false),

    (401, 4, 13, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Mountain', 135, 'Double', true, 'Room with a view of the mountains and balcony', false),
    (402, 4, 13, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Sea', 135, 'Double', true, 'Room with a view of the sea and air conditioning', false),
    (403, 4, 13, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 100, 'Double', true, 'Room with a mountain view and bathtub', false),

    (501, 5, 14, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 120, 'Quad', true, 'Room with a view of the mountains and air conditioning', false),
    (502, 5, 14, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 140, 'Quad', true, 'Room with a view of the sea and balcony', false),
    (503, 5, 14, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 105, 'Quad', true, 'Room with a mountain view and bathtub', false),
    
    (501, 5, 15, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 120, 'Quad', true, 'Room with a view of the mountains and air conditioning', false),
    (502, 5, 15, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 140, 'Quad', true, 'Room with a view of the sea and balcony', false),
    (503, 5, 15, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 105, 'Quad', true, 'Room with a mountain view and bathtub', false);

-- Insert bookings
INSERT INTO book (startDate, endDate, customerName, emailAddress, phoneNumber, roomNumber, floorNumber, hotelID)
VALUES
    ('2024-04-01', '2024-04-05', 'Customer 1', 'customer1@example.com', '1234567890', 101, 1, 1),
    ('2024-04-02', '2024-04-06', 'Customer 2', 'customer2@example.com', '2345678901', 102, 1, 1),
    ('2024-04-03', '2024-04-07', 'Customer 3', 'customer3@example.com', '3456789012', 103, 1, 1),
    ('2024-04-04', '2024-04-08', 'Customer 4', 'customer4@example.com', '4567890123', 101, 1, 2),
    ('2024-04-05', '2024-04-09', 'Customer 5', 'customer5@example.com', '5678901234', 102, 1, 2),
    ('2024-04-06', '2024-04-10', 'Customer 6', 'customer6@example.com', '6789012345', 103, 1, 2),
    ('2024-04-07', '2024-04-11', 'Customer 7', 'customer7@example.com', '7890123456', 101, 1, 3),
    ('2024-04-08', '2024-04-12', 'Customer 8', 'customer8@example.com', '8901234567', 102, 1, 3),
    ('2024-04-09', '2024-04-13', 'Customer 9', 'customer9@example.com', '9012345678', 103, 1, 3),
    ('2024-04-10', '2024-04-14', 'Customer 10', 'customer10@example.com', '0123456789', 101, 1, 4);

-- View 1: Number of available rooms per area
CREATE VIEW available_rooms_per_area AS
SELECT a.cityName AS area,
       COUNT(r.roomNumber) AS available_rooms
FROM room r
JOIN hotel h ON r.hotelID = h.hotel_id
JOIN address a ON h.addressID = a.addressID
LEFT JOIN book b ON r.roomNumber = b.roomNumber AND r.hotelID = b.hotelID
WHERE b.roomNumber IS NULL
GROUP BY a.cityName;

-- View 2: Aggregated capacity of all rooms in a specific hotel
CREATE OR REPLACE VIEW hotel_aggregated_capacity AS
SELECT 
    h.hotel_id,
    h.chain_name,
    SUM(
        CASE 
            WHEN r.capacity = 'Single' THEN 1
            WHEN r.capacity = 'Double' THEN 2
            WHEN r.capacity = 'Quad' THEN 4
            ELSE 0
        END
    ) AS total_capacity
FROM 
    hotel h
JOIN 
    room r ON h.hotel_id = r.hotelID
GROUP BY 
    h.hotel_id, 
    h.chain_name;


CREATE OR REPLACE FUNCTION enforce_room_existence()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM room
        WHERE roomNumber = NEW.roomNumber
        AND floorNumber = NEW.floorNumber
        AND hotelID = NEW.hotelID
    ) THEN
        RAISE EXCEPTION 'Cannot book non-existent room';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_room_existence_trigger
BEFORE INSERT ON book
FOR EACH ROW
EXECUTE FUNCTION enforce_room_existence();

CREATE OR REPLACE FUNCTION update_number_of_hotels()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE hotel_chain
        SET number_of_hotels = number_of_hotels + 1
        WHERE chain_name = NEW.chain_name;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE hotel_chain
        SET number_of_hotels = number_of_hotels - 1
        WHERE chain_name = OLD.chain_name;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_number_of_hotels_trigger
AFTER INSERT OR DELETE ON hotel
FOR EACH ROW
EXECUTE FUNCTION update_number_of_hotels();


CREATE INDEX idx_chain_name ON hotel_chain (chain_name);
CREATE INDEX idx_hotel_id ON hotel (hotel_id);
CREATE INDEX idx_customer_identifier ON customer (customerName, emailAddress, phoneNumber);
CREATE INDEX idx_employee_identifier ON employee (employeeName, ssnNumber);
CREATE INDEX idx_room_identifier ON room (roomNumber, floorNumber, hotelID);
