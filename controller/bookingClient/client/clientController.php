<?php
require("../../model/client.php");

class clientController
{

  private $client;


  public function __construct()
  {

    $this->client = new Client();
  }

  public function POST($name, $lastname, $email, $phone)
  {

    try {

      $dataClientMail = $this->client->getClientByMail($email)->fetch_array(MYSQLI_ASSOC);

      if ($dataClientMail) {

        throw new Error("Error cliente,el correo ingresado ya esta en uso");
      }

      $dataClientPhone = $this->client->getClientByPhone($phone)->fetch_array(MYSQLI_ASSOC);
      if ($dataClientPhone) {

        throw new Error("Error cliente,el telefono ingresado ya esta en uso");
      } else {

        $this->client->setMail($email);
        $this->client->setName($name);
        $this->client->setLastname($lastname);
        $this->client->setPhone($phone);

        $result =  $this->client->addClient();

        if (!$result) {
          throw new Error("Error, no se pudo agregar el cliente");
        }
        return $result;
      }
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 502);
    }
  }

  public function findClientByMailAndName($name, $lastname, $email)
  {

    try {
      $res = $this->client->getClientExisted($name, $lastname, $email);
      return $res;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }
}
