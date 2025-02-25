<?php


require_once(__DIR__ . "/../config/connection.php");

class User
{

    private $connection;



    public function __construct()
    {

        $this->connection = new Connection();
    }


    public function updateUserPasswordById($password, $idUser)
    {

        $query = $this->connection->connect()->prepare("update usuarios set contrasenia=? where idUsuario=?");
        $query->bind_param("si", $password, $idUser);
        $result = $query->execute();
        return $result;
    }


    public function updateUserImageById($image, $idUser)
    {
        $imageFile = file_get_contents($image);
        $query = $this->connection->connect()->prepare("update usuarios set imagen=? where idUsuario=?");
        $query->bind_param("si", $imageFile, $idUser);
        $result = $query->execute();
        return $result;
    }

    public function updateUserById($username, $name, $lastname, $mail, $image, $rol, $password, $idUser)
    {

        $imageFile = file_get_contents($image);
        $query = $this->connection->connect()->prepare("update usuarios set usuario=?,nombre=?,apellido=?,correo=?, 
         imagen=?,rol=?,contrasenia=? where idUsuario=?");
        $query->bind_param("sssssssi", $username, $name, $lastname, $mail, $imageFile, $rol, $password, $idUser);
        $result = $query->execute();
        return $result;
    }
    public function getUserByUser($user)
    {

        $query = $this->connection->connect()->prepare("select * from usuarios where usuario=?");
        $query->bind_param("s", $user);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }


    public function getUserById($idUser)
    {
        $query = $this->connection->connect()->prepare("select * from usuarios where idUsuario=?");
        $query->bind_param("i", $idUser);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }

    public function getUserByUsernameAndDistinctId($id, $user)
    {

        $query = $this->connection->connect()->prepare("select * from usuarios where idUsuario!=? and usuario=?");
        $query->bind_param("is", $id, $user);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }

    public function getUserByEmailAndDistinctId($id, $email)
    {

        $query = $this->connection->connect()->prepare("select * from usuarios where idUsuario!=? and correo=?");
        $query->bind_param("is", $id, $email);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }
}
