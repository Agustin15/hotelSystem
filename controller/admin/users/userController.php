<?php
require("../../model/user.php");
require("../../vendor/autoload.php");
require(__DIR__ . "./../authToken.php");

use Firebase\JWT\JWT;

$dotenv = Dotenv\Dotenv::createImmutable('../../');
$dotenv->load();


class userController
{

    private $user, $authToken;

    public function __construct()
    {

        $this->user = new User();
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
                throw new Exception("Autenticacion fallida,usuario no encontrado");
            }

            $payload = [
                "user" => $userFound["usuario"],
                "rol" => $userFound["rol"],
                "exp" => time() + 3600
            ];

            if (strlen($userFound["contrasenia"]) == 60) {
                $valid = password_verify(
                    $password,
                    $userFound["contrasenia"]
                );

                if (!$valid) {
                    throw new Error("La contraseña ingresada es incorrecta");
                }
            } else if ($password != $userFound["contrasenia"]) {
                throw new Error("La contraseña ingresada es incorrecta");
            }

            $tokenJWT = JWT::encode($payload, $secretKey, 'HS384');

            setcookie("userToken", $tokenJWT, time() + 3600, "", "", false, true);
            return array("userLogin" => true);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function PatchUserImage($req)
    {

        $userToUpdate = $req["userToUpdate"];
        try {
            $tokenVerified = $this->authToken->verifyToken();
            if (isset($tokenVerified["error"])) {
                return array("error" => $tokenVerified["error"], "status" => 401);
            }
            $resultUpdated =  $this->user->updateUserImageById($userToUpdate["image"], $userToUpdate["idUser"]);
            return $resultUpdated;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function PatchUserPassword($req)
    {

        try {

            $currentPassword = $req["userPasswordToUpdate"]["currentPassword"];
            $newPassword = $req["userPasswordToUpdate"]["newPassword"];
            $idUser = $req["userPasswordToUpdate"]["idUser"];

            $tokenVerified = $this->authToken->verifyToken();
            if (isset($tokenVerified["error"])) {
                return array("error" => $tokenVerified["error"], "status" => 401);
            }

            $userFound = $this->findUserById($idUser);
            if (isset($userFound["error"])) {
                throw new Error($userFound["error"]);
            }

            if (strlen($userFound["contrasenia"]) == 60) {
                $valid = password_verify(
                    $currentPassword,
                    $userFound["contrasenia"]
                );

                if (!$valid) {
                    throw new Error("La contraseña ingresada es incorrecta");
                }
            } else if ($currentPassword != $userFound["contrasenia"]) {
                throw new Error("La contraseña ingresada es incorrecta");
            }

            $passwordHash = password_hash($newPassword, PASSWORD_BCRYPT, ["cost" => 10]);
            $resultUpdated =  $this->user->updateUserPasswordById($passwordHash, $idUser);
            return $resultUpdated;
        } catch (Throwable $th) {
            return array("errorMessage" => $th->getMessage(), "status" => 500);
        }
    }

    public function PUT($req)
    {

        try {
            $idUser = $req["idUser"];
            $username = $req["username"];
            $name = $req["name"];
            $lastname = $req["lastname"];
            $mail = $req["email"];
            $rol = $req["rol"];
            $image = $req["image"];
            $password = $req["password"];

            $tokenVerified = $this->authToken->verifyToken();
            if (isset($tokenVerified["error"])) {
                return array("error" => $tokenVerified["error"], "status" => 401);
            }

            $userFound = $this->findUserByUsernameAndDistinctId($idUser, $username);

            if (isset($userFound["error"])) {
                throw new Error($userFound["error"]);
            } else if ($userFound) {
                throw new Error("Nombre de usuario ingresado ya en uso");
            }

            $userFoundByEmail = $this->findUserByEmailAndDistinctId($idUser, $mail);

            if (isset($userFoundByEmail["error"])) {
                throw new Error($userFound["error"]);
            } else if ($userFoundByEmail) {
                throw new Error("Correo ingresado ya en uso");
            }

            $resultUpdated = $this->user->updateUserById(
                $username,
                $name,
                $lastname,
                $mail,
                $image,
                $rol,
                $password,
                $idUser
            );

            return $resultUpdated;
        } catch (Throwable $th) {
            return array("errorMessage" => $th->getMessage(), "status" => 500);
        }
    }


    public function findUserByUsernameAndDistinctId($id, $user)
    {
        try {
            $userFound = $this->user->getUserByUsernameAndDistinctId($id, $user);
            return $userFound;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }



    public function findUserById($idUser)
    {
        try {
            $userFound = $this->user->getUserById($idUser);
            return $userFound;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function findUserByEmailAndDistinctId($id, $email)
    {
        try {
            $userFound = $this->user->getUserByEmailAndDistinctId($id, $email);
            return $userFound;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getDataToken()
    {
        try {
            $tokenVerified = $this->authToken->verifyToken();
            if (isset($tokenVerified["error"])) {
                return array("error" => $tokenVerified["error"], "status" => 401);
            }
            return $tokenVerified;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }



    public function getDataUserByUsername($req)
    {
        try {
            $tokenVerified = $this->authToken->verifyToken();
            if (isset($tokenVerified["error"])) {
                return array("error" => $tokenVerified["error"], "status" => 401);
            }
            $dataUser = $this->user->getUserByUser($req["username"]);
            $dataUser["imagen"] = base64_encode($dataUser["imagen"]);
            return $dataUser;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }
}
