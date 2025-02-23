<?php


require_once(__DIR__ . "/../config/connection.php");

class User
{

    private $connection;



    public function __construct()
    {

        $this->connection = new Connection();
    }


    public function getUserByUser($user)
    {

        $query = $this->connection->connect()->prepare("select * from usuarios where usuario=?");
        $query->bind_param("s", $user);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }
}
