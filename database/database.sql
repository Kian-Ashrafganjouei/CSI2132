-- Create Database
CREATE DATABASE hotel_database;

-- Connect to the newly created database
\c hotel_database;

-- Create Hotel Chains Table with Chain Name as Primary Key
CREATE TABLE hotel_chains (
    chain_name VARCHAR(100) PRIMARY KEY,
    phone_number VARCHAR(20),
    email_address VARCHAR(100),
    number_of_hotels INT
);

-- Create Hotels Table with Hotel ID, Category, and Number of Rooms
CREATE TABLE hotels (
    hotel_id SERIAL PRIMARY KEY,
    category INT CHECK (category BETWEEN 1 AND 5),
    number_of_rooms INT,
    chain_name VARCHAR(100) REFERENCES hotel_chains(chain_name)
);

-- Room 
CREATE TABLE room (
    roomNumber INT,
    floorNumber INT,
    hotelID INT REFERENCES hotel(hotelID),
    chain_name VARCHAR(100) REFERENCES hotel_chains(chain_name),
    amenities TEXT[],
    viewType VARCHAR(20) CHECK (viewType IN ('Mountain', 'Sea')),
    canBeExtended BOOLEAN,
    stringComment TEXT,
    isRenting BOOLEAN,
    PRIMARY KEY (roomNumber, floorNumber)
);

-- Customer
CREATE TABLE customer (
    stringName VARCHAR(100) PRIMARY KEY,
    emailAddress VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber VARCHAR(10) NOT NULL,
    idType VARCHAR(20) CHECK (idType IN ('Driver Licence', 'Passport', 'Health Card', 'SSN/SIN', 'Identity Card')),
    dateOfRegistration DATE NOT NULL,
    PRIMARY KEY (stringName, emailAddress, phoneNumber)
);

-- Address 
CREATE TABLE address (
    addressID INT AUTO_INCREMENT PRIMARY KEY,
    streetName VARCHAR(255) NOT NULL,
    streetNumber VARCHAR(20) NOT NULL,
    postalCode VARCHAR(20) NOT NULL,
    unitNumber VARCHAR(20),
    cityName VARCHAR(100) NOT NULL,
    countryName VARCHAR(100) NOT NULL
);

-- Employee
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    employeeName VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('receptionist', 'room service', 'custodian', 'cook', 'valet')),
    isManager BOOLEAN,
    ssnNumber VARCHAR(9) NOT NULL CHECK (LENGTH(ssnNumber) = 9)
);

-- Booking
CREATE TABLE booking (
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    customerName VARCHAR(100) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    roomNumber INT,
    floorNumber INT,
    FOREIGN KEY (roomNumber, floorNumber) REFERENCES room(roomNumber, floorNumber),
    FOREIGN KEY (customerName, emailAddress, phoneNumber) REFERENCES customer(stringName, emailAddress, phoneNumber)
);


