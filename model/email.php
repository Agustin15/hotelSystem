<?php

require "libreria/PHPMailer/src/PHPMailer.php";
require "libreria/PHPMailer/src/SMTP.php";
require "libreria/PHPMailer/src/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


class Email
{

    private $name,$dataClient,$dataBooking,$destinary, $subject, $body;


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


            $mail->setFrom("systemfivehotel@gmail.com", "System Hotel");
            $mail->addAddress($this->destinary, $this->name);
            $mail->isHTML(true);

            $mail->Subject = $this->subject;
            $mail->Body = $this->body;

            $mail->Username = "systemfivehotel@gmail.com";
            $mail->Password = "g r d j b z w q e o y e v d f s";

            $response = $mail->send();
        } catch (Exception $e) {

            $e->getMessage();
        }

        return $response;
    }
}
