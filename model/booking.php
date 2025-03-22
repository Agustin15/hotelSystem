<?php

require_once(__DIR__ . "/../config/connection.php");

class Booking
{

    public $idBooking, $idClient, $dateStart, $dateEnd, $quantityRooms = null;

    private $connection;

    public function __construct()
    {
        $this->connection = Connection::getInstance()->getConnection();
    }

    public function setIdBooking($idBooking)
    {

        $this->idBooking = $idBooking;
    }

    public function setIdClient($idClient)
    {

        $this->idClient = $idClient;
    }


    public function setDateStart($startDate)
    {

        $this->dateStart = $startDate;
    }

    public function setDateEnd($endDate)
    {

        $this->dateEnd = $endDate;
    }

    public function setQuantityRooms($quantityRooms)
    {

        $this->quantityRooms = $quantityRooms;
    }


    public function  deleteBookingById($idBooking)
    {

        $query = $this->connection->prepare("delete from reserva_habitacion where idReserva=?");
        $query->bind_param("i", $idBooking);
        $result = $query->execute();

        return $result;
    }


    public function updateBookingById()
    {

        $query = $this->connection->prepare("update reserva_habitacion set idClienteReserva=? 
        ,fechaLlegada=?,fechaSalida=?,cantidadHabitaciones=? where idReserva=?");
        $query->bind_param(
            "issii",
            $this->idClient,
            $this->dateStart,
            $this->dateEnd,
            $this->quantityRooms,
            $this->idBooking
        );

        $result = $query->execute();

        return $result;
    }


    public function addBooking()
    {


        $query = $this->connection->prepare("insert into reserva_habitacion
    (idClienteReserva,fechaLlegada,fechaSalida,cantidadHabitaciones) values(?,?,?,?) ");

        $query->bind_param(
            "issi",
            $this->idClient,
            $this->dateStart,
            $this->dateEnd,
            $this->quantityRooms
        );

        $result = $query->execute();

        return $result;
    }



    public function getAllBookings()
    {

        $query = $this->connection->prepare("select * from reserva_habitacion");
        $query->execute();

        return $query->get_result();
    }



    public function getAllBookingsOfLastWeek($weekdayStart, $weekdayEnd)
    {

        $query = $this->connection->prepare("select * from reserva_habitacion where 
        fechaLlegada>=? && fechaSalida<=?");
        $query->bind_param("ss", $weekdayStart, $weekdayEnd);
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllBookingsOfLastWeekLimitIndex($weekdayStart, $weekdayEnd, $index)
    {

        $query = $this->connection->prepare("select * from reserva_habitacion INNER JOIN clientes ON 
        clientes.idCliente=reserva_habitacion.idClienteReserva where reserva_habitacion.fechaLlegada>=? && 
        reserva_habitacion.fechaSalida<=? LIMIT 10 OFFSET $index");
        $query->bind_param("ss", $weekdayStart, $weekdayEnd);
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllBookingsYear($year)
    {

        $query = $this->connection->prepare("select * from reserva_habitacion where 
        YEAR(fechaLlegada) =?");
        $query->bind_param("s", $year);
        $query->execute();

        return $query->get_result();
    }

    public function getBookingById($idBooking)
    {

        $query = $this->connection->prepare("select * from reserva_habitacion INNER JOIN clientes ON 
        clientes.idCliente=reserva_habitacion.idClienteReserva where idReserva=?");
        $query->bind_param("i", $idBooking);
        $query->execute();

        $result = $query->get_result();
        return $result->fetch_array(MYSQLI_ASSOC);
    }


    public function getDataClientByIdBooking($idBooking)
    {

        $query = $this->connection->prepare("select idCliente,nombre,apellido,correo,telefono from
         reserva_habitacion INNER JOIN clientes ON reserva_habitacion.idClienteReserva=clientes.idCliente 
         where idReserva=?");
        $query->bind_param("i", $idBooking);
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_array(MYSQLI_ASSOC);
    }

    public function getBookingsYearLimit($year)
    {

        $query = $this->connection->prepare("select * from reserva_habitacion INNER JOIN clientes on
        clientes.idCliente=reserva_habitacion.idClienteReserva where YEAR(fechaLlegada)=?
         ORDER BY reserva_habitacion.fechaLlegada DESC LIMIT 10");
        $query->bind_param("i", $year);
        $query->execute();

        $result = $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllYearsBookings()
    {


        $query = $this->connection->prepare("select DISTINCT YEAR(fechaLlegada) from reserva_habitacion");
        $query->execute();

        $result = $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getBookingsYearLimitAndIndex($year, $index)
    {

        $query = $this->connection->prepare("select * from reserva_habitacion INNER JOIN clientes on
        clientes.idCliente=reserva_habitacion.idClienteReserva where YEAR(fechaLlegada)=? ORDER BY 
        reserva_habitacion.fechaLlegada LIMIT 10 OFFSET $index");
        $query->bind_param("i", $year);
        $query->execute();

        $result = $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getBookingByIdClientAndDate($idClient, $startDate, $endDate)
    {

        $query = $this->connection->prepare("select * from reserva_habitacion where 
        idClienteReserva=? and fechaLlegada=? and fechaSalida=?");
        $query->bind_param("iss", $idClient, $startDate, $endDate);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }





    public function getBookingByClientMailAndDate($mail, $startDate, $endDate)
    {

        $query = $this->connection->prepare("select * from reserva_habitacion 
        INNER JOIN clientes ON reserva_habitacion.idClienteReserva=clientes.idCliente where 
        clientes.correo=? and reserva_habitacion.fechaLlegada=? and reserva_habitacion.fechaSalida=?");
        $query->bind_param("sss", $mail, $startDate, $endDate);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }


    public function getBookingDetailsByClientMailAndDate($email, $startDate, $endDate)
    {

        $query = $this->connection->prepare("
        select * from reserva_habitacion 
        INNER JOIN clientes ON reserva_habitacion.idClienteReserva=clientes.idCliente 
        INNER JOIN habitacion_reservada ON reserva_habitacion.idReserva=habitacion_reservada.idReservaHabitacion INNER JOIN habitaciones ON 
        habitaciones.numHabitacion=habitacion_reservada.numHabitacionReservada INNER JOIN tipo_habitacion ON 
        habitaciones.tipoHabitacion=tipo_habitacion.categoria INNER JOIN pago ON pago.idReservaPago=reserva_habitacion.idReserva  
        where clientes.correo=? and reserva_habitacion.fechaLlegada=? and reserva_habitacion.fechaSalida=?");
        $query->bind_param("sss", $email, $startDate, $endDate);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
