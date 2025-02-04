<?php


require_once(__DIR__ . "/../conexion/conexion.php");

class servicio
{

    private $conexion;

    public function __construct()
    {
        $this->conexion = new conexion();
    }


    public function addServiceBooking($idService, $quantity, $idBooking, $numRoom)
    {

        $query =  $this->conexion->conectar()->prepare("insert into serviciosExtra_habitacion 
          (idServicio,cantidad,idReservaHabitacionServicio,numHabitacionServicio) values (?,?,?,?) ");
        $query->bind_param("iiii", $idService, $quantity, $idBooking, $numRoom);
        $result = $query->execute();
        return $result;
    }


    public function updateServiceBooking($quantity, $idServiceRoom)
    {

        $query =  $this->conexion->conectar()->prepare("update serviciosExtra_habitacion set cantidad=?
        where idServicioHabitacion=?");
        $query->bind_param("ii", $quantity, $idServiceRoom);
        $result = $query->execute();
        return $result;
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

        $consulta = $this->conexion->conectar()->prepare("select * from serviciosextra_habitacion INNER JOIN 
        servicio ON servicio.idServicio=serviciosextra_habitacion.idServicio where serviciosextra_habitacion.idReservaHabitacionServicio=? 
        && serviciosextra_habitacion.numHabitacionServicio=?");
        $consulta->bind_param("ii", $idBooking, $numRoom);
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllServicesHotel()
    {

        $consulta = $this->conexion->conectar()->prepare("select nombreServicio,descripcionServicio,imagen 
        from servicio group by nombreServicio");
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }
    public function getServiceByName($nameService)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from servicio where nombreServicio=?");
        $consulta->bind_param("s", $nameService);
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_array(MYSQLI_ASSOC);
    }

    public function getServiceByIdAndNumRoomAndBooking($idService, $idBooking, $numRoom)
    {
        $consulta = $this->conexion->conectar()->prepare("select * from serviciosextra_habitacion 
        where idServicio=? && idReservaHabitacionServicio=? && numHabitacionServicio=?");
        $consulta->bind_param("iii", $idService, $idBooking, $numRoom);
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_array(MYSQLI_ASSOC);
    }
}
