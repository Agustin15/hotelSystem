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

    public function getReservasHabilitadas($hoy)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where fechaSalida>=?");
        $consulta->bind_param("s", $hoy);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function getClientesReservas($mes)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion 
     where  idClienteReserva in(select distinct idClienteReserva from reserva_habitacion) and MONTH(fechaLlegada)=?");
        $consulta->bind_param("s", $mes);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->num_rows;
    }


    public function getReservaPoridReserva($idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where idReserva=?");
        $consulta->bind_param("i", $idReserva);
        $consulta->execute();

        $resultado = $consulta->get_result();
        return $resultado->fetch_array(MYSQLI_ASSOC);
    }



    public function  deleteReserva($idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("delete from reserva_habitacion where idReserva=?");
        $consulta->bind_param("i", $idReserva);
        $resultado = $consulta->execute();

        return $resultado;
    }



    public function getReservaPorIdCliente($idCliente)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where 
        idClienteReserva=?");
        $consulta->bind_param("i", $idCliente);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
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

        return  $resultado;
    }
}

