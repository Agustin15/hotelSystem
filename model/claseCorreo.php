<?php


require "libreria/PHPMailer/src/PHPMailer.php";
require "libreria/PHPMailer/src/SMTP.php";
require "libreria/PHPMailer/src/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


class correo
{

    public $nombre, $apellido, $correo, $telefono, $fechaLlegada, $fechaSalida, $habitaciones,$option;


    public function __construct(
        $nombre,
        $apellido,
        $correo,
        $telefono,
        $fechaLlegada,
        $fechaSalida,
        $habitaciones,
        $option
    ) {

        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->telefono = $telefono;
        $this->correo = $correo;
        $this->fechaLlegada = $fechaLlegada;
        $this->fechaSalida = $fechaSalida;
        $this->habitaciones = $habitaciones;
        $this->option = $option;
    }


    public function setMsj()
    {

        $statusBooking = null;
        if ($this->option == "new") {

            $statusBooking = "Su reserva se ha realizado exitosamente";
        } else {


            $statusBooking = "Su reserva se ha actualizado exitosamente";
        }
        return $statusBooking;
    }


    public function setTitleListRooms()
    {

        $titleRooms = "";
        if ($this->option == "new") {

            $titleRooms = "Habitaciones:";
        } else {


            $titleRooms = "Habitaciones con la reserva actualizada:";
        }
        return $titleRooms;
    }

    public function sendMail()
    {

        $respuesta = null;
        $statusBooking = $this->setMsj();
        $titleRooms=$this->setTitleListRooms();


        try {

            $mail = new PHPMailer(true);

            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;


            $mail->setFrom("systemfivehotel@gmail.com", "System Hotel");
            $mail->addAddress($this->correo, $this->nombre);
            $mail->isHTML(true);

            $mail->Subject = "Reserva Realizada";
            $mail->addEmbeddedImage('../img/revision.png', 'icono');
            $mail->Body = '
    
    <html>

    <div id="correoMsj">
    
    <br>
    <img id="iconoCorreo" src="cid:icono">
    <br>

   <h2>Sistema Hotel</h2>

    <br>
    <p>Hola ' . $this->nombre . ', ' . $statusBooking . ',</p>
    <br>
    <h4>Reserva:</h4>
    <br>
    <nav>
    <li>Cliente:' . $this->nombre . " " . $this->apellido . '</li>
    <br>
    <li>Llegada:' . $this->fechaLlegada . '</li>
    <br>
    <li>Salida:' . $this->fechaSalida . '</li>
    <br>
    <li>'.$titleRooms.'</li>';

            foreach ($this->habitaciones as $room) {


                $mail->Body .= '<li>' . $room['quantity'] . " " . $room['category'] . '</li>';
                $mail->Body .= '<li>Adultos:' . $room['guests']['adult'] . '</li>';
                $mail->Body .= '<li>Niños:' . $room['guests']['children'] . '</li>
        <br>

        </nav>';
            }



            $mail->Body .= '
    <br>
    <h3>¡Lo esperamos con ansias!</h3>
    </div>

    

    </html>';

            $mail->Username = "systemfivehotel@gmail.com";
            $mail->Password = "g r d j b z w q e o y e v d f s";

            $respuesta = $mail->send();
        } catch (Exception $e) {

            $e->getMessage();
        }

        return $respuesta;
    }
}
