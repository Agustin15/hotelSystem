<?php

require_once(__DIR__ . "/../conexion/conexion.php");

class reserva
{


    public $nombre, $apellido, $telefono, $correo, $categoria,
        $cantidadHabitacion, $totalHabitacion, $llegada, $salida, $numHabitacionAsignada;

    public $cantidadHabOcupadas = array(), $cantidadDeluxe, $cantidadEstandar, $cantidadSuite = 0;

    private $conexion;

    public function __construct()
    {

        $this->conexion = new conexion();
    }

    public function setPersona($nombre, $apellido, $telefono, $correo)
    {

        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->telefono = $telefono;
        $this->correo = $correo;
    }

    public function setReserva($correo, $llegada, $salida, $cantidadHabitacion)
    {

        $this->correo = $correo;
        $this->llegada = $llegada;
        $this->salida = $salida;
        $this->cantidadHabitacion = $cantidadHabitacion;
    }


    public function addClienteBd()
    {

        $consulta = $this->conexion->conectar()->prepare("insert into clientes 
        (nombre,apellido,correo,telefono) values(?,?,?,?) ");

        $consulta->bind_param("ssss", $this->nombre, $this->apellido, $this->correo, $this->telefono);
        $resultado = $consulta->execute();

        return $resultado;
    }



    public function buscarCliente($correo)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from clientes where correo=?");
        $consulta->bind_param("s", $correo);
        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados;
    }


    public function setNumHabitacion($categoria)
    {

        $numHabitacionAsignada = 0;

        switch ($categoria) {

            case "Estandar":

                $rand = rand(1, 10);

                $numHabitacionAsignada = $rand;

                break;

            case "Deluxe":

                $rand = rand(11, 20);

                $numHabitacionAsignada = $rand;


                break;

            case "Suite":

                $rand = rand(21, 30);


                $numHabitacionAsignada = $rand;


                break;
        }


        return $numHabitacionAsignada;
    }

    public function addReservaBd()
    {


        $consulta = $this->conexion->conectar()->prepare("insert into reserva_habitacion
    (idClienteReserva,fechaLlegada,fechaSalida,cantidadHabitaciones) values(?,?,?,?) ");

        $consulta->bind_param(
            "issi",
            $idCliente,
            $this->llegada,
            $this->salida,
            $this->cantidadHabitacion
        );

        $resultado = $consulta->execute();

        return  $resultado;
    }



    public function comprobarExistenciaReserva($idClienteReserva, $fechaLlegada, $fechaSalida)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where idClienteReserva=? and
        fechaLlegada=? and fechaSalida=?");

        $consulta->bind_param("iss", $idClienteReserva, $fechaLlegada, $fechaSalida);

        $consulta->execute();

        $resultados = $consulta->get_result();

        return $resultados->fetch_array(MYSQLI_ASSOC);
    }


    public function updateCantHabitacionesReserva($idReserva, $cantidad)
    {

        $consulta = $this->conexion->conectar()->prepare("update reserva_habitacion set cantidadHabitaciones=?
        where idReserva=?");

        $consulta->bind_param("si", $cantidad, $idReserva);

        return  $consulta->execute();
    }

    public function buscarNumHabitacion($numHabitacion)
    {



        $consulta = $this->conexion->conectar()->prepare("select * from habitacion_reservada where 
        numHabitacionReservada=?");
        $consulta->bind_param("i", $numHabitacion);
        $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado;
    }

    public function buscarReservaPorIdReserva($idReserva)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where 
        idReserva=?");
        $consulta->bind_param("i", $idReserva);
        $consulta->execute();

        $respuesta = $consulta->get_result();

        return $respuesta;
    }


    public function buscarReservaPorIdClienteYLlegada($idClienteReserva, $fechaLlegada)
    {


        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where 
        idClienteReserva=? and fechaLlegada=?");
        $consulta->bind_param("is", $idClienteReserva, $fechaLlegada);
        $consulta->execute();

        $resultado = $consulta->get_result();

        $respuesta = $resultado->fetch_array();

        return $respuesta;
    }


    public function addHabitacionReservada(
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



    public function cerrarConexion()
    {

        $this->conexion->cerrarConexion();
    }


    public function cantHabitaciones($categoria)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from habitaciones where tipoHabitacion=?");
        $consulta->bind_param("s", $categoria);

        $resultado = $consulta->execute();

        $resultado = $consulta->get_result();

        return $resultado->num_rows;
    }


    public function guardarCantHabitacionesOcupadas($categoria, $cantidad)
    {

        $resultado = 0;
        switch ($categoria) {

            case "Estandar":

                $resultado = $this->cantidadEstandar += $cantidad;


                break;

            case "Deluxe":

                $resultado = $this->cantidadDeluxe += $cantidad;

                break;

            case "Suite":

                $resultado = $this->cantidadSuite += $cantidad;

                break;
        }

        return $resultado;
    }


    public function getReservaIdCliente($idCliente)
    {

        $consulta = $this->conexion->conectar()->prepare("select * from reserva_habitacion where idClienteReserva=?");
        $consulta->bind_param("i", $idCliente);
        $consulta->execute();
        $resultados = $consulta->get_result();


        return $resultados;
    }
}
