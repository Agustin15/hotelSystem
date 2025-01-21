<?php
require("./../vendor/autoload.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv\Dotenv::createImmutable('../');
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
}
