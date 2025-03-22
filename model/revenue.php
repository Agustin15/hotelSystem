<?php

require_once(__DIR__ . "/../config/connection.php");

class Revenue
{

    private  $connection;

    public function __construct()
    {
        $this->connection = Connection::getInstance()->getConnection();
    }


    public function addRevenue($idBooking, $idClient, $amount)
    {


        $query = $this->connection->prepare("insert into pago
        (idReservaPago,idClientePago,deposito) values (?,?,?)");
        $query->bind_param("iid", $idBooking, $idClient, $amount);

        $result = $query->execute();

        return $result;
    }


    public function updateRevenueById($idBooking, $newAmount)
    {


        $query = $this->connection->prepare("update pago set
        deposito=? where idReservaPago=?");
        $query->bind_param("di", $newAmount, $idBooking);

        $result = $query->execute();

        return $result;
    }

    public function deleteRevenue($idBooking)
    {


        $query = $this->connection->prepare("delete from pago
        where idReservaPago=?");
        $query->bind_param("i", $idBooking);

        $result = $query->execute();

        return $result;
    }




    public function getRevenueById($idBooking)
    {

        $query = $this->connection->prepare("select * from pago where idReservaPago=?");
        $query->bind_param("i", $idBooking);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }



    public function getRevenueDetailsById($idBooking)
    {

        $query = $this->connection->prepare("select pago.idReservaPago,pago.idClientePago,pago.deposito,
        clientes.nombre,clientes.apellido,clientes.telefono,clientes.correo,reserva_habitacion.fechaLlegada,
        reserva_habitacion.fechaSalida from pago INNER JOIN reserva_habitacion 
        ON pago.idReservaPago=reserva_habitacion.idReserva INNER JOIN clientes ON 
        pago.idClientePago=clientes.idCliente where pago.idReservaPago=?");
        $query->bind_param("i", $idBooking);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }



    public function getRevenuesByWeekday($startWeek, $endWeek, $numberWeekday)
    {

        $query = $this->connection->prepare("select * from pago INNER JOIN reserva_habitacion 
        ON pago.idReservaPago=reserva_habitacion.idReserva where reserva_habitacion.fechaLlegada>=?
        && reserva_habitacion.fechaSalida<=? && WEEKDAY(reserva_habitacion.fechaLlegada)=?");
        $query->bind_param("ssi", $startWeek, $endWeek, $numberWeekday);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getRevenuesOfThisWeek($startWeek, $endWeek)
    {

        $query = $this->connection->prepare("select pago.idReservaPago,pago.idClientePago,pago.deposito,
        clientes.nombre,clientes.apellido,clientes.telefono,clientes.correo,reserva_habitacion.fechaLlegada,
        reserva_habitacion.fechaSalida from pago INNER JOIN reserva_habitacion 
        ON pago.idReservaPago=reserva_habitacion.idReserva INNER JOIN clientes ON 
        pago.idClientePago=clientes.idCliente where reserva_habitacion.fechaLlegada>=? && reserva_habitacion.fechaSalida<=?");
        $query->bind_param("ss", $startWeek, $endWeek);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
    

    public function getRevenuesOfThisWeekLimit($startWeek, $endWeek,$index)
    {

        $query = $this->connection->prepare("select pago.idReservaPago,pago.idClientePago,pago.deposito,
        clientes.nombre,clientes.apellido,clientes.telefono,clientes.correo,reserva_habitacion.fechaLlegada,
        reserva_habitacion.fechaSalida from pago INNER JOIN reserva_habitacion 
        ON pago.idReservaPago=reserva_habitacion.idReserva INNER JOIN clientes ON 
        pago.idClientePago=clientes.idCliente where reserva_habitacion.fechaLlegada>=? && reserva_habitacion.fechaSalida<=?
        LIMIT 10 OFFSET $index");
        $query->bind_param("ss", $startWeek, $endWeek);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllRevenuesByYear($year)
    {

        $query = $this->connection->prepare("select * from pago INNER JOIN
         reserva_habitacion ON pago.idReservaPago= reserva_habitacion.idReserva 
         where YEAR(reserva_habitacion.fechaLlegada)=?");
        $query->bind_param("i", $year);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllRevenuesByDate($date)
    {

        $query = $this->connection->prepare("select * from pago INNER JOIN
         reserva_habitacion ON pago.idReservaPago= reserva_habitacion.idReserva 
         where reserva_habitacion.fechaLlegada=?");
        $query->bind_param("s", $date);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function getAllRevenuesByYearLimitIndex($year, $index)
    {

        $query = $this->connection->prepare("select pago.idReservaPago,pago.idClientePago,pago.deposito,
        clientes.nombre,clientes.apellido,clientes.telefono,clientes.correo,reserva_habitacion.fechaLlegada,
        reserva_habitacion.fechaSalida from pago INNER JOIN reserva_habitacion 
        ON pago.idReservaPago=reserva_habitacion.idReserva INNER JOIN clientes ON 
        pago.idClientePago=clientes.idCliente where YEAR(reserva_habitacion.fechaLlegada)=? LIMIT 10 OFFSET $index");
        $query->bind_param("i", $year);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllYearsRevenues()
    {

        $query = $this->connection->prepare("select DISTINCT YEAR(reserva_habitacion.fechaLlegada) from pago INNER JOIN
         reserva_habitacion ON pago.idReservaPago= reserva_habitacion.idReserva;");
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function getAllMonthRevenues($month, $year)
    {

        $query = $this->connection->prepare("select * from pago INNER JOIN
         reserva_habitacion ON pago.idReservaPago= reserva_habitacion.idReserva 
         where MONTH(reserva_habitacion.fechaLlegada)=? and YEAR(reserva_habitacion.fechaLlegada)=? ");
        $query->bind_param("ii", $month, $year);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function calculateTotalCurrentYearRevenues($year)
    {

        $revenues = $this->getAllRevenuesByYear($year);

        $totalRevenues = array_reduce($revenues, function ($ac, $revenue) {

            return $ac += $revenue['deposito'];
        }, 0);

        return $totalRevenues;
    }



    public function calculateTotalMonthRevenues($month, $year)
    {

        $revenuesMonth = $this->getAllMonthRevenues($month, $year);

        $totalMonthRevenues = array_reduce($revenuesMonth, function ($ac, $revenue) {

            return $ac += $revenue['deposito'];
        }, 0);

        return $totalMonthRevenues;
    }
}
