<?php



require("../../../model/claseCliente.php");
$claseCliente = new cliente();


switch ($_SERVER['REQUEST_METHOD']) {

  case "POST":

    $client = json_decode(file_get_contents("php://input"), true);

    $dataClientMail = $claseCliente->getClienteCorreo($client['mail'])->fetch_array(MYSQLI_ASSOC);

    if ($dataClientMail) {

      $peticion = array("advertencia" => "Este correo ya esta en uso");
    } else {

      $dataClientPhone = $claseCliente->getClienteTelefono($client['phone'])->fetch_array(MYSQLI_ASSOC);
      if ($dataClientPhone) {

        $peticion = array("advertencia" => "Este telefono ya esta en uso");
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


    $datosCliente = json_decode(file_get_contents("php://input"), true);

    $peticion = null;

    $clientesDistintos = $claseCliente->getClientesDistintos($datosCliente['idClient']);

    if ($clientesDistintos->num_rows == null) {

      $resultado = $claseCliente->updateCliente(
        $datosCliente['mail'],
        $datosCliente['name'],
        $datosCliente['lastName'],
        $datosCliente['phone'],
        $datosCliente['idClient']
      );
      $peticion = array("respuesta" => $resultado);
    } else {

      foreach ($clientesDistintos->fetch_all(MYSQLI_ASSOC) as $clienteDistinto) {


        if ($clienteDistinto['correo'] ==  $datosCliente['mail']) {

          $peticion = array("advertencia" =>'Este correo ya ha sido ingresado');
          echo json_encode($peticion);
          break;
        } else  if ($clienteDistinto['telefono'] ==  $datosCliente['phone']) {

          $peticion = array("advertencia" =>'Este telefono ya ha sido ingresado');
          echo json_encode($peticion);
          break;
        } else {


          $resultado = $claseCliente->updateCliente(
            $datosCliente['mail'],
            $datosCliente['name'],
            $datosCliente['lastName'],
            $datosCliente['phone'],
            $datosCliente['idClient']
          );
          $peticion = array("respuesta" => $resultado);
        }
      }
    }


    $peticionJson = json_encode($peticion);

    echo $peticionJson;

    break;


  case "DELETE":


    $datosCliente = json_decode($_GET['cliente'], true);

    $resultado = $claseCliente->deleteCliente($datosCliente['idCliente']);

    $peticion = array("resultado" => $resultado);
    $peticionJson = json_encode($peticion);

    echo $peticionJson;

    break;

  case "GET":

    $option = $_GET['option'];

    switch ($option) {

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


        $peticion = $clientsMonths;

        break;

      case "clientsTable":

        $year = $_GET['year'];

        $clients = $claseCliente->getAllClientes()->fetch_all(MYSQLI_ASSOC);

        $peticion = $clients;

        break;
    }


    echo json_encode($peticion);



    break;
}
