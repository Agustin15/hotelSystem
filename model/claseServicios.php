<?php


require_once(__DIR__ . "/../conexion/conexion.php");

class servicio
{

    private $conexion;

    public function __construct()
    {
        $this->conexion = new conexion();
    }



    public function getServicesByIdBookingWithDetails($idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from serviciosExtra_habitacion 
        INNER JOIN servicio ON serviciosExtra_habitacion.idServicioHabitacion=servicio.idServicio where
        idReservaHabitacionServicio=?");
        $consulta->bind_param("i", $idReserva);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado;
    }



    public function getHistoryServicesByCurrentBookingRoom($numRoom, $idBooking)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from serviciosextra_habitacion where 
        idReservaHabitacionServicio=? && numHabitacionServicio=?");
        $consulta->bind_param("ii", $idBooking, $numRoom);
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllServicesHotel()
    {

        $consulta = $this->conexion->conectar()->prepare("select nombreServicio,descripcionServicio,imagen from servicio 
        group by nombreServicio");
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }
}
