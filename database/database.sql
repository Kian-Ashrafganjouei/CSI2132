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

