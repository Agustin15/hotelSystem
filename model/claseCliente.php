<?php

require_once(__DIR__ . "/../conexion/conexion.php");

class cliente
{

    private $conexion;
    public $correo, $nombre, $apellido, $telefono = null;

    public function __construct()
    {

        $this->conexion = new conexion();
    }


    public function setCorreo($correo)
    {

        $this->correo = $correo;
    }

    public function setNombre($nombre)
    {

        $this->nombre = $nombre;
    }

    public function setApellido($apellido)
    {

        $this->apellido = $apellido;
    }

    public function setTelefono($telefono)
    {

        $this->telefono = $telefono;
    }



    public function getAllClientes()
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes");
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getAllClientesLimit()
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes LIMIT 10");
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getAllClientesLimitAndIndex($index)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes LIMIT 10,$index");
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getAllClientsRows()
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes");
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->num_rows;
    }





    public function getClientesAnioMes($mes, $anio)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion INNER JOIN clientes 
        ON clientes.idCliente=reserva_habitacion.idClienteReserva where MONTH(reserva_habitacion.fechaLlegada)=? 
        and YEAR(reserva_habitacion.fechaLlegada)=?");
        $consulta->bind_param("ss", $mes, $anio);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->num_rows;
    }


    public function getClientesAnio($anio)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion INNER JOIN clientes 
        ON clientes.idCliente=reserva_habitacion.idClienteReserva where YEAR(reserva_habitacion.fechaLlegada)=?");
        $consulta->bind_param("s", $anio);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllYearsVisitClients()
    {

        $consulta = $this->conexion->conectar()->prepare("select YEAR(fechaLlegada) from reserva_habitacion INNER JOIN clientes 
        ON clientes.idCliente=reserva_habitacion.idClienteReserva");
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }




    public function deleteCliente($idCliente)
    {


        $consulta = $this->conexion->conectar()->prepare("delete from clientes where idCliente=?");
        $consulta->bind_param("i", $idCliente);

        $consulta->execute();

        if ($consulta->execute() == false) {

            return $consulta->error;
        } else {

            return $consulta->execute();
        }
    }


    public function getClientById($idCliente)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from clientes where idCliente=?");
        $consulta->bind_param("i", $idCliente);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_array(MYSQLI_ASSOC);
    }

    public function updateCliente($correo, $nombre, $apellido, $telefono, $idCliente)
    {

        $consulta = $this->conexion->conectar()->prepare("update clientes set correo=?,
        nombre=?,apellido=?,telefono=? where idCliente=?");
        $consulta->bind_param("ssssi", $correo, $nombre, $apellido, $telefono, $idCliente);
        $resultado = $consulta->execute();

        return $resultado;
    }


    public function getClienteCorreo($correo)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes where
        correo=?");
        $consulta->bind_param("s", $correo);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado;
    }



    public function getClienteTelefono($telefono)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes where
        telefono=?");
        $consulta->bind_param("s", $telefono);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado;
    }


    public function getClienteExistente($nombre, $apellido, $correo)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes where
        nombre=? and apellido=? and correo=?");
        $consulta->bind_param("sss", $nombre, $apellido, $correo);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_array(MYSQLI_ASSOC);
    }

    public function comprobateCorreoEnUso($correo, $nombre, $apellido)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes where correo=? and (nombre!=? or 
        apellido!=?)");
        $consulta->bind_param("sss", $correo, $nombre, $apellido);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function comprobateTelefonoEnUso($telefono, $nombre, $apellido)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes where telefono=? and (nombre!=? or 
        apellido!=?)");
        $consulta->bind_param("sss", $telefono, $nombre, $apellido);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function comprobateMailInUseById($id, $correo)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes where idCliente!=? and correo=?");
        $consulta->bind_param("is", $id, $correo);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function comprobatePhoneInUseById($id, $telefono)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes where idCliente=? and telefono=? ");
        $consulta->bind_param("is", $id, $telefono);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function setClienteBd()
    {

        $consulta = $this->conexion->conectar()->prepare("insert into clientes (correo,nombre,apellido,telefono)
        values (?,?,?,?)");
        $consulta->bind_param("ssss", $this->correo, $this->nombre, $this->apellido, $this->telefono);
        $resultado = $consulta->execute();

        return $resultado;
    }
}
