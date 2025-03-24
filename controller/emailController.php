<?php

require("../model/email.php");
class emailController
{
    private $email;
    public function __construct()
    {
        $this->email = new Email();
    }

    public function sendEmailQuery($req)
    {


        try {
            $name = $req["name"];
            $destinary = $req["destinary"];
            $subject = $req["subject"];
            $body = $req["body"];

            $this->email->setName($name);
            $this->email->setDestinary($destinary);
            $this->email->setSubject($subject);
            $this->email->setBody($body);

            $emailSend = $this->email->sendMail();
            if (isset($emailSend["error"])) {
                throw new Error($emailSend["error"]);
            }
            return $emailSend;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }
}
