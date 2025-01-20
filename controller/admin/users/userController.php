<?php
require("../model/claseUsuario.php");

class userController
{

    private $user;

    public function __construct()
    {

        $this->user = new Usuario();
    }

    public function login($req)
    {
        try {

            $userData = $req["userData"];
            $password = $userData["password"];
            $user = $userData["user"];

            $userFound = $this->user->getUserByUser($user);
            if (!$userFound) {
                throw new Exception("Usuario no encontrado");
            }
            if ($userFound["contrasenia"] == $password) {

                session_id("login");
                session_start();
                $_SESSION['usuario'] = $user;

                return array("user" => $user);
            } else {
                throw new Exception("Contraseña incorrecta");
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
