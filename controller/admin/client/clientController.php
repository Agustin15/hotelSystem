<?php
require("../../model/claseCliente.php");
require(__DIR__ . "./../authToken.php");

class clientController
{

  private $client, $authToken;


  public function __construct()
  {

    $this->client = new cliente();
    $this->authToken = new authToken();
  }

  public function POST($req)
  {

    try {

      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }

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

  public function PUT($req)
  {

    try {

      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }

      $resultado = $this->client->updateCliente(
        $req['mail'],
        $req['name'],
        $req['lastName'],
        $req['phone'],
        $req['id']
      );

      return array("respuesta" => $resultado);
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }

  public function DELETE($req)
  {
    try {
      $tokenVerify = $this->authToken->verifyToken();
      if (empty($tokenVerify["error"])) {
        throw new Error("Autenticacion fallida,Token no valido");
      }

      $resultDelete = $this->client->deleteCliente($req['idClient']);
      return array("response" => $resultDelete);
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }

  public function getAllClients($req)
  {
    try {
      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }
      $allClients = $this->client->getAllClientes()->fetch_all(MYSQLI_ASSOC);

      return $allClients;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }


  public function getAllYearsVisitClients($req)
  {
    try {
      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }
      $years = $this->client->getAllYearsVisitClients();
      return $years;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }


  public function getClientsGraphic($req)
  {

    try {

      $year = $req['year'];
      $months = array(
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      );

      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }

      $classClient = $this->client;
      $clientsMonths = array_map(function ($month) use ($classClient, $year) {

        $clientsMonth = $classClient->getClientesAnioMes($month, $year);

        return array("month" => $month, "quantity" => $clientsMonth);
      }, $months);

      $totalMonthQuantity = array_reduce($clientsMonths, function ($ac, $clientMonth) {
        return  $ac += $clientMonth['quantity'];
      }, 0);

      if ($totalMonthQuantity != 0) {
        return $clientsMonths;
      }
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }

  public function getClientsTable($req)
  {
    try {
      $res = null;
      $index = $req['index'];
      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }

      if ($index == 0) {
        $res = $this->client->getAllClientesLimit()->fetch_all(MYSQLI_ASSOC);
      } else {
        $res = $this->client->getAllClientesLimitAndIndex($index)->fetch_all(MYSQLI_ASSOC);
      }
      return $res;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }


  public function getClientsRows($req)
  {
    try {
      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }
      $clientsRows = $this->client->getAllClientsRows();

      return $clientsRows;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }

  public function getDataClient($req)
  {
    try {
      $idClient = $req['idClient'];
      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }
      $res = $this->client->getClientById($idClient);
      return $res;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }

  public function getClientByMailAndName($req)
  {

    try {
      $client = $req['client'];
      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }

      $res = $this->client->getClienteExistente($client['name'], $client['lastName'], $client['mail']);

      return $res;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }

  public function getIfExistClient($req)
  {
    try {
      $client = $req['client'];
      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }
      $existClientMail = $this->client->comprobateMailInUseById($client['id'], $client['mail']);

      if ($existClientMail) {

        return array("warning" => "Ups,ya existe un cliente con este correo");
      } else {

        $existClientPhone = $this->client->comprobatePhoneInUseById($client['id'], $client['phone']);

        if ($existClientPhone) {
          return array("warning" => "Ups,ya existe un cliente con este telefono");
        }
      }
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }

  public function getRowsBookingsClient($req)
  {
    try {
      $idClient = $req['client'];
      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }
      $numRows = $this->client->getRowsBookingsClient($idClient);
      return $numRows;
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }

  public function getBookingsClient($req)
  {
    try {
      $idClient = $req['client'];
      $index = $req['index'];

      $tokenVerify = $this->authToken->verifyToken();
      if (isset($tokenVerify["error"])) {
        throw new Error($tokenVerify["error"]);
      }
      if ($index == 0) {

        $bookingClient = $this->client->getLimitBookingsClient($idClient, $index)->fetch_array(MYSQLI_ASSOC);
        return $bookingClient;
      } else {
        $bookingClient = $this->client->getLimitAndIndexBookingsClient($idClient, $index)->fetch_array(MYSQLI_ASSOC);
        return $bookingClient;
      }
    } catch (Throwable $th) {
      return array("error" => $th->getMessage(), "status" => 404);
    }
  }
}
