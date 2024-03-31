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
    cardNumber VARCHAR(100) NOT NULL,
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

CREATE TABLE book (
    bookingID SERIAL PRIMARY KEY, -- Add a booking ID as primary key
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    customerName VARCHAR(100) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    roomNumber INT,
    floorNumber INT,
    hotelID INT REFERENCES hotel(hotel_id),
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

-- Insert additional addresses for Trader Bay hotels with modified street names and real country names, some unchanged postal codes
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('Pine Grove', '2', '12345', NULL, 'Port Harbor', 'United States'),  -- Address for the fourth Trader Bay hotel
    ('Ocean View', '20', '12345', NULL, 'Port Harbor', 'United States'),  -- Address for the fifth Trader Bay hotel
    ('Maple Lane', '15', '67890', NULL, 'Green Valley', 'Australia'),     -- Address for the sixth Trader Bay hotel
    ('Sunset Boulevard', '30', '86420', NULL, 'Sunset Beach', 'United Kingdom'),  -- Address for the seventh Trader Bay hotel
    ('Mountain View', '25', '09876', NULL, 'Mountainview', 'New Zealand'),  -- Address for the eighth Trader Bay hotel
    ('River Road', '35', '13579', NULL, 'Riverside', 'France'),  -- Address for the ninth Trader Bay hotel
    ('Lake Street', '40', '75319', NULL, 'Sunset Valley', 'Germany'),  -- Address for the tenth Trader Bay hotel
    ('Highland Avenue', '45', '95173', NULL, 'Lakeview', 'Italy');     -- Address for the eleventh Trader Bay hotel

-- Insert additional addresses for Hospitality Group hotels with modified street names and real country names, some unchanged postal codes
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('Cedar Lane', '40', '23456', NULL, 'Greenville', 'Canada'),  -- Address for the fourth Hospitality Group hotel
    ('Maple Avenue', '50', '23456', NULL, 'Greenville', 'Canada'),  -- Address for the fifth Hospitality Group hotel
    ('Oak Street', '45', '24680', NULL, 'Oakville', 'Australia'),     -- Address for the sixth Hospitality Group hotel
    ('Elm Drive', '60', '79420', NULL, 'Crack Town', 'United Kingdom'),  -- Address for the seventh Hospitality Group hotel
    ('River Street', '55', '79420', NULL, 'Crack Town', 'United Kingdom'),  -- Address for the eighth Hospitality Group hotel
    ('Forest Road', '65', '13579', NULL, 'Riverside', 'France'),  -- Address for the ninth Hospitality Group hotel
    ('Sunset Drive', '70', '75319', NULL, 'Sunset Valley', 'Germany'),  -- Address for the tenth Hospitality Group hotel
    ('Lakeview Avenue', '75', '95173', NULL, 'Lakeview', 'Italy');     -- Address for the eleventh Hospitality Group hotel

-- Insert additional addresses for Sunset Resorts hotels with different cities and modified street names, real country names, and varying postal codes
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('Ocean View Drive', '60', '12345', NULL, 'Port Harbor', 'United States'),  -- Address for the fourth Sunset Resorts hotel
    ('Hilltop Avenue', '70', '75319', NULL, 'Mountainville', 'Canada'),  -- Address for the fifth Sunset Resorts hotel
    ('Beachfront Road', '65', '75319', NULL, 'Mountainville', 'Canada'),     -- Address for the sixth Sunset Resorts hotel
    ('Cliffside Lane', '80', '35791', NULL, 'Clifftown', 'United Kingdom'),  -- Address for the seventh Sunset Resorts hotel
    ('Seaside Boulevard', '75', '64208', NULL, 'Oceanview', 'New Zealand'),  -- Address for the eighth Sunset Resorts hotel
    ('Mountain View Avenue', '85', '18642', NULL, 'Hilltop', 'France'),  -- Address for the ninth Sunset Resorts hotel
    ('Lakeside Drive', '90', '51937', NULL, 'Lakeland', 'Germany'),  -- Address for the tenth Sunset Resorts hotel
    ('Riverside Terrace', '95', '27483', NULL, 'Riverfront', 'Italy');     -- Address for the eleventh Sunset Resorts hotel

-- Insert additional addresses for Grand Lodges hotels with different cities and modified street names, real country names, and varying postal codes
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('Evergreen Lane', '80', '12345', NULL, 'Port Harbor', 'United States'),  -- Address for the fourth Grand Lodges hotel
    ('Valley View Drive', '90', '18642', NULL, 'Valleytown', 'United States'),  -- Address for the fifth Grand Lodges hotel
    ('River Bend Road', '85', '51937', NULL, 'Riverdale', 'Canada'),     -- Address for the sixth Grand Lodges hotel
    ('Forest Hill Drive', '95', '27483', NULL, 'Riverfront', 'Italy'),  -- Address for the seventh Grand Lodges hotel
    ('Meadowbrook Lane', '100', '74592', NULL, 'Meadowview', 'Australia'),  -- Address for the eighth Grand Lodges hotel
    ('Mountain View Road', '105', '83642', NULL, 'Mountainville', 'Australia'),  -- Address for the ninth Grand Lodges hotel
    ('Lakeside Drive', '110', '62938', NULL, 'Sunset Beach', 'United Kingdom'),  -- Address for the tenth Grand Lodges hotel
    ('Sunset Boulevard', '115', '62938', NULL, 'Sunset Beach', 'United Kingdom');  -- Address for the eleventh Grand Lodges hotel

-- Insert additional addresses for Pacific Hospitality hotels with different cities and modified street names, real country names, and varying postal codes
INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName)
VALUES
    ('Marine Drive', '110', '12345', NULL, 'Port Harbor', 'United States'),  -- Address for the fourth Pacific Hospitality hotel
    ('Harbor View Avenue', '120', '23232', NULL, 'Harbor City', 'United States'),  -- Address for the fifth Pacific Hospitality hotel
    ('Coastal Highway', '115', '98765', NULL, 'Coastalton', 'Australia'),     -- Address for the sixth Pacific Hospitality hotel
    ('Beachfront Road', '125', '98765', NULL, 'Coastalton', 'Australia'),  -- Address for the seventh Pacific Hospitality hotel
    ('Island Avenue', '130', '86421', NULL, 'Islandia', 'Canada'),  -- Address for the eighth Pacific Hospitality hotel
    ('Seaview Terrace', '135', '13579', NULL, 'Seaville', 'Canada'),  -- Address for the ninth Pacific Hospitality hotel
    ('Coral Reef Lane', '140', '97532', NULL, 'Coral Cove', 'United Kingdom'),  -- Address for the tenth Pacific Hospitality hotel
    ('Lighthouse Road', '145', '86422', NULL, 'Lighthouse Point', 'United Kingdom');  -- Address for the eleventh Pacific Hospitality hotel


