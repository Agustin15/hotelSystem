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


 


     

}
