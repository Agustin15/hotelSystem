<?php

require("../../model/rol.php");
require(__DIR__ . "../../authToken.php");

class rolController
{
    private $rol, $authToken;

    public function __construct()
    {

        $this->rol = new Rol();
        $this->authToken = new authToken();
    }

    public function getAllRols()
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $allRols = $this->rol->getAllRols();
            return $allRols;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
