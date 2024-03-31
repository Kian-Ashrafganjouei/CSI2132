# CSI2132
CSI2132 Deliverable 2
Kian Ashrafganjouei (300173780)
Ibrahim Daoud (300186163)
Layan Omar (300249213)

Instructions 

1. Install postgres (set password to admin in setup)
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads 

2. Install node and npm https://nodejs.org/en/download

3. Add /bin folder in C:\Program Files\PostgreSQL\16\bin to env variables (or the mac/linux equivalent)

4. git clone https://github.com/Kian-Ashrafganjouei/CSI2132.git

5. cd database

6. psql -U postgres -f database.sql

7. cd ..

8. npm install express pg

9. node server.js

10. Navigate to http://localhost:3000/ 

Debugging:

If you need to restart postgres server, please use the following command:
command to turn on postgres server: pg_ctl.exe -D C:\Program Files\PostgreSQL\16\data

Frontend info

employee password is 0000

note: we will need to work closely together to figure out how to bridge the backend and frontend together


Running Curl Querries:
curl -X POST -H "Content-Type: application/json" -d "{\"hotelChain\": \"Trader Bay\", \"viewType\": \"Mountain\", \"minRoomPrice\": 100, \"roomCapacity\": \"Double\", \"hotelChain\": \"Sunset Resorts\", \"hotelCategory\": \"\"}" http://localhost:3000/search_rooms

curl -X POST -H "Content-Type: application/json" -d "{\"hotelChain\": \"\", \"viewType\": \"Mountain\", \"minRoomPrice\": 100, \"roomCapacity\": \"Single\", \"area\": \"12345\", \"hotelCategory\": \"\"}" http://localhost:3000/search_rooms

curl -X POST -H "Content-Type: application/json" -d "{\"startDate\": \"2024-04-7\", \"endDate\": \"2024-04-9\", \"hotelID\": \"1\"}" http://localhost:3000/search_rooms