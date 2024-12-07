<?php

require("../model/claseCliente.php");

class clientController
{

  private $client;

  public function __construct()
  {

    $this->client = new cliente();
  }

  public function POST($req)
  {


    $res = null;

    $dataClientMail = $this->client->getClienteCorreo($req['mail'])->fetch_array(MYSQLI_ASSOC);

    if ($dataClientMail) {

      $res = array("advertencia" => "El correo ingresado ya esta en uso");
    } else {

      $dataClientPhone = $this->client->getClienteTelefono($req['phone'])->fetch_array(MYSQLI_ASSOC);
      if ($dataClientPhone) {

        $res = array("advertencia" => "El telefono ingresado ya esta en uso");
      } else {

        $this->client->setCorreo($req['mail']);
        $this->client->setNombre($req['name']);
        $this->client->setApellido($req['lastName']);
        $this->client->setTelefono($req['phone']);

        $resultado =  $this->client->setClienteBd();

        $res = array("respuesta" => $resultado);
      }
    }

    return $res;
  }

  public function PUT($req)
  {

    $res = null;
    $resultado = $this->client->updateCliente(
      $req['mail'],
      $req['name'],
      $req['lastName'],
      $req['phone'],
      $req['id']
    );

    $res = array("respuesta" => $resultado);

    return $res;
  }

  public function DELETE($req)
  {
    $res = null;
    $resultDelete = $this->client->deleteCliente($req['idClient']);

    $res = array("response" => $resultDelete);
    return $res;
  }

  public function GET($req)
  {

    $option = $req['option'];
    $res = null;

    switch ($option) {


      case "allClients":

        $allClients = $this->client->getAllClientes()->fetch_all(MYSQLI_ASSOC);

        if ($allClients) {
          $res = $allClients;
        }

        break;


      case "AllYearsVisitClients":

        $years = $this->client->getAllYearsVisitClients();

        $ac = null;
        $yearsFilter = array_filter($years, function ($year) use (&$ac) {
          if ($ac !== $year) {
            $ac = $year;
            return $year['YEAR(fechaLlegada)'];
          }
        });


        $res = $yearsFilter;
        break;
      case "clientsGraphic":

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

        $classClient = $this->client;
        $clientsMonths = array_map(function ($month) use ($classClient, $year) {

          $clientsMonth = $classClient->getClientesAnioMes($month, $year);

          return array("month" => $month, "quantity" => $clientsMonth);
        }, $months);

        $totalMonthQuantity = array_reduce($clientsMonths, function ($ac, $clientMonth) {
          return  $ac += $clientMonth['quantity'];
        }, 0);

        if ($totalMonthQuantity != 0) {
          $res = $clientsMonths;
        }


        break;

      case "clientsTable":

        $index = $req['index'];

        if ($index == 0) {
          $res = $this->client->getAllClientesLimit()->fetch_all(MYSQLI_ASSOC);
        } else {
          $res = $this->client->getAllClientesLimitAndIndex($index)->fetch_all(MYSQLI_ASSOC);
        }


        break;


      case "clientsRows":


        $clientsRows = $this->client->getAllClientsRows();

        $res = $clientsRows;

        break;

      case "dataClient":
        $idClient = $req['idClient'];

        $res = $this->client->getClientById($idClient);

        break;

      case "getClientByMailAndName":
        $client = $req['client'];

        $res = $this->client->getClienteExistente($client['name'], $client['lastName'], $client['mail']);

        break;

      case "ifExistClient":
        $client = $req['client'];

        $existClientMail = $this->client->comprobateMailInUseById($client['id'], $client['mail']);

        if ($existClientMail) {

          $res = array("warning" => "Ups,ya existe un cliente con este correo");
        } else {

          $existClientPhone = $this->client->comprobatePhoneInUseById($client['id'], $client['phone']);

          if ($existClientPhone) {
            $res = array("warning" => "Ups,ya existe un cliente con este telefono");
          }
        }
        break;

      case "rowsBookingsClient":

        $idClient = $req['client'];
        $numRows = $this->client->getRowsBookingsClient($idClient);
        $res = $numRows;
        break;

      case "bookingsClient":

        $idClient = $req['client'];
        $index = $req['index'];

        if ($index == 0) {

          $bookingClient = $this->client->getLimitBookingsClient($idClient, $index)->fetch_array(MYSQLI_ASSOC);
          $res = $bookingClient;
        } else {
          $bookingClient = $this->client->getLimitAndIndexBookingsClient($idClient, $index)->fetch_array(MYSQLI_ASSOC);
          $res = $bookingClient;
        }
        break;
    }



    return $res;
  }
}
