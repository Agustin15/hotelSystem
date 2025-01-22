<?php
require("../../model/claseCliente.php");

class clientController
{

  private $client;


  public function __construct()
  {

    $this->client = new cliente();
  }

  public function POST($req)
  {

    try {

      $dataClientMail = $this->client->getClienteCorreo($req['mail'])->fetch_array(MYSQLI_ASSOC);

      if ($dataClientMail) {

        return array("advertencia" => "El correo ingresado ya esta en uso");
      } else {

        $dataClientPhone = $this->client->getClienteTelefono($req['phone'])->fetch_array(MYSQLI_ASSOC);
        if ($dataClientPhone) {

          return array("advertencia" => "El telefono ingresado ya esta en uso");
        } else {

          $this->client->setCorreo($req['mail']);
          $this->client->setNombre($req['name']);
          $this->client->setApellido($req['lastName']);
          $this->client->setTelefono($req['phone']);

          $resultado =  $this->client->setClienteBd();

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

      $res = $this->client->getClienteExistente($client['name'], $client['lastName'], $client['mail']);

      return $res;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }
}
