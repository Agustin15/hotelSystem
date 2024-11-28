<?php



require("../../../model/claseCliente.php");
$claseCliente = new cliente();


switch ($_SERVER['REQUEST_METHOD']) {

  case "POST":

    $client = json_decode(file_get_contents("php://input"), true);

    $dataClientMail = $claseCliente->getClienteCorreo($client['mail'])->fetch_array(MYSQLI_ASSOC);

    if ($dataClientMail) {

      $peticion = array("advertencia" => "El correo ingresado ya esta en uso");
    } else {

      $dataClientPhone = $claseCliente->getClienteTelefono($client['phone'])->fetch_array(MYSQLI_ASSOC);
      if ($dataClientPhone) {

        $peticion = array("advertencia" => "El telefono ingresado ya esta en uso");
      } else {

        $claseCliente->setCorreo($client['mail']);
        $claseCliente->setNombre($client['name']);
        $claseCliente->setApellido($client['lastName']);
        $claseCliente->setTelefono($client['phone']);

        $resultado = $claseCliente->setClienteBd();

        $peticion = array("respuesta" => $resultado);
      }
    }

    $peticionJson = json_encode($peticion);

    echo $peticionJson;

    break;
  case "PUT":


    $client = json_decode(file_get_contents("php://input"), true);

    $resultado = $claseCliente->updateCliente(
      $client['mail'],
      $client['name'],
      $client['lastName'],
      $client['phone'],
      $client['id']
    );
    $peticion = array("respuesta" => $resultado);

    $peticionJson = json_encode($peticion);

    echo $peticionJson;

    break;


  case "DELETE":


    $idClient = json_decode($_GET['idClient']);

    $resultado = $claseCliente->deleteCliente($idClient);

    $peticion = array("resultado" => $resultado);
    $peticionJson = json_encode($peticion);

    echo $peticionJson;

    break;

  case "GET":

    $option = $_GET['option'];
    $peticion = null;

    switch ($option) {


      case "allClients":

        $allClients = $claseCliente->getAllClientes()->fetch_all(MYSQLI_ASSOC);

        if ($allClients) {
          $peticion = $allClients;
        }

        break;


      case "AllYearsVisitClients":

        $years = $claseCliente->getAllYearsVisitClients();

        $ac = null;
        $yearsFilter = array_filter($years, function ($year) use (&$ac) {
          if ($ac !== $year) {
            $ac = $year;
            return $year['YEAR(fechaLlegada)'];
          }
        });


        $peticion = $yearsFilter;
        break;
      case "clientsGraphic":

        $year = $_GET['year'];
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

        $clientsMonths = array_map(function ($month) use ($claseCliente, $year) {

          $clientsMonth = $claseCliente->getClientesAnioMes($month, $year);

          return array("month" => $month, "quantity" => $clientsMonth);
        }, $months);

        $totalMonthQuantity = array_reduce($clientsMonths, function ($ac, $clientMonth) {
          return  $ac += $clientMonth['quantity'];
        }, 0);

        if ($totalMonthQuantity == 0) {
          $peticion = null;
        } else {
          $peticion = $clientsMonths;
        }


        break;

      case "clientsTable":

        $index = $_GET['index'];

        if ($index == 0) {
          $clients = $claseCliente->getAllClientesLimit()->fetch_all(MYSQLI_ASSOC);

          $peticion = $clients;
        } else {
          $clients = $claseCliente->getAllClientesLimitAndIndex($index)->fetch_all(MYSQLI_ASSOC);

          $peticion = $clients;
        }


        break;


      case "clientsRows":


        $clientsRows = $claseCliente->getAllClientsRows();

        $peticion = $clientsRows;

        break;

      case "dataClient":
        $idClient = $_GET['idClient'];

        $peticion = $claseCliente->getClientById($idClient);

        break;

      case "ifExistClient":
        $client = json_decode($_GET['client'], true);

        $existClientMail = $claseCliente->comprobateMailInUseById($client['id'], $client['mail']);

        if ($existClientMail) {

          $peticion = array("warning" => "Ups,ya existe un cliente con este correo");
        } else {

          $existClientPhone = $claseCliente->comprobatePhoneInUseById($client['id'], $client['phone']);

          if ($existClientPhone) {
            $peticion = array("warning" => "Ups,ya existe un cliente con este telefono");
          }
        }
        break;

      case "rowsBookingsClient":

        $idClient = $_GET['client'];
        $numRows = $claseCliente->getRowsBookingsClient($idClient);
        $peticion = $numRows;
        break;

      case "bookingsClient":

        $idClient = $_GET['client'];
        $index = $_GET['index'];

        if ($index == 0) {

          $bookingClient = $claseCliente->getLimitBookingsClient($idClient, $index)->fetch_array(MYSQLI_ASSOC);
          $peticion = $bookingClient;
        } else {
          $bookingClient = $claseCliente->getLimitAndIndexBookingsClient($idClient, $index)->fetch_array(MYSQLI_ASSOC);
          $peticion = $bookingClient;
        }
        break;
    }



    echo json_encode($peticion);



    break;
}
