<?php

require_once(__DIR__ . "/../config/connection.php");

require "libreria/PHPMailer/src/PHPMailer.php";
require "libreria/PHPMailer/src/SMTP.php";
require "libreria/PHPMailer/src/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


class Email
{

    private $name, $destinary, $subject, $body, $fileToAttachment, $connection;

    public function __construct()
    {

        $this->connection = new Connection();
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


    public function setAttachment($file)
    {

        $this->fileToAttachment = $file;
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


            $mail->setFrom("systemfivehotel@gmail.com", "System Hotel");
            $mail->addAddress($this->destinary, $this->name);
            $mail->isHTML(true);

            $mail->CharSet = 'UTF-8';
            $mail->Subject = $this->subject;
            $mail->Body = $this->body;
            $mail->addAttachment(
                $this->fileToAttachment,
                "Detalles reserva",
                "base64",
                "application/pdf"
            );


            $mail->Username = "systemfivehotel@gmail.com";
            $mail->Password = "g r d j b z w q e o y e v d f s";

            $response = $mail->send();
            return $response;
        } catch (Exception $e) {

            $e->getMessage();
        }
    }

    public function addEmailBookingConfirm($idBooking, $stateConfirm, $stateUpdate)
    {

        $query = $this->connection->connect()->prepare("insert into correo_reserva_confirmada(idReserva,stateConfirm,stateUpdate)
        values(?,?,?)");
        $query->bind_param("iii", $idBooking, $stateConfirm, $stateUpdate);
        $result = $query->execute();

        return $result;
    }
    public function updateStateUpdateEmailById($idEmail, $stateUpdate)
    {

        $query = $this->connection->connect()->prepare("update correo_reserva_confirmada set stateUpdate=?
        where idCorreo=?");
        $query->bind_param("ii",$stateUpdate,$idEmail);
        $result = $query->execute();
        return $result;
    }

    public function getEmailBookingConfirmByIdBooking($idBooking)
    {

        $query = $this->connection->connect()->prepare("select * from correo_reserva_confirmada where 
        idReserva=?");
        $query->bind_param("i", $idBooking);
        $query->execute();
        $result = $query->get_result();

        return $result->fetch_array(MYSQLI_ASSOC);
    }
}
