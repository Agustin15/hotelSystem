<?php


require_once(__DIR__ . "/../conexion/conexion.php");

class Usuario
{

    private $conexion;



    public function __construct()
    {

        $this->conexion = new conexion();
    }


    // consultas userAdmin

    public function getAdminGenero($usuario)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from usuarios where usuario=?");
        $consulta->bind_param("s", $usuario);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados;
    }


    public function getUserByUser($user)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from usuarios where usuario=?");
        $consulta->bind_param("s", $user);
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->fetch_array(MYSQLI_ASSOC);
    }
}
