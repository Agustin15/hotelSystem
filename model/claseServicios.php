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
        $consulta->bind_param("iiii", $idServicio, $cantidad, $idReserva, $numHabitacion);
        $resultado = $consulta->execute();

        return $resultado;
    }


    public function calculateTotalService($cantidad, $precio)
    {

        $totalService = $cantidad * $precio;
        return $totalService;
    }

    public function getServiciosReservaHabitacionEnCurso($numHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from serviciosextra_habitacion INNER JOIN
        habitacion_reservada ON habitacion_reservada.idReservaHabitacion=serviciosextra_habitacion.idReservaHabitacionServicio INNER JOIN
        servicio ON servicio.idServicio=serviciosextra_habitacion.idServicio 
        where habitacion_reservada.fechaLlegadaHabitacion<=DATE(NOW()) and habitacion_reservada.fechaSalidaHabitacion>=DATE(NOW()) and
        habitacion_reservada.numHabitacionReservada=?");
        $consulta->bind_param("i", $numHabitacion);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }

    public function deleteService($idServicioHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("delete from serviciosExtra_habitacion where 
        idServicioHabitacion=?");
        $consulta->bind_param("i", $idServicioHabitacion);
        $resultado = $consulta->execute();

        return $resultado;
    }




    public function getServiciosReservaHabitacion($idReserva,$numHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from serviciosextra_habitacion INNER JOIN
        servicio ON servicio.idServicio=serviciosextra_habitacion.idServicio
        where serviciosextra_habitacion.idReservaHabitacionServicio=? and serviciosextra_habitacion.numHabitacionServicio=?");
        $consulta->bind_param("ii",$idReserva,$numHabitacion);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }
}
