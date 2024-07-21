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

   
}

