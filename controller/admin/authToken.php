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
            if (!isset($_COOKIE["userToken"]) && !isset($_COOKIE["userRefreshToken"])) {

                throw new Error("Autenticacion fallida,Token no valido");
            }
            if (!isset($_COOKIE["userToken"]) && isset(($_COOKIE["userRefreshToken"]))) {
                  
                $resultRefreshToken  = $this->refreshToken($key);
            
                if (isset($resultRefreshToken["error"])) {

                    throw new Error($resultRefreshToken["error"]);
                }
            }
        

            $decoded =  JWT::decode($_COOKIE["userToken"], new Key($key, 'HS384'));

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
                    "exp" => time() + 3600
                );

                $tokenJWT = JWT::encode($payloadAccessToken, $jwtSecretKey, 'HS384');

                setcookie("userToken", $tokenJWT, time() + 3600, "/", "", false, true);
                setcookie("idRol", $decoded_array["idRol"], time() + 3600, "/", "", false, true);
                return array("refreshToken" => $tokenJWT);
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage());
        }
    }
}
