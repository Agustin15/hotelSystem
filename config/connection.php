<?php

require(__DIR__ . "../../vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

class Connection
{
    private $connection;

    public function connect()
    {

        $localhost = $_ENV['DB_HOST'];
        $user = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];
        $db = $_ENV['DATABASE'];

        $this->connection = new mysqli($localhost, $user, $password, $db);

        return $this->connection;
    }

    public function closeConnection()
    {

        mysqli_close($this->connection);
    }
}
