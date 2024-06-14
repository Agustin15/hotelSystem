<?php

class conexion
{
    private $conexion;

    public function conectar()
    {

        $this->conexion = new mysqli('localhost', 'root','', 'hotel');

        return $this->conexion;
    
    }

    public function cerrarConexion()
    {

        mysqli_close($this->conexion);
    
    }
}
