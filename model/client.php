<?php

require_once(__DIR__ . "/../config/connection.php");

class Client
{

    private $connection;
    public $mail, $name, $lastname, $phone = null;

    public function __construct()
    {

        $this->connection = new Connection();
    }


    public function setMail($mail)
    {

        $this->mail = $mail;
    }

    public function setName($name)
    {

        $this->name = $name;
    }

    public function setLastname($lastname)
    {

        $this->lastname = $lastname;
    }

    public function setPhone($phone)
    {

        $this->phone = $phone;
    }


    public function addClient()
    {

        $query = $this->connection->connect()->prepare("insert into clientes (correo,nombre,apellido,telefono)
        values (?,?,?,?)");
        $query->bind_param("ssss", $this->mail, $this->name, $this->lastname, $this->phone);
        $result = $query->execute();

        return $result;
    }


    
    public function updateClientById($mail, $name, $lastname, $phone, $idClient)
    {

        $query = $this->connection->connect()->prepare("update clientes set correo=?,
        nombre=?,apellido=?,telefono=? where idCliente=?");
        $query->bind_param("ssssi", $mail, $name, $lastname, $phone, $idClient);
        $result = $query->execute();

        return $result;
    }

    
    public function deleteClientById($idClient)
    {


        $query = $this->connection->connect()->prepare("delete from clientes where idCliente=?");
        $query->bind_param("i", $idClient);

        $query->execute();

        if ($query->execute() == false) {

            return $query->error;
        } else {

            return $query->execute();
        }
    }

    public function getAllClients()
    {

        $query = $this->connection->connect()->prepare("select * from clientes");
        $query->execute();

        $result = $query->get_result();

        return $result;
    }



    public function getAllClientsLimit()
    {

        $query = $this->connection->connect()->prepare("select * from clientes LIMIT 10");
        $query->execute();

        $result = $query->get_result();

        return $result;
    }



    public function getAllClientsLimitAndIndex($index)
    {

        $query = $this->connection->connect()->prepare("select * from clientes LIMIT 10 OFFSET $index");
        $query->execute();

        $result = $query->get_result();

        return $result;
    }



    public function getAllClientsRows()
    {

        $query = $this->connection->connect()->prepare("select * from clientes");
        $query->execute();

        $result = $query->get_result();

        return $result->num_rows;
    }





    public function getClientsByMonthAndYear($mes, $anio)
    {

        $query  = $this->connection->connect()->prepare("select * from reserva_habitacion INNER JOIN clientes 
        ON clientes.idCliente=reserva_habitacion.idClienteReserva where MONTH(reserva_habitacion.fechaLlegada)=? 
        and YEAR(reserva_habitacion.fechaLlegada)=?");
        $query->bind_param("ss", $mes, $anio);
        $query->execute();
        $result = $query->get_result();

        return $result->num_rows;
    }


    public function getRowsBookingsClient($id)
    {

        $query = $this->connection->connect()->prepare("select * from clientes INNER JOIN reserva_habitacion
     ON clientes.idCliente=reserva_habitacion.idClienteReserva where clientes.idCliente=?");
        $query->bind_param("i", $id);
        $query->execute();
        $result = $query->get_result();
        return $result->num_rows;
    }



    public function getLimitBookingsClient($id)
    {

        $query = $this->connection->connect()->prepare("select * from clientes INNER JOIN reserva_habitacion
        ON clientes.idCliente=reserva_habitacion.idClienteReserva where clientes.idCliente=? LIMIT 1");
        $query->bind_param("i", $id);
        $query->execute();
        $result = $query->get_result();
        return $result;
    }


    public function getLimitAndIndexBookingsClient($id, $index)
    {

        $query = $this->connection->connect()->prepare("select * from clientes INNER JOIN reserva_habitacion
        ON clientes.idCliente=reserva_habitacion.idClienteReserva where clientes.idCliente=? LIMIT 1 OFFSET $index");
        $query->bind_param("i", $id);
        $query->execute();
        $result = $query->get_result();
        return $result;
    }


    public function getAllYearsVisitClients()
    {

        $query = $this->connection->connect()->prepare("select DISTINCT YEAR(fechaLlegada) from reserva_habitacion INNER JOIN clientes 
        ON clientes.idCliente=reserva_habitacion.idClienteReserva");
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getClientById($idClient)
    {


        $query = $this->connection->connect()->prepare("select * from clientes where idCliente=?");
        $query->bind_param("i", $idClient);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }


    public function getClientByMail($mail)
    {

        $query = $this->connection->connect()->prepare("select * from clientes where
        correo=?");
        $query->bind_param("s", $mail);
        $query->execute();
        $result = $query->get_result();

        return $result;
    }



    public function getClientByPhone($phone)
    {

        $query = $this->connection->connect()->prepare("select * from clientes where
        telefono=?");
        $query->bind_param("s", $phone);
        $query->execute();
        $result = $query->get_result();

        return $result;
    }


    public function getClientExisted($name, $lastname, $mail)
    {

        $query = $this->connection->connect()->prepare("select * from clientes where
        nombre=? and apellido=? and correo=?");
        $query->bind_param("sss", $name, $lastname, $mail);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }


    public function comprobateMailInUseById($id, $mail)
    {

        $query = $this->connection->connect()->prepare("select * from clientes where idCliente!=? and correo=?");
        $query->bind_param("is", $id, $mail);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function comprobatePhoneInUseById($id, $phone)
    {

        $query = $this->connection->connect()->prepare("select * from clientes where idCliente!=? and telefono=? ");
        $query->bind_param("is", $id, $phone);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


 
}
