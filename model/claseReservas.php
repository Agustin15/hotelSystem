<?php

require_once(__DIR__ . "/../conexion/conexion.php");

class reservas
{

    public $idReserva, $idCliente, $llegada, $salida, $cantidadHabitaciones = null;

    private $conexion;

    public function __construct()
    {

        $this->conexion = new conexion();
    }


    public function setIdReserva($idReserva)
    {

        $this->idReserva = $idReserva;
    }

    public function setIdCliente($idCliente)
    {

        $this->idCliente = $idCliente;
    }


    public function setLlegada($llegada)
    {

        $this->llegada = $llegada;
    }

    public function setSalida($salida)
    {

        $this->salida = $salida;
    }

    public function setCantidadHabitaciones($cantidadHabitaciones)
    {

        $this->cantidadHabitaciones = $cantidadHabitaciones;
    }


    public function getAllReservas()
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion");
        $consulta->execute();

        return $consulta->get_result();
    }



    public function getAllReservasAnio($year)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where 
        YEAR(fechaLlegada) =?");
        $consulta->bind_param("s", $year);
        $consulta->execute();

        return $consulta->get_result();
    }

    public function getReservaPoridReserva($idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion INNER JOIN clientes ON 
        clientes.idCliente=reserva_habitacion.idClienteReserva where idReserva=?");
        $consulta->bind_param("i", $idReserva);
        $consulta->execute();

        $resultado = $consulta->get_result();
        return $resultado->fetch_array(MYSQLI_ASSOC);
    }


    public function getDataClientByIdBooking($idBooking)
    {

        $query = $this->conexion->conectar()->prepare("select idCliente,nombre,apellido,correo,telefono from
         reserva_habitacion INNER JOIN clientes ON reserva_habitacion.idClienteReserva=clientes.idCliente 
         where idReserva=?");
        $query->bind_param("i", $idBooking);
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_array(MYSQLI_ASSOC);
    }

    public function getBookingsYearLimit($year)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion INNER JOIN clientes on
        clientes.idCliente=reserva_habitacion.idClienteReserva where YEAR(fechaLlegada)=?
         ORDER BY reserva_habitacion.fechaLlegada DESC LIMIT 10");
        $consulta->bind_param("i", $year);
        $consulta->execute();

        $resultado = $consulta->get_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllYearsBookings()
    {


        $consulta = $this->conexion->conectar()->prepare("select DISTINCT YEAR(fechaLlegada) from reserva_habitacion");
        $consulta->execute();

        $resultado = $consulta->get_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function getBookingsYearLimitAndIndex($year, $index)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion INNER JOIN clientes on
        clientes.idCliente=reserva_habitacion.idClienteReserva where YEAR(fechaLlegada)=? ORDER BY 
        reserva_habitacion.fechaLlegada LIMIT 10 OFFSET $index");
        $consulta->bind_param("i", $year);
        $consulta->execute();

        $resultado = $consulta->get_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function  deleteReserva($idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("delete from reserva_habitacion where idReserva=?");
        $consulta->bind_param("i", $idReserva);
        $resultado = $consulta->execute();

        return $resultado;
    }



    public function getReservaPorIdClienteAndFecha($idCliente, $fechaLlegada, $fechaSalida)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where 
        idClienteReserva=? and fechaLlegada=? and fechaSalida=?");
        $consulta->bind_param("iss", $idCliente, $fechaLlegada, $fechaSalida);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_array(MYSQLI_ASSOC);
    }





    public function getBookingByClientMailAndDate($mail, $fechaLlegada, $fechaSalida)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion 
        INNER JOIN clientes ON reserva_habitacion.idClienteReserva=clientes.idCliente where 
        clientes.correo=? and reserva_habitacion.fechaLlegada=? and reserva_habitacion.fechaSalida=?");
        $consulta->bind_param("sss", $mail, $fechaLlegada, $fechaSalida);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_array(MYSQLI_ASSOC);
    }


    public function updateReserva()
    {

        $consulta = $this->conexion->conectar()->prepare("update reserva_habitacion set idClienteReserva=? 
        ,fechaLlegada=?,fechaSalida=?,cantidadHabitaciones=? where idReserva=?");
        $consulta->bind_param(
            "issii",
            $this->idCliente,
            $this->llegada,
            $this->salida,
            $this->cantidadHabitaciones,
            $this->idReserva
        );

        $resultado = $consulta->execute();

        return $resultado;
    }


    public function addReservaBd()
    {


        $consulta = $this->conexion->conectar()->prepare("insert into reserva_habitacion
    (idClienteReserva,fechaLlegada,fechaSalida,cantidadHabitaciones) values(?,?,?,?) ");

        $consulta->bind_param(
            "issi",
            $this->idCliente,
            $this->llegada,
            $this->salida,
            $this->cantidadHabitaciones
        );

        $resultado = $consulta->execute();

        return $resultado;
    }
}
