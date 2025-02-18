<?php


require_once(__DIR__ . "/../config/connection.php");

class Service
{

    private $connection;

    public function __construct()
    {
        $this->connection = new Connection();
    }


    public function getAllServicesHotel()
    {

        $query = $this->connection->connect()->prepare("select nombreServicio,descripcionServicio,imagen 
        from servicio group by nombreServicio");
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    public function getServiceHotelByIdService($idService)
    {

        $query = $this->connection->connect()->prepare("select * from servicio where idServicio=?");
        $query->bind_param("i", $idService);
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_array(MYSQLI_ASSOC);
    }

    public function getServiceByName($nameService)
    {

        $query = $this->connection->connect()->prepare("select * from servicio where nombreServicio=?");
        $query->bind_param("s", $nameService);
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function updateMaxStockServiceHotel($newMaxStock, $idService)
    {

        $query =  $this->connection->connect()->prepare("update servicio set maxStock=? where idServicio=?");
        $query->bind_param("ii", $newMaxStock, $idService);
        $result = $query->execute();
        return $result;
    }



    public function addServiceBooking($idService, $quantity, $idBooking, $numRoom)
    {

        $query =  $this->connection->connect()->prepare("insert into serviciosExtra_habitacion 
          (idServicio,cantidad,idReservaHabitacionServicio,numHabitacionServicio) values (?,?,?,?) ");
        $query->bind_param("iiii", $idService, $quantity, $idBooking, $numRoom);
        $result = $query->execute();
        return $result;
    }


    public function updateQuantityServiceBooking($quantity, $idServiceRoom)
    {

        $query =  $this->connection->connect()->prepare("update serviciosExtra_habitacion set cantidad=?
         where idServicioHabitacion=?");
        $query->bind_param("ii", $quantity, $idServiceRoom);
        $result = $query->execute();
        return $result;
    }


    public function deleteServiceBooking($idServiceRoom)
    {

        $query =  $this->connection->connect()->prepare("delete from serviciosExtra_habitacion where 
        idServicioHabitacion=?");
        $query->bind_param("i", $idServiceRoom);
        $result = $query->execute();
        return $result;
    }

    public function getServicesByIdBookingWithDetails($idBooking)
    {

        $query = $this->connection->connect()->prepare("select * from serviciosExtra_habitacion 
        INNER JOIN servicio ON serviciosExtra_habitacion.idServicioHabitacion=servicio.idServicio where
        idReservaHabitacionServicio=?");
        $query->bind_param("i", $idBooking);
        $query->execute();
        $result =  $query->get_result();

        return $result;
    }



    public function getHistoryServicesByCurrentBookingRoom($numRoom, $idBooking)
    {

        $query = $this->connection->connect()->prepare("select * from serviciosextra_habitacion INNER JOIN 
        servicio ON servicio.idServicio=serviciosextra_habitacion.idServicio where serviciosextra_habitacion.idReservaHabitacionServicio=? 
        && serviciosextra_habitacion.numHabitacionServicio=? group by servicio.nombreServicio");
        $query->bind_param("ii", $idBooking, $numRoom);
        $query->execute();
        $result =  $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getDetailsServicesByCurrentBookingRoom($numRoom, $idBooking)
    {

        $query = $this->connection->connect()->prepare("select * from serviciosextra_habitacion INNER JOIN 
        servicio ON servicio.idServicio=serviciosextra_habitacion.idServicio where serviciosextra_habitacion.idReservaHabitacionServicio=? 
        && serviciosextra_habitacion.numHabitacionServicio=?");
        $query->bind_param("ii", $idBooking, $numRoom);
        $query->execute();
        $result =  $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getServiceByIdAndNumRoomAndBooking($idService, $idBooking, $numRoom)
    {
        $query = $this->connection->connect()->prepare("select * from serviciosextra_habitacion 
        where idServicio=? && idReservaHabitacionServicio=? && numHabitacionServicio=?");
        $query->bind_param("iii", $idService, $idBooking, $numRoom);
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_array(MYSQLI_ASSOC);
    }

    public function getServiceRoomDetailsByNumRoomAndBooking($nameService, $idBooking, $numRoom)
    {
        $query = $this->connection->connect()->prepare("select * from serviciosextra_habitacion INNER JOIN servicio 
        ON serviciosextra_habitacion.idServicio=servicio.idServicio where servicio.nombreServicio=? && serviciosextra_habitacion.idReservaHabitacionServicio=? && 
        serviciosextra_habitacion.numHabitacionServicio=?");
        $query->bind_param("sii", $nameService, $idBooking, $numRoom);
        $query->execute();
        $result = $query->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
