<?php


require "libreria/PHPMailer/src/PHPMailer.php";
require "libreria/PHPMailer/src/SMTP.php";
require "libreria/PHPMailer/src/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


class correo
{

    public $nombre, $apellido, $correo, $telefono, $fechaLlegada, $fechaSalida, $habitaciones;


    public function __construct(
        $nombre,
        $apellido,
        $correo,
        $telefono,
        $fechaLlegada,
        $fechaSalida,
        $habitaciones
    ) {

        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->telefono = $telefono;
        $this->correo = $correo;
        $this->fechaLlegada = $fechaLlegada;
        $this->fechaSalida = $fechaSalida;
        $this->habitaciones = $habitaciones;
    }

    public function sendMail()
    {

        $respuesta = null;


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
            $mail->addEmbeddedImage('../img/revision.png','icono');
            $mail->Body = '
    
    <html>

    <div id="correoMsj">
    
    <br>
    <img id="iconoCorreo" src="cid:icono">
    <br>

   <h2>Sistema Hotel</h2>

    <br>
    <p>Hola ' . $this->nombre . ',su reserva se ha realizado exitosamente,</p>
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
    <li>Habitaciones:</li>';

            foreach ($this->habitaciones as $habitacion) {

                $mail->Body .= '<li>' . $habitacion['CantHabitaciones'] . " " . $habitacion["Categoria"] . '</li>';
                $mail->Body .= '<li>Adultos:' . $habitacion["CantAdultos"] . '</li>';
                $mail->Body .= '<li>Niños:' . $habitacion["CantNinos"] . '</li>
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
