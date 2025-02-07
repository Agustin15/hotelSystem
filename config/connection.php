<?php

require(__DIR__ . "../../vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

class Connection
{
    private $conexion;

    public function connect()
    {

        $localhost = $_ENV['DB_HOST'];
        $user = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];
        $db = $_ENV['DATABASE'];

        $this->conexion = new mysqli($localhost, $user, $password, $db);

        return $this->conexion;
    }

    public function closeConnection()
    {

        mysqli_close($this->conexion);
    }
}
