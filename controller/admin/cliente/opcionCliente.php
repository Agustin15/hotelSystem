<?php



require("../../../model/claseCliente.php");
$claseCliente = new cliente();


switch ($_SERVER['REQUEST_METHOD']) {

  case "POST":

    $datosCliente = json_decode(file_get_contents("php://input"), true);

    $correo = $datosCliente['cliente']['correo'];
    $nombre = $datosCliente['cliente']['nombre'];
    $telefono = $datosCliente['cliente']['telefono'];
    $apellido = $datosCliente['cliente']['apellido'];

    $clientesCorreo = $claseCliente->getClienteCorreo($correo);


    if ($clientesCorreo->num_rows > 0) {

      $peticion = array("respuesta" => "Correo ya en uso");
    } else {

      $clientesTelefono = $claseCliente->getClienteTelefono($telefono);

      if ($clientesTelefono->num_rows > 0) {

        $peticion = array("respuesta" => "Telefono ya en uso");
      } else {

        $claseCliente->setCorreo($correo);
        $claseCliente->setNombre($nombre);
        $claseCliente->setApellido($apellido);
        $claseCliente->setTelefono($telefono);

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

    $clientesDistintos = $claseCliente->getClientesDistintos($datosCliente['cliente']['idCliente']);

    if ($clientesDistintos->num_rows == null) {

      $resultado = $claseCliente->updateCliente(
        $datosCliente['cliente']['correo'],
        $datosCliente['cliente']['nombre'],
        $datosCliente['cliente']['apellido'],
        $datosCliente['cliente']['telefono'],
        $datosCliente['cliente']['idCliente']
      );
      $peticion = array("respuesta" => $resultado);
    } else {

      foreach ($clientesDistintos->fetch_all(MYSQLI_ASSOC) as $clienteDistinto) {


        if ($clienteDistinto['correo'] ==  $datosCliente['cliente']['correo']) {

          $peticion = array("advertencia" => "Este correo ya ha sido ingresado");
          echo json_encode($peticion);
          break;
        } else  if ($clienteDistinto['telefono'] ==  $datosCliente['cliente']['telefono']) {

          $peticion = array("advertencia" => "Este telefono ya ha sido ingresado");
          echo json_encode($peticion);
          break;
        } else {


          $resultado = $claseCliente->updateCliente(
            $datosCliente['cliente']['correo'],
            $datosCliente['cliente']['nombre'],
            $datosCliente['cliente']['apellido'],
            $datosCliente['cliente']['telefono'],
            $datosCliente['cliente']['idCliente']
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

    if ($_GET['option'] == "clientsGraphic") {

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
    } else {

      $year = $_GET['year'];

      $clients = $claseCliente->getAllClientes()->fetch_all(MYSQLI_ASSOC);

      $peticion = $clients;
    }

    echo json_encode($peticion);



    break;
}
