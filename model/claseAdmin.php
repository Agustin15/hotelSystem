<?php


require_once(__DIR__ . "/../conexion/conexion.php");

class admin
{

    private $conexion;



    public function __construct()
    {

        $this->conexion = new conexion();
    }


    // consultas userAdmin

    public function getAdminGenero($usuario)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from admin where usuario=?");
        $consulta->bind_param("s", $usuario);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados;
    }


    public function selectAdminUser($user, $pass)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from admin where usuario=? and contrasenia=?");
        $consulta->bind_param("ss", $user, $pass);
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->fetch_array(MYSQLI_ASSOC);
    }


    //// consultas para graficas de inicio


    public function getClientesReservas($mes)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion 
     where idClienteReserva in(select distinct idClienteReserva from reserva_habitacion) and MONTH(fechaLlegada)=?");
        $consulta->bind_param("s", $mes);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->num_rows;
    }


    public function getReservas($mes)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion
        where MONTH(fechaLlegada)=?");
        $consulta->bind_param("s", $mes);
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->num_rows;
    }

    public function getHabitacionesReservadas()
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada");
        $consulta->execute();
        $resultados = $consulta->get_result();

       return $resultados;
    }


    
    public function getCategoriaHabitacion($numHabitacion)
    {

        

        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones where numHabitacion=?");
        $consulta->bind_param("i", $numHabitacion);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_array(MYSQLI_ASSOC);
         
    
         
    }

    public function getCantCategoria($categoriasHabitacionesReservadas,$categoria){
    
    
        $array=array_filter($categoriasHabitacionesReservadas,function($v) use($categoria){
         
        return $v==$categoria;

    });


    return $array;
}
}
