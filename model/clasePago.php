<?php

class pago
{

    private $conexion;

    public function __construct()
    {

        $this->conexion = new conexion();
    }



    public function updatePago($idReserva, $depositoNuevo)
    {


        $consulta = $this->conexion->conectar()->prepare("update pago set
        deposito=? where idReservaPago=?");
        $consulta->bind_param("di", $depositoNuevo, $idReserva);

        $resultado = $consulta->execute();

        return $resultado;
    }


    public function getPago($idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from pago where idReservaPago=?");
        $consulta->bind_param("i", $idReserva);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_array(MYSQLI_ASSOC);
    }

    public function setPago($idReserva, $idCliente, $deposito)
    {


        $consulta = $this->conexion->conectar()->prepare("insert into pago
        (idReservaPago,idClientePago,deposito) values (?,?,?)");
        $consulta->bind_param("iid", $idReserva, $idCliente, $deposito);

        $resultado = $consulta->execute();

        return $resultado;
    }

    public function deletePago($idReserva)
    {


        $consulta = $this->conexion->conectar()->prepare("delete from pago
        where idReservaPago=?");
        $consulta->bind_param("i", $idReserva);

        $resultado = $consulta->execute();

        return $resultado;
    }
}
