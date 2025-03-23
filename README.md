# HotelSystem 🏨

 >## Installation ⚙
   <em><strong>Requirements:</strong></em>
  - PHP 8.4.5:
  - MySQL Server 8.0
  - Apache HTTP server 2.4
    
 ### Clone repository
 - Browse to branch folder of your Apache server
   
       git clone https://github.com/Agustin15/hotelSystem.git

 ### Install dependences  
 - cd hotelSystem
   <em><strong>Execute database Hotel script MySQL:</strong></em>
  - Start MySQL Server
  - launch mysql client
    
          mysql -u <user> -p
  - In mysql client,create hotel database
    
          Create database hotel
  - Exit of mysql client and execute the script file hotel
    
          mysql -h <hostname> -u <user> hotel<hotel.sql
    
  <em><strong>Proyect dependences:</strong></em>
        #### Install
          compose install 
       #### Dependences used 
   - php-jwt
   - phpdotenv
  
 >## Init ▶
  Start httpd server
  URL:http://localhost/hotelSystem/views/

  ## HomePage
  ![HomePage](https://i.postimg.cc/fRn1kwNy/home.png)
  
  ## RoomsPage
  ![RoomsPage](https://i.postimg.cc/jqXSTF0G/select-Rooms1.png)

  ## Dashboard admin
  ![DashboardAdmin](https://i.postimg.cc/NGJLTzJR/dashboard.png)

  ## Lists bookings
  ![ListBookings](https://i.postimg.cc/x1zrftFv/table-Bookings.png)

  ## Calendar bookings
  ![CalendarBookings](https://i.postimg.cc/nLmQ1bSX/calendar.png)

  ## Rooms hotel data
  ![RoomsHotel](https://i.postimg.cc/XY4VPMvZ/rooms-Hotel.png)

  
   
