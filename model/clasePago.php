<?php

require_once(__DIR__ . "/../conexion/conexion.php");
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



    public function getAllIngresos()
    {

        $consulta = $this->conexion->conectar()->prepare("select * from pago");
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllIngresosAnio($year)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from pago INNER JOIN
         reserva_habitacion ON pago.idReservaPago= reserva_habitacion.idReserva 
         where YEAR(reserva_habitacion.fechaSalida)=?");
        $consulta->bind_param("i", $year);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function getAllIngresosMes($mes, $anio)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from pago INNER JOIN
         reserva_habitacion ON pago.idReservaPago= reserva_habitacion.idReserva 
         where MONTH(reserva_habitacion.fechaSalida)=? and YEAR(reserva_habitacion.fechaSalida)=? ");
        $consulta->bind_param("ii", $mes, $anio);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function calculateTotalIngresosAnio()
    {

        $ingresos = $this->getAllIngresosAnio(date("Y"));

        $totalIngresos = array_reduce($ingresos, function ($ac, $ingreso) {

            return $ac += $ingreso['deposito'];
        }, 0);

        return $totalIngresos;
    }



    public function calculateTotalIngresosMes($mes, $anio)
    {

        $ingresosMes = $this->getAllIngresosMes($mes, $anio);

        $totalIngresosMes = array_reduce($ingresosMes, function ($ac, $ingresoMes) {

            return $ac += $ingresoMes['deposito'];
        }, 0);

        return $totalIngresosMes;
    }
}
