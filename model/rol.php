<?php

require_once(__DIR__ . "/../config/connection.php");

class Rol
{


    private $connection;

    public function __construct()
    {

        $this->connection = Connection::getInstance()->getConnection();
    }


    public function getAllRols()
    {

        $query = $this->connection->prepare("select * from roles");
        $query->execute();
        $results = $query->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }
}
