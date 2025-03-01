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
        $file = $req["file"];

        $this->email->setName($name);
        $this->email->setDestinary($destinary);
        $this->email->setSubject($subject);
        $this->email->setAttachment($file['tmp_name']);
        $this->bodyEmail($name, $stateBooking);

        try {

            $emailSend = $this->email->sendMail();
            return $emailSend;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function bodyEmail($name, $stateBooking)

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
        $body .= "<div id='email' style='width:1000px;margin: auto;'>";

        $body .= "<table role='presentation' border='0' width='100%' cellspacing='0' >";
        $body .= "<tr>";
        $body .= "<td align='start' style='color:white;'>";
        $body .= "<img src='https://i.postimg.cc/brBmSbph/email-Header.png' width='100%'>";
        $body .= "</tr>";
        $body .= "</td>";
        $body .= "</table>";

        $body .= "<table style='background-color: white;' role='hello' border='0' width='100%' cellspacing='0'>";
        $body .= "<tr>";
        $body .= "<td align='center' style='width:1000px; font-size: 17px; text-align:center; margin:auto; color: rgb(117, 117, 117);'>";

        $body .= "<p>Hola,$name su reserva se $state con exito, a 
                             continuacion le adjuntamos los detalles.</p>";

        $body .= "</tr>";
        $body .= "<tr>";
        $body .= "<td align='center' style='font-size: 17px; text-align:center; margin:auto; color: rgb(117, 117, 117);'>";
        $body .= "<p>¡Lo esperamos con ansias!</p>";
        $body .= "</td>";
        $body .= "</tr>";
        $body .= "</td>";
        $body .= "</table>";


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
