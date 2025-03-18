<?php
require(__DIR__ . "../../../vendor/autoload.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '../../../');
$dotenv->load();

class authToken
{

    public function verifyToken()
    {
        try {

            if (empty($_ENV["JWT_SECRET_KEY"])) {
                throw new Error("JWT_SECRET_KEY no definida");
            }
            $key = $_ENV["JWT_SECRET_KEY"];
            if (!isset($_COOKIE["userToken"])) {

                throw new Error("Autenticacion fallida,Token no valido");
            }
            $decoded =  JWT::decode($_COOKIE["userToken"], new Key($key, 'HS384'));
            if ($decoded) {
                return array("resultVerify" => $decoded);
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage());
        }
    }


    public function refreshToken()
    {
        try {

            if (empty($_ENV["JWT_SECRET_KEY_REFRESH"])) {
                throw new Error("JWT_SECRET_KEY_REFRESH no definida");
            }

            if (empty($_ENV["JWT_SECRET_KEY"])) {
                throw new Error("JWT_SECRET_KEY no definida");
            }

            $keyRefresh = $_ENV["JWT_SECRET_KEY_REFRESH"];
            $key = $_ENV["JWT_SECRET_KEY"];

            if (!isset($_COOKIE["userRefreshToken"])) {

                throw new Error("Autenticacion fallida,Token de actualizacion no valido");
            }

            $decoded =  JWT::decode($_COOKIE["userRefreshToken"], new Key($keyRefresh, 'HS384'));

            if ($decoded) {
                $payloadAccessToken = array(
                    "idUser" => $decoded["idUser"],
                    "exp" => time() + 3600
                );

                $tokenJWT = JWT::encode($payloadAccessToken, $key, 'HS384');

                setcookie("userToken", $tokenJWT, time() + 3600, "/", "/", false, true);
                setcookie("idRol", $decoded["idRol"], time() + 3600, "/", "/", false, true);
                return array("refreshToken" => true);
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 403);
        }
    }
}
