<?php


require_once(__DIR__ . "/../conexion/conexion.php");

class habitaciones
{


    private $conexion;

    public function __construct()
    {

        $this->conexion = new conexion();
    }



    public function getAllHabitacionesHotel()
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones");
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllRoomsHotelWithDetails($category)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones INNER JOIN tipo_habitacion ON 
        habitaciones.tipoHabitacion=tipo_habitacion.categoria where habitaciones.tipoHabitacion=?");
        $consulta->bind_param("s", $category);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }



    public function getAllCategoryRooms()
    {


        $consulta = $this->conexion->conectar()->prepare("select * from tipo_habitacion");
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }



    public function getHabitacionDisponible($fechaLlegadaNuevaReserva, $fechaSalidaNuevaReserva, $numHabitacion)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
        (fechaLlegadaHabitacion >? or fechaSalidaHabitacion<?) and numHabitacionReservada=? ");
        $consulta->execute();

        $consulta->bind_param("ssi", $fechaSalidaNuevaReserva, $fechaLlegadaNuevaReserva, $numHabitacion);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }
    public function getAllRoomBookingAvailableDistinctIdBooking(
        $fechaLlegadaNuevaReserva,
        $fechaSalidaNuevaReserva,
        $numHabitacion,
        $idBooking
    ) {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
        (fechaLlegadaHabitacion >? or fechaSalidaHabitacion<?) and numHabitacionReservada=? and idReservaHabitacion!=?");
        $consulta->execute();

        $consulta->bind_param("ssii", $fechaSalidaNuevaReserva, $fechaLlegadaNuevaReserva, $numHabitacion, $idBooking);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllHabitacionesReservadas()
    {



        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada");

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getAllHabitacionesReservadasYear($year)
    {



        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where YEAR(fechaLlegadaHabitacion)=?");
        $consulta->bind_param("s", $year);
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getHabitaciones($idReserva)
    {



        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where
     idReservaHabitacion=?");

        $consulta->bind_param("i", $idReserva);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function buscarCategoriaPorNumero($numHabitacion)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones where
     numHabitacion=?");
        $consulta->execute();

        $consulta->bind_param("i", $numHabitacion);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getAllHabitacionesCategoria($categoria)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones where 
      tipoHabitacion=?");
        $consulta->bind_param("s", $categoria);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function habitacionesReservadas($numHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=?");
        $consulta->bind_param("i", $numHabitacion);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }




    public function allBookingsRoomDistinctIdBooking($numHabitacion, $idBooking)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=? && idReservaHabitacion!=?");
        $consulta->bind_param("ii", $numHabitacion, $idBooking);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function roomsBookingAndDetails($idBooking)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada 
        INNER JOIN habitaciones ON habitacion_reservada.numHabitacionReservada=habitaciones.numHabitacion
       INNER JOIN tipo_habitacion ON habitaciones.tipoHabitacion=tipo_habitacion.categoria 
       where habitacion_reservada.idReservaHabitacion=?");
        $consulta->bind_param("i", $idBooking);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function reservasHabitacionOcupada($numHabitacion, $hoy)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=? and fechaLlegadaHabitacion <=? and fechaSalidaHabitacion>=?");
        $consulta->bind_param("iss", $numHabitacion, $hoy, $hoy);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_array(MYSQLI_ASSOC);
    }


    public function setHabitacionReservada(
        $idReserva,
        $idCliente,
        $numHabitacion,
        $fechaLlegada,
        $fechaSalida,
        $adultos,
        $ninos
    ) {


        $consulta = $this->conexion->conectar()->prepare("insert into habitacion_reservada
        (idReservaHabitacion,idClienteHabitacion,numHabitacionReservada,fechaLlegadaHabitacion,fechaSalidaHabitacion,adultos,ninos) values (?,?,?,?,?,?,?)");
        $consulta->bind_param("iiissii", $idReserva, $idCliente, $numHabitacion, $fechaLlegada, $fechaSalida, $adultos, $ninos);

        $resultado = $consulta->execute();

        if ($resultado) {
            return $resultado;
        } else {
            return $consulta->error;
        }
    }



    public function deleteHabitacionReserva($idReserva, $numHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("delete from habitacion_reservada where 
        idReservaHabitacion=? and numHabitacionReservada=?");
        $consulta->bind_param("ii", $idReserva, $numHabitacion);
        return $consulta->execute();
    }

    public function getAllYearsWithRoomsBooking()
    {
        $query = $this->conexion->conectar()->prepare("select DISTINCT YEAR(fechaLlegadaHabitacion) from habitacion_reservada");
        $query->execute();
        $results = $query->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllBookingsByRoomAndYearLimit($numRoom, $year, $index)
    {
        $query = $this->conexion->conectar()->prepare("select idReserva,idCliente,correo,fechaLlegada,fechaSalida from habitacion_reservada INNER JOIN reserva_habitacion ON 
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
        $query = $this->conexion->conectar()->prepare("select idReserva,idCliente,correo,fechaLlegada,fechaSalida from habitacion_reservada INNER JOIN reserva_habitacion ON 
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
        $query = $this->conexion->conectar()->prepare("select idReserva,idCliente,correo,fechaLlegada,fechaSalida from habitacion_reservada INNER JOIN reserva_habitacion ON 
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
        $query = $this->conexion->conectar()->prepare("select * from habitacion_reservada INNER JOIN reserva_habitacion ON 
        habitacion_reservada.idReservaHabitacion=reserva_habitacion.idReserva where habitacion_reservada.numHabitacionReservada=? and 
        reserva_habitacion.fechaLlegada>CURDATE() ORDER BY DATEDIFF(reserva_habitacion.fechaLlegada,CURDATE()) ASC LIMIT 4 ;");
        $query->bind_param("i", $numRoom);
        $query->execute();
        $results = $query->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }
}
