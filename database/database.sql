-- Create Database
CREATE DATABASE hotel_database;

-- Connect to the newly created database
\c hotel_database;

-- Create Hotels Table
CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    hotel_name VARCHAR(100) NOT NULL,
    user_input VARCHAR(255) NOT NULL
);