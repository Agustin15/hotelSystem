<?php

require_once(__DIR__ . "../../config/connection.php");
require_once(__DIR__ . "../../vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

require "libreria/PHPMailer/src/PHPMailer.php";
require "libreria/PHPMailer/src/SMTP.php";
require "libreria/PHPMailer/src/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


class Email
{

    private $name, $destinary, $subject, $body, $connection;

    public function __construct()
    {

        $this->connection = Connection::getInstance()->getConnection();
    }

    public function setName($name)
    {

        $this->name = $name;
    }


    public function setDestinary($destinary)
    {

        $this->destinary = $destinary;
    }

    public function setSubject($subject)
    {

        $this->subject = $subject;
    }

    public function setBody($body)
    {

        $this->body = $body;
    }



    public function sendMail()
    {

        $response = null;
        try {

            $mail = new PHPMailer(true);

            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;


            $mail->setFrom($_ENV["EMAIL_ADDRESS"], "Hotel System");
            $mail->addAddress($this->destinary, $this->name);
            $mail->isHTML(TRUE);

            $mail->CharSet = 'UTF-8';
            $mail->Subject = $this->subject;
            $mail->Body = $this->body;

            $mail->Username = $_ENV["EMAIL_ADDRESS"];
            $mail->Password =  $_ENV["EMAIL_PASSWORD"];

            $response = $mail->send();
            return $response;
        } catch (Exception $e) {

            return array("error" => $e->getMessage());
        }
    }

    public function addEmailBookingConfirm($idBooking, $stateConfirm, $stateUpdate)
    {

        $query = $this->connection->prepare("insert into correo_reserva_confirmada(idReserva,stateConfirm,stateUpdate)
        values(?,?,?)");
        $query->bind_param("iii", $idBooking, $stateConfirm, $stateUpdate);
        $result = $query->execute();

        return $result;
    }
    public function updateStateUpdateEmailById($idEmail, $stateUpdate)
    {

        $query = $this->connection->prepare("update correo_reserva_confirmada set stateUpdate=?
        where idCorreo=?");
        $query->bind_param("ii", $stateUpdate, $idEmail);
        $result = $query->execute();
        return $result;
    }

    public function getEmailBookingConfirmByIdBooking($idBooking)
    {

        $query = $this->connection->prepare("select * from correo_reserva_confirmada where 
        idReserva=?");
        $query->bind_param("i", $idBooking);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }
}
