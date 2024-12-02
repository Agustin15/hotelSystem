<?php


require_once(__DIR__ . "/../conexion/conexion.php");

class habitaciones
{


    private $conexion;

    public function __construct()
    {

        $this->conexion = new conexion();
    }



    public function getAllHabitacionesHotel()
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones");
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }


    public function getAllRoomsHotelWithDetails($category)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones INNER JOIN tipo_habitacion ON 
        habitaciones.tipoHabitacion=tipo_habitacion.categoria where habitaciones.tipoHabitacion=?");
        $consulta->bind_param("s", $category);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }



    public function getAllCategoryRooms()
    {


        $consulta = $this->conexion->conectar()->prepare("select * from tipo_habitacion");
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
    }



    public function getHabitacionDisponible($fechaLlegadaNuevaReserva, $fechaSalidaNuevaReserva, $numHabitacion)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
        (fechaLlegadaHabitacion >? or fechaSalidaHabitacion<?) and numHabitacionReservada=? ");
        $consulta->execute();

        $consulta->bind_param("ssi", $fechaSalidaNuevaReserva, $fechaLlegadaNuevaReserva, $numHabitacion);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
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



    public function getAllHabitacionesReservadasYear($year)
    {



        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where YEAR(fechaLlegadaHabitacion)=?");
        $consulta->bind_param("s", $year);
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




    public function habitacionesConCategoriaYHuespedesIguales($idReserva, $categoria, $adultos, $ninos)
    {


        $consulta = $this->conexion->conectar()->prepare(
            "select * from habitaciones 
        INNER JOIN habitacion_reservada ON 
        habitaciones.numHabitacion=habitacion_reservada.numHabitacionReservada where 
        habitacion_reservada.idReservaHabitacion=? and habitaciones.tipoHabitacion=?  
        and habitacion_reservada.adultos=? and habitacion_reservada.ninos=?"
        );
        $consulta->bind_param("isii", $idReserva, $categoria, $adultos, $ninos);
        $consulta->execute();
        $resultados = $consulta->get_result();

        return $resultados->fetch_all(MYSQLI_ASSOC);
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



    public function roomsBookingAndDetails($idBooking)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada 
        INNER JOIN habitaciones ON habitacion_reservada.numHabitacionReservada=habitaciones.numHabitacion
       INNER JOIN tipo_habitacion ON habitaciones.tipoHabitacion=tipo_habitacion.categoria 
       where habitacion_reservada.idReservaHabitacion=?");
        $consulta->bind_param("i", $idBooking);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function reservasHabitacionDisponible($numHabitacion, $hoy)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=? and (fechaLlegadaHabitacion >? or fechaSalidaHabitacion<?)");
        $consulta->bind_param("iss", $numHabitacion, $hoy, $hoy);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }



    public function reservasHabitacionOcupada($numHabitacion, $hoy)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=? and fechaLlegadaHabitacion <=? and fechaSalidaHabitacion>=?");
        $consulta->bind_param("iss", $numHabitacion, $hoy, $hoy);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }


    public function habitacionesHospedajesAntiguos($numHabitacion, $hoy)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
      numHabitacionReservada=? and fechaSalidaHabitacion<=?");
        $consulta->bind_param("is", $numHabitacion, $hoy);
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

        if ($resultado) {
            return $resultado;
        } else {
            return $consulta->error;
        }
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

        return $resultado->fetch_array(MYSQLI_ASSOC);
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
