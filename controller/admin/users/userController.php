<?php
require("../model/claseUsuario.php");
require("../vendor/autoload.php");
require(__DIR__ . "./../authToken.php");

use Firebase\JWT\JWT;

$dotenv = Dotenv\Dotenv::createImmutable('../');
$dotenv->load();


class userController
{

    private $user, $authToken;

    public function __construct()
    {

        $this->user = new Usuario();
        $this->authToken = new authToken();
    }

    public function login($req)
    {
        try {

            $userData = $req["userData"];
            $password = $userData["password"];
            $user = $userData["user"];
            $secretKey = $_ENV["JWT_SECRET_KEY"];

            $userFound = $this->user->getUserByUser($user);
            if (!$userFound) {
                throw new Exception("Usuario no encontrado");
            }
            $payload = [
                "user" => $user,
                "rol" => $userFound["rol"],
                "genre" => $userFound["genero"],
                "exp" => time() + 3600
            ];
            if ($userFound["contrasenia"] == $password) {
                $tokenJWT = JWT::encode($payload, $secretKey, 'HS384');

                setcookie("userToken", $tokenJWT, time() + 3600, "", "", false, true);
                return array("userLogin" => true);
            } else {
                throw new Exception("Contraseña incorrecta");
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getDataToken()
    {
        try {
            $tokenVerified = $this->authToken->verifyToken();
            if (isset($tokenVerified["error"])) {
                throw new Error($tokenVerified["error"]);
            }
            return $tokenVerified;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }
}
