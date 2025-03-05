<?php


require_once(__DIR__ . "/../config/connection.php");

class User
{

    private $connection;



    public function __construct()
    {

        $this->connection = new Connection();
    }



    public function addUser($name, $lastname, $username, $email, $password, $rol, $avatar, $currentDate)
    {

        $imageFile = file_get_contents($avatar);
        $query = $this->connection->connect()->prepare("insert into usuarios(usuario,nombre,apellido,correo,imagen,rol,
        contrasenia,creacion) values(?,?,?,?,?,?,?,?)");
        $query->bind_param("sssssiss", $username, $name, $lastname, $email, $imageFile, $rol, $password, $currentDate);
        $result = $query->execute();
        return $result;
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


    public function deleteUserById($idUser)
    {

        $query = $this->connection->connect()->prepare("delete from usuarios where idUsuario=?");
        $query->bind_param("i", $idUser);
        $result = $query->execute();
        return $result;
    }


    public function getAllUsers()
    {
        $query = $this->connection->connect()->prepare("select * from usuarios");
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllUsersLimitIndex($index)
    {
        $query = $this->connection->connect()->prepare("select * from usuarios INNER JOIN roles ON 
        usuarios.rol=roles.idRol LIMIT 15 OFFSET $index");
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
    public function updateUserById($username, $name, $lastname, $mail, $avatar, $rol, $password, $idUser)
    {

        $imageFile = file_get_contents($avatar);
        $query = $this->connection->connect()->prepare("update usuarios set usuario=?,nombre=?,apellido=?,correo=?, 
         imagen=?,rol=?,contrasenia=? where idUsuario=?");
        $query->bind_param("sssssssi", $username, $name, $lastname, $mail, $imageFile, $rol, $password, $idUser);
        $result = $query->execute();
        return $result;
    }
    public function getUserByUser($user)
    {

        $query = $this->connection->connect()->prepare("select * from usuarios INNER JOIN roles ON 
        usuarios.rol=roles.idRol where usuario=?");
        $query->bind_param("s", $user);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }



    public function getUserByEmail($email)
    {

        $query = $this->connection->connect()->prepare("select * from usuarios where correo=?");
        $query->bind_param("s", $email);
        $query->execute();

        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }


    public function getUserById($idUser)
    {
        $query = $this->connection->connect()->prepare("select * from usuarios INNER JOIN roles ON 
        usuarios.rol=roles.idRol where idUsuario=?");
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
