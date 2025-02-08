<?php
require("../../model/client.php");

class clientController
{

  private $client;


  public function __construct()
  {

    $this->client = new Client();
  }

  public function POST($req)
  {

    try {

      $dataClientMail = $this->client->getClientByMail($req['mail'])->fetch_array(MYSQLI_ASSOC);

      if ($dataClientMail) {

        return array("advertencia" => "El correo ingresado ya esta en uso");
      } else {

        $dataClientPhone = $this->client->getClientByMail($req['phone'])->fetch_array(MYSQLI_ASSOC);
        if ($dataClientPhone) {

          return array("advertencia" => "El telefono ingresado ya esta en uso");
        } else {

          $this->client->setMail($req['mail']);
          $this->client->setName($req['name']);
          $this->client->setLastname($req['lastName']);
          $this->client->setPhone($req['phone']);

          $resultado =  $this->client->addClient();

          return array("respuesta" => $resultado);
        }
      }
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 502);
    }
  }

  public function getClientByMailAndName($req)
  {

    try {
      $client = $req['client'];

      $res = $this->client->getClientExisted($client['name'], $client['lastName'], $client['mail']);

      return $res;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }
}
