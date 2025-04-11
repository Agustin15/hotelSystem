<?php

require("../../model/email.php");
class emailController
{
    private $email;
    public function __construct()
    {
        $this->email = new Email();
    }

    public function sendEmail($req)
    {

        $name = $req["name"];
        $destinary = $req["destinary"];
        $subject = $req["subject"];
        $stateBooking = $req["stateBooking"];
        $booking = $req["booking"];

        $this->email->setName($name);
        $this->email->setDestinary($destinary);
        $this->email->setSubject($subject);
        $this->bodyEmail($name, $booking, $stateBooking);

        try {

            $emailSend = $this->email->sendMail();
            return $emailSend;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }


    private function bodyEmail($name, $booking, $stateBooking)

    {

        $state = null;
        ($stateBooking == "Confirmacion") ? $state = "confirmo" : $state = "actualizo";

        $body = "<!DOCTYPE html>";
        $body .= "<html lang='es'>";
        $body .= "<head>";
        $body .= "<meta charset='UTF-8'>";
        $body .= "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
        $body .= "</head>";

        $body .= "<body>";
        $body .= "<div id='email' style='width:900px;margin: auto;'>";

        $body .= "<table role='presentation' background-color:blue; border='0' width='100%' cellspacing='0' >";
        $body .= "<tr>";
        $body .= "<td align='start'>";
        $body .= "<img src='https://i.postimg.cc/dtQK0YsY/header-Email.jpg'>";
        $body .= "</td>";
        $body .= "</tr>";
        $body .= "</table>";

        $body .= "<table style='background-color: white;'color:black; role='hello' border='0' width='100%' cellspacing='0'>";
        $body .= "<tr>";
        $body .= "<td align='center' style='width:1000px; font-size: 17px; text-align:center; margin:auto;'>";

        $body .= "<p>Hola,$name su reserva se $state con exito, a 
                             continuacion le adjuntamos los detalles.</p>";

        $body .= "</tr>";
        $body .= "<tr>";
        $body .= "<td align='center' style='font-size: 17px; text-align:center; margin:auto;'>";
        $body .= "<p>¡Lo esperamos con ansias!</p>";
        $body .= "</td>";
        $body .= "</tr>";
        $body .= "</td>";
        $body .= "</table>";

        $body .= "<table style='color:black;'>";
        $body .= "<tr>";
        $body .= "<span style='font-weight:bold;'>Check In:</span>" . $booking["date"]["startBooking"];
        $body .= "</tr>";
        $body .= "<tr>";
        $body .= "<span style='font-weight:bold;'>Check Out:</span>" . $booking["date"]["endBooking"];
        $body .= "</tr>";
        $body .= "</table>";
        $body .= "<br>";

        $body .= "<table style='color:black;'>";
        $body .= "<tr style='font-weight:bold;'>Cliente:</tr>";
        $body .= "<tr>";
        $body .= "Nombre:" . $booking["client"]["name"];
        $body .= "</tr>";
        $body .= "<tr>";
        $body .= "Apellido:" . $booking["client"]["lastname"];
        $body .= "</tr>";
        $body .= "<tr style='text-decoration:none; color:black;'>";
        $body .= "Correo:" . $booking["client"]["email"];
        $body .= "</tr>";
        $body .= "<tr>";
        $body .= "Telefono:" . $booking["client"]["phone"];
        $body .= "</tr>";
        $body .= "</table>";
        $body .= "<br>";



        $body .= "<table style='color:black;'>";
        foreach ($booking["rooms"]  as $room) {
            $body .= "<tr style='font-weight:bold;' >Habitacion " . $room["category"] . "</tr>";
            $body .= "<tr>Cantidad:" . $room["quantity"] . "</tr>";
            $body .= "<tr>Adultos:" . $room["adults"] . "</tr>";
            $body .= "<tr>Niños:" . $room["childs"] . "</tr>";
            $body .= "<tr>Total:USD" . $room["total"] . "</tr>";
            $body .= "<tr></tr>";
        }
        $body .= "</table'>";


        $body .= "<br>";
        $body .= "<table style='color:black; font-size:15px'>";
        $body .= "<tr style='font-weight:bold;'>Total: USD" . $booking["amount"] . "</tr>";
        $body .= "</table'>";
        $body .= "</div>";
        $body .= "</body>";

        $body .= "</html>";

        $this->email->setBody($body);
    }


    public function POST($req)
    {

        try {
            $idBooking = $req["idBooking"];
            $added = $this->email->addEmailBookingConfirm($idBooking, 1, 0);
            return $added;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function getEmailBookingConfirmByIdBooking($req)
    {

        try {
            $idBooking = $req["idBooking"];
            $emailState = $this->email->getEmailBookingConfirmByIdBooking($idBooking);
            return $emailState;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
    public function PatchStateUpdateEmailBookingById($req)
    {
        try {
            $idEmail = $req["idEmailBooking"];
            $emailState = $this->email->updateStateUpdateEmailById($idEmail, 1);
            return $emailState;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
