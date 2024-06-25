<?php


require_once(__DIR__ . "/../conexion/conexion.php");

class habitaciones
{


    private $conexion;

    public function __construct()
    {

        $this->conexion = new conexion();
    }



    public function getReservasOcupadas($fechaLlegada)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
        fechaSalidaHabitacion >?");
        $consulta->execute();

        $consulta->bind_param("s", $fechaLlegada);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getAllHabitacionesReservadas()
    {



        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada");

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }


    public function getHabitaciones($idReserva)
    {



        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where
     idReservaHabitacion=?");

        $consulta->bind_param("i", $idReserva);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getHabitacionReservadaIdAndNum($numHabitacion, $idReserva)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where
     numHabitacionReservada=? and idReservaHabitacion=?");
        $consulta->execute();

        $consulta->bind_param("ii", $numHabitacion, $idReserva);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->fetch_array(MYSQLI_ASSOC);
    }





    public function getHabitacionReservadaFechaAndNum($hoy, $numHabitacion)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where
       fechaLlegadaHabitacion<=? and fechaSalidaHabitacion>=? and numHabitacionReservada =?");
        $consulta->execute();

        $consulta->bind_param("sss", $hoy, $hoy, $numHabitacion);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->fetch_array(MYSQLI_ASSOC);
    }



    public function buscarCategoriaPorNumero($numHabitacion)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones where
     numHabitacion=?");
        $consulta->execute();

        $consulta->bind_param("i", $numHabitacion);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }



    public function getAllHabitacionesCategoria($categoria)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones where 
      tipoHabitacion=?");
        $consulta->bind_param("s", $categoria);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function cantidadHabitacionesCategoria($categoria)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones where
     tipoHabitacion=?");
        $consulta->execute();

        $consulta->bind_param("s", $categoria);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->num_rows;
    }



    public function habitacionesReservadas($numHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=?");
        $consulta->bind_param("i", $numHabitacion);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function habitacionesHospedajesAntiguos($numHabitacion,$hoy)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=? and fechaSalidaHabitacion<=?");
        $consulta->bind_param("is", $numHabitacion,$hoy);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }




    public function setHabitacionReservada(
        $idReserva,
        $idCliente,
        $numHabitacion,
        $fechaLlegada,
        $fechaSalida,
        $adultos,
        $ninos
    ) {

        $consulta = $this->conexion->conectar()->prepare("insert into habitacion_reservada
        (idReservaHabitacion,idClienteHabitacion,numHabitacionReservada,fechaLlegadaHabitacion,fechaSalidaHabitacion,adultos,ninos) values (?,?,?,?,?,?,?)");
        $consulta->bind_param("iiissii", $idReserva, $idCliente, $numHabitacion, $fechaLlegada, $fechaSalida, $adultos, $ninos);

        $resultado = $consulta->execute();

        return $resultado;
    }



    public function habitacionesDeReserva($idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      idReservaHabitacion=?");
        $consulta->bind_param("i", $idReserva);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function getCantidadHabitaciones()
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones");
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->num_rows;
    }


    public function updateHabitacionReservada($numHabitacion, $idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("update habitacion_reservada set numHabitacionReservada=? 
      where idReservaHabitacion=?");
        $consulta->bind_param("ii", $numHabitacion, $idReserva);
        $resultado = $consulta->execute();

        return $resultado;
    }


    public function updateFechaLlegadaHabitacionReservada($fechaLlegada, $numHabitacion, $idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("update habitacion_reservada set fechaLlegadaHabitacion=? 
      where numHabitacionReservada=? and idReservaHabitacion=?");
        $consulta->bind_param("sii", $fechaLlegada, $numHabitacion, $idReserva);
        $resultado = $consulta->execute();

        return $resultado;
    }


    public function updateFechaSalidaHabitacionReservada($fechaSalida, $numHabitacion, $idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("update habitacion_reservada set fechaSalidaHabitacion=? 
      where numHabitacionReservada=? and idReservaHabitacion=?");
        $consulta->bind_param("sii", $fechaSalida, $numHabitacion, $idReserva);
        $resultado = $consulta->execute();

        return $resultado;
    }

    public function updateFechasHabitacionReservada($fechaLlegada, $fechaSalida, $idReserva)
    {

        $consulta = $this->conexion->conectar()->prepare("update habitacion_reservada set fechaLlegadaHabitacion=?
        ,fechaSalidaHabitacion=? where idReservaHabitacion=?");
        $consulta->bind_param("ssi", $fechaLlegada, $fechaSalida, $idReserva);
        $resultado = $consulta->execute();

        return $resultado;
    }



    public function getCategoria($numHabitcion)
    {

        $categoria = null;
        switch ($numHabitcion) {

            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:

                $categoria = "Estandar";

                break;

            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:

                $categoria = "Deluxe";

                break;

            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:

                $categoria = "Suite";

                break;
        }

        return $categoria;
    }




    function totalHabitacionesCategoriaReservadas($habitacionesReservadas, $categoriaFilter)
    {
        $total = array_reduce($habitacionesReservadas, function ($acc, $habitacion) use ($categoriaFilter) {

            $habitacionReservada = $this->buscarCategoriaPorNumero($habitacion['numHabitacionReservada']);
            $habitacionReservada = $habitacionReservada->fetch_array(MYSQLI_ASSOC);

            ($categoriaFilter == $habitacionReservada['tipoHabitacion']) ? $acc++ : $acc;
            return $acc;
        }, 0);

        return $total;
    }


    public function getPrecioHabitacion($categoria)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from tipo_habitacion where categoria=?");
        $consulta->bind_param("s", $categoria);
        $consulta->execute();
        $resultado = $consulta->get_result();

        return  $resultado->fetch_array(MYSQLI_ASSOC);
    }


    public function totalHabitacion($precioHabitacion, $cantidad)
    {

        $totalHabitacion = $precioHabitacion * $cantidad;

        return $totalHabitacion;
    }
    public function habitacionMasCercana($numHabitacion)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
        numHabitacionReservada=? ORDER BY ABS(DATEDIFF(fechaLlegadaHabitacion,CURDATE())) LIMIT 1");
        $consulta->bind_param("i", $numHabitacion);
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_array(MYSQLI_ASSOC);
    }


    public function habitacionMasCercanaReservada($numHabitacion, $hoy)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
        numHabitacionReservada=? and fechaLlegadaHabitacion >?
         ORDER BY ABS(DATEDIFF(fechaLlegadaHabitacion,CURDATE())) LIMIT 1");
        $consulta->bind_param("is", $numHabitacion, $hoy);
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_array(MYSQLI_ASSOC);
    }

    
    public function habitacionesMasCercanasReservadas($numHabitacion, $hoy)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
        numHabitacionReservada=? and fechaLlegadaHabitacion >?
         ORDER BY ABS(DATEDIFF(fechaLlegadaHabitacion,CURDATE()))");
        $consulta->bind_param("is", $numHabitacion, $hoy);
        $consulta->execute();
        $resultado = $consulta->get_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function deleteHabitacionReserva($idReserva, $numHabitacion)
    {

        $consulta = $this->conexion->conectar()->prepare("delete from habitacion_reservada where 
        idReservaHabitacion=? and numHabitacionReservada=?");
        $consulta->bind_param("ii", $idReserva, $numHabitacion);
        return $consulta->execute();
    }
}