-- Insert hotels for "Trader Bay" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (3, 5, 'Trader Bay', 1),
    (4, 5, 'Trader Bay', 2),
    (2, 5, 'Trader Bay', 3),
    (3, 5, 'Trader Bay', 4),
    (5, 5, 'Trader Bay', 5),
    (2, 5, 'Trader Bay', 6),
    (4, 5, 'Trader Bay', 7),
    (2, 5, 'Trader Bay', 8);

-- Insert hotels for "Hospitality Group" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (5, 5, 'Hospitality Group', 9),  
    (3, 5, 'Hospitality Group', 10),
    (4, 5, 'Hospitality Group', 11),  
    (3, 5, 'Hospitality Group', 12),
    (1, 5, 'Hospitality Group', 13),  
    (3, 5, 'Hospitality Group', 14),
    (2, 5, 'Hospitality Group', 15),  
    (3, 5, 'Hospitality Group', 16);

-- Insert hotels for "Sunset Resorts" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (5, 5, 'Sunset Resorts', 17),  
    (3, 5, 'Sunset Resorts', 18),
    (4, 5, 'Sunset Resorts', 19),  
    (3, 5, 'Sunset Resorts', 20),
    (1, 5, 'Sunset Resorts', 21),  
    (3, 5, 'Sunset Resorts', 22),
    (2, 5, 'Sunset Resorts', 23),  
    (3, 5, 'Sunset Resorts', 24);

