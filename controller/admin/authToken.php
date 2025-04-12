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


            $tokenAccess = null;
            if (empty($_ENV["JWT_SECRET_KEY"])) {
                throw new Error("JWT_SECRET_KEY no definida");
            }

            $key = $_ENV["JWT_SECRET_KEY"];

            if (isset($_COOKIE["userToken"])) {
                $tokenAccess = $_COOKIE["userToken"];
            } else {
                if (!isset($_COOKIE["userRefreshToken"])) {
                    throw new Error("Autenticacion fallida,Token no valido");
                } else {
                    $resultRefreshToken  = $this->refreshToken($key);
                    $tokenAccess = $resultRefreshToken["newAccessToken"];

                    if (isset($resultRefreshToken["error"])) {

                        throw new Error($resultRefreshToken["error"]);
                    }
                }
            }


            $decoded =  JWT::decode($tokenAccess, new Key($key, 'HS384'));

            if ($decoded) {
                return array("resultVerify" => $decoded);
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage());
        }
    }


    public function refreshToken($jwtSecretKey)
    {
        try {

            if (empty($_ENV["JWT_SECRET_KEY_REFRESH"])) {
                throw new Error("JWT_SECRET_KEY_REFRESH no definida");
            }

            if (empty($_ENV["JWT_SECRET_KEY"])) {
                throw new Error("JWT_SECRET_KEY no definida");
            }

            $keyRefresh = $_ENV["JWT_SECRET_KEY_REFRESH"];

            if (!isset($_COOKIE["userRefreshToken"])) {

                throw new Error("Autenticacion fallida,Token de actualizacion no valido");
            }

            $decoded =  JWT::decode($_COOKIE["userRefreshToken"], new Key($keyRefresh, 'HS384'));
            $decoded_array = (array) $decoded;

            if ($decoded) {
                $payloadAccessToken = array(
                    "idUser" => $decoded_array["idUser"],
                    "exp" => time() + 60
                );

                $tokenJWT = JWT::encode($payloadAccessToken, $jwtSecretKey, 'HS384');

                setCookie("userToken", $tokenJWT, time() + 60, "/", "", false, true);
                setCookie("idRol", $decoded_array["idRol"], time() + 60, "/", "", false, true);
                return array("newAccessToken" => $tokenJWT);
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage());
        }
    }
}
