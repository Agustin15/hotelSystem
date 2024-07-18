<?php


require_once(__DIR__ . "/../conexion/conexion.php");

class servicio
{

    private $conexion;

    public function __construct()
    {
        $this->conexion = new conexion();
    }



    public function getServiciosReserva($idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from serviciosExtra_habitacion where
        idReservaHabitacionServicio=?");
        $consulta->bind_param("i", $idReserva);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado;
    }



    public function getServiciosHabitacion($numHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from serviciosExtra_habitacion where
            numHabitacionServicio=?");
        $consulta->bind_param("i", $numHabitacion);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado;
    }


    public function getServiciosHotel()
    {

        $consulta = $this->conexion->conectar()->prepare("select * from servicio");
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function getServicioHotel($idServicio)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from servicio where idServicio=?");
        $consulta->bind_param("i", $idServicio);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_array(MYSQLI_ASSOC);
    }


    public function getServicio($servicio)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from servicio where nombreServicio=?");
        $consulta->bind_param("s", $servicio);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function addServiceToRoom($idServicio, $cantidad, $idReserva, $numHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("insert into serviciosExtra_habitacion (idServicio,cantidad,idReservaHabitacionServicio,
        numHabitacionServicio) values(?,?,?,?)");
        $consulta->bind_param("iiii",$idServicio,$cantidad,$idReserva,$numHabitacion);
       $resultado= $consulta->execute();
        
        return $resultado;
    }


    public function calculateTotalService($cantidad,$precio){

        $totalService=$cantidad*$precio;
        return $totalService;

    }
}
