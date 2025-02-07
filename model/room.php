<?php
require_once(__DIR__ . "/../config/connection.php");

class Room
{


    private $connection;

    public function __construct()
    {

        $this->connection = new Connection();
    }



    public function getAllRoomsHotel()
    {


        $query = $this->connection->connect()->prepare("select * from habitaciones");
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllRoomsHotelWithDetails($category)
    {


        $query = $this->connection->connect()->prepare("select * from habitaciones INNER JOIN tipo_habitacion ON 
        habitaciones.tipoHabitacion=tipo_habitacion.categoria where habitaciones.tipoHabitacion=?");
        $query->bind_param("s", $category);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function getAllCategoryRooms()
    {


        $query = $this->connection->connect()->prepare("select * from tipo_habitacion");
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function getAllRoomsAvailablesByDateAndNumRoom($dateStartNewBooking, $dateEndNewBooking, $numRoom)
    {


        $query = $this->connection->connect()->prepare("select * from habitacion_reservada where 
        (fechaLlegadaHabitacion >? or fechaSalidaHabitacion<?) and numHabitacionReservada=? ");
        $query->execute();

        $query->bind_param("ssi", $dateEndNewBooking, $dateStartNewBooking, $numRoom);

        $query->execute();

        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
    public function getAllBookingRoomAvailableDistinctIdBooking(
        $dateStartNewBooking,
        $dateEndNewBooking,
        $numRoom,
        $idBooking
    ) {


        $query = $this->connection->connect()->prepare("select * from habitacion_reservada where 
        (fechaLlegadaHabitacion >? or fechaSalidaHabitacion<?) and numHabitacionReservada=? and idReservaHabitacion!=?");
        $query->execute();

        $query->bind_param("ssii", $dateEndNewBooking, $dateStartNewBooking, $numRoom, $idBooking);

        $query->execute();

        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllRoomsBooking()
    {



        $query = $this->connection->connect()->prepare("select * from habitacion_reservada");

        $query->execute();

        $result = $query->get_result();

        return $result;
    }



    public function getAllRoomsBookingByYear($year)
    {



        $query = $this->connection->connect()->prepare("select * from habitacion_reservada where YEAR(fechaLlegadaHabitacion)=?");
        $query->bind_param("s", $year);
        $query->execute();

        $result = $query->get_result();

        return $result;
    }



    public function getAllRoomsByIdBooking($idBooking)
    {



        $query = $this->connection->connect()->prepare("select * from habitacion_reservada where
     idReservaHabitacion=?");

        $query->bind_param("i", $idBooking);

        $query->execute();

        $result = $query->get_result();

        return $result;
    }



    public function getCategoryByNumRoom($numRoom)
    {


        $query = $this->connection->connect()->prepare("select * from habitaciones where
     numHabitacion=?");
        $query->execute();

        $query->bind_param("i", $numRoom);

        $query->execute();

        $result = $query->get_result();

        return $result;
    }



    public function getRoomsByCategory($category)
    {

        $query = $this->connection->connect()->prepare("select * from habitaciones where 
      tipoHabitacion=?");
        $query->bind_param("s", $category);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function roomsBookingByNumRoom($numRoom)
    {

        $query = $this->connection->connect()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=?");
        $query->bind_param("i", $numRoom);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }




    public function allBookingsRoomDistinctIdBooking($numRoom, $idBooking)
    {

        $query = $this->connection->connect()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=? && idReservaHabitacion!=?");
        $query->bind_param("ii", $numRoom, $idBooking);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function roomsBookingAndDetails($idBooking)
    {

        $query = $this->connection->connect()->prepare("select * from habitacion_reservada 
        INNER JOIN habitaciones ON habitacion_reservada.numHabitacionReservada=habitaciones.numHabitacion
       INNER JOIN tipo_habitacion ON habitaciones.tipoHabitacion=tipo_habitacion.categoria 
       where habitacion_reservada.idReservaHabitacion=?");
        $query->bind_param("i", $idBooking);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function getStateRoomByNumRoomAndDate($numRoom, $today)
    {

        $query = $this->connection->connect()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=? and fechaLlegadaHabitacion <=? and fechaSalidaHabitacion>=?");
        $query->bind_param("iss", $numRoom, $today, $today);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }


    public function addRoomBooking(
        $idBooking,
        $idClient,
        $numRoom,
        $dateStart,
        $dateEnd,
        $adults,
        $childs
    ) {


        $query = $this->connection->connect()->prepare("insert into habitacion_reservada
        (idReservaHabitacion,idClienteHabitacion,numHabitacionReservada,fechaLlegadaHabitacion,fechaSalidaHabitacion,adultos,ninos) values (?,?,?,?,?,?,?)");
        $query->bind_param(
            "iiissii",
            $idBooking,
            $idClient,
            $numRoom,
            $dateStart,
            $dateEnd,
            $adults,
            $childs
        );

        $result = $query->execute();

        if ($result) {
            return $result;
        } else {
            return $query->error;
        }
    }



    public function deleteRoomByIdBookingAndNumRoom($idBooking, $numRoom)
    {

        $query = $this->connection->connect()->prepare("delete from habitacion_reservada where 
        idReservaHabitacion=? and numHabitacionReservada=?");
        $query->bind_param("ii", $idBooking, $numRoom);
        return $query->execute();
    }

    public function getAllYearsWithRoomsBooking()
    {
        $query = $this->connection->connect()->prepare("select DISTINCT YEAR(fechaLlegadaHabitacion) from habitacion_reservada");
        $query->execute();
        $results = $query->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllBookingsByRoomAndYearLimit($numRoom, $year, $index)
    {
        $query = $this->connection->connect()->prepare("select idReserva,idCliente,correo,fechaLlegada,fechaSalida from habitacion_reservada INNER JOIN reserva_habitacion ON 
        habitacion_reservada.idReservaHabitacion=reserva_habitacion.idReserva INNER JOIN clientes ON clientes.idCliente=
        reserva_habitacion.idClienteReserva where habitacion_reservada.numHabitacionReservada=? and
         YEAR(reserva_habitacion.fechaLlegada)=? and reserva_habitacion.fechaSalida<CURDATE() LIMIT 10 OFFSET $index");
        $query->bind_param("is", $numRoom, $year);
        $query->execute();
        $results = $query->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    public function getFirstsBookingsByRoomAndYear($numRoom, $year)
    {
        $query = $this->connection->connect()->prepare("select idReserva,idCliente,correo,fechaLlegada,fechaSalida from habitacion_reservada INNER JOIN reserva_habitacion ON 
        habitacion_reservada.idReservaHabitacion=reserva_habitacion.idReserva INNER JOIN clientes ON clientes.idCliente=
        reserva_habitacion.idClienteReserva where habitacion_reservada.numHabitacionReservada=? and
         YEAR(reserva_habitacion.fechaLlegada)=? and reserva_habitacion.fechaSalida<CURDATE() LIMIT 10");
        $query->bind_param("is", $numRoom, $year);
        $query->execute();
        $results = $query->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }
    public function getAllBookingsByRoomAndYear($numRoom, $year)
    {
        $query = $this->connection->connect()->prepare("select idReserva,idCliente,correo,fechaLlegada,fechaSalida from habitacion_reservada INNER JOIN reserva_habitacion ON 
        habitacion_reservada.idReservaHabitacion=reserva_habitacion.idReserva INNER JOIN clientes ON clientes.idCliente=
        reserva_habitacion.idClienteReserva where habitacion_reservada.numHabitacionReservada=? and
         YEAR(reserva_habitacion.fechaLlegada)=? and reserva_habitacion.fechaSalida<CURDATE()");
        $query->bind_param("is", $numRoom, $year);
        $query->execute();
        $results = $query->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    public function getNextBookingsRoom($numRoom)
    {
        $query = $this->connection->connect()->prepare("select * from habitacion_reservada INNER JOIN reserva_habitacion ON 
        habitacion_reservada.idReservaHabitacion=reserva_habitacion.idReserva where habitacion_reservada.numHabitacionReservada=? and 
        reserva_habitacion.fechaLlegada>CURDATE() ORDER BY DATEDIFF(reserva_habitacion.fechaLlegada,CURDATE()) ASC LIMIT 4 ;");
        $query->bind_param("i", $numRoom);
        $query->execute();
        $results = $query->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }
}