-- Insert hotels for "Grand Lodges" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (5, 5, 'Grand Lodges', 25),  
    (3, 5, 'Grand Lodges', 26),
    (4, 5, 'Grand Lodges', 27),  
    (3, 5, 'Grand Lodges', 28),
    (1, 5, 'Grand Lodges', 29),  
    (3, 5, 'Grand Lodges', 30),
    (2, 5, 'Grand Lodges', 31),  
    (3, 5, 'Grand Lodges', 32);

-- Insert hotels for "Pacific Hospitality" chain
INSERT INTO hotel (category, number_of_rooms, chain_name, addressID)
VALUES
    (5, 5, 'Pacific Hospitality', 33),  
    (3, 5, 'Pacific Hospitality', 34),
    (4, 5, 'Pacific Hospitality', 35),  
    (3, 5, 'Pacific Hospitality', 36),
    (1, 5, 'Pacific Hospitality', 37),  
    (3, 5, 'Pacific Hospitality', 38),
    (2, 5, 'Pacific Hospitality', 39),  
    (3, 5, 'Pacific Hospitality', 40);
    

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
    ('Mark Johnson', 'receptionist', false, '123456789', 41),   
    ('Emily Davis', 'room service', false, '987654321', 42),    
    ('David Wilson', 'custodian', false, '123123123', 43),     
    ('Sarah Martinez', 'receptionist', false, '123456789', 44), 
    ('Michael Anderson', 'room service', false, '987654321', 45), 
    ('Jessica Thomas', 'custodian', false, '123123123', 46),      
    ('Daniel Jackson', 'receptionist', false, '123456789', 47), 
    ('Linda White', 'room service', false, '987654321', 48),    
    ('Christopher Harris', 'custodian', false, '123123123', 49), 
    ('Amanda Lee', 'receptionist', false, '123456789', 50);     


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
('Customer 1', 'customer1@example.com', '1234567890', '123456789', 'Driver Licence', '2024-03-28', 51),
('Customer 2', 'customer2@example.com', '2345678901', '234567890', 'Passport', '2024-03-28', 52),
('Customer 3', 'customer3@example.com', '3456789012', '345678901', 'Health Card', '2024-03-28', 53),
('Customer 4', 'customer4@example.com', '4567890123', '456789012', 'SSN/SIN', '2024-03-28', 54),
('Customer 5', 'customer5@example.com', '5678901234', '567890123', 'Identity Card', '2024-03-28', 55),
('Customer 6', 'customer6@example.com', '6789012345', '678901234', 'Driver Licence', '2024-03-28', 56),
('Customer 7', 'customer7@example.com', '7890123456', '789012345', 'Passport', '2024-03-28', 57),
('Customer 8', 'customer8@example.com', '8901234567', '890123456', 'Health Card', '2024-03-28', 58),
('Customer 9', 'customer9@example.com', '9012345678', '901234567', 'SSN/SIN', '2024-03-28', 59),
('Customer 10', 'customer10@example.com', '0123456789', '012345678', 'Identity Card', '2024-03-28', 60);

-- Insert rooms for multiple hotels at once
INSERT INTO room (roomNumber, floorNumber, hotelID, amenities, viewType, price, capacity, canBeExtended, stringComment, isRenting)
VALUES
    (101, 1, 1, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Single', true, 'Room with a view of the mountains', false),
    (102, 1, 1, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Double', true, 'Room with a view of the sea', false),
    (103, 1, 1, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Quad', true, 'Room with a mountain view and bathtub', false),
    (201, 2, 1, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (202, 2, 1, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 2, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 2, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Double', true, 'Room with a view of the sea', false),
    (103, 1, 2, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (202, 2, 2, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 2, ARRAY['WiFi', 'TV'], 'Mountain', 90, 'Single', true, 'Small room with a mountain dew', false),

    (101, 1, 3, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 3, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (103, 1, 3, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (202, 2, 3, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (303, 3, 3, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 4, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 4, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 4, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 4, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 4, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 5, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 5, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 5, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 5, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 5, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 6, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 6, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 6, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 6, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 6, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 7, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 7, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 7, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 7, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 7, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 8, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 8, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 8, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 8, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 8, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 9, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 9, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 9, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 9, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 9, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 10, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 10, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 10, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 10, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 10, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 11, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Single', true, 'Room with a view of the mountains', false),
    (102, 1, 11, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Double', true, 'Room with a view of the sea', false),
    (103, 1, 11, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Quad', true, 'Room with a mountain view and bathtub', false),
    (201, 2, 11, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (202, 2, 11, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 12, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 12, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Double', true, 'Room with a view of the sea', false),
    (103, 1, 12, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (202, 2, 12, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 12, ARRAY['WiFi', 'TV'], 'Mountain', 90, 'Single', true, 'Small room with a mountain dew', false),

    (101, 1, 13, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 13, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (103, 1, 13, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (202, 2, 13, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (303, 3, 13, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 14, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 14, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 14, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 14, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 14, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 15, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 15, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 15, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 15, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 15, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 16, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 16, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 16, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 16, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 16, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 17, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 17, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 17, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 17, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 17, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 18, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 18, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 18, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 18, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 18, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 19, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 19, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 19, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 19, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 19, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 20, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 20, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 20, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 20, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 20, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 21, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Single', true, 'Room with a view of the mountains', false),
    (102, 1, 21, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Double', true, 'Room with a view of the sea', false),
    (103, 1, 21, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Quad', true, 'Room with a mountain view and bathtub', false),
    (203, 2, 21, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (202, 2, 21, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 22, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 22, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Double', true, 'Room with a view of the sea', false),
    (103, 1, 22, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (202, 2, 22, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 22, ARRAY['WiFi', 'TV'], 'Mountain', 90, 'Single', true, 'Small room with a mountain dew', false),

    (101, 1, 23, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 23, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (103, 1, 23, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (202, 2, 23, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (303, 3, 23, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 24, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 24, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (204, 2, 24, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (203, 2, 24, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 24, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 25, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 25, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 25, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 25, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 25, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 26, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 26, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 26, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 26, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 26, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 27, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 27, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 27, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 27, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 27, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 28, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 28, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 28, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 28, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 28, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 29, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 29, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 29, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 29, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 29, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 30, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 30, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 30, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 30, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 30, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 31, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Single', true, 'Room with a view of the mountains', false),
    (102, 1, 31, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Double', true, 'Room with a view of the sea', false),
    (103, 1, 31, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Quad', true, 'Room with a mountain view and bathtub', false),
    (201, 2, 31, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (202, 2, 31, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 32, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 32, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Double', true, 'Room with a view of the sea', false),
    (103, 1, 32, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (202, 2, 32, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 32, ARRAY['WiFi', 'TV'], 'Mountain', 90, 'Single', true, 'Small room with a mountain dew', false),

    (101, 1, 33, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 33, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Single', true, 'Room with a view of the sea', false),
    (103, 1, 33, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (202, 2, 33, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (303, 3, 33, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 34, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 34, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 34, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 34, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 34, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 35, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 35, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 35, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 35, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 35, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 36, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 36, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 36, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 36, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 36, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 37, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 37, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 37, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 37, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 37, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 38, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 38, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 38, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 38, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 38, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 39, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 39, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (204, 2, 39, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (203, 2, 39, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 39, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false),

    (101, 1, 40, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Air Conditioning'], 'Mountain', 100, 'Double', true, 'Room with a view of the mountains', false),
    (102, 1, 40, ARRAY['WiFi', 'Mini Fridge', 'Balcony'], 'Sea', 120, 'Quad', true, 'Room with a view of the sea', false),
    (203, 2, 40, ARRAY['WiFi', 'TV', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (204, 2, 40, ARRAY['WiFi', 'TV', 'Mini Fridge', 'Bathtub'], 'Mountain', 90, 'Single', true, 'Room with a mountain view and bathtub', false),
    (303, 3, 40, ARRAY['WiFi', 'Mini Fridge', 'Bathtub'], 'Mountain', 150, 'Quad', true, 'Room with a mountain view and bathtub', false);

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
