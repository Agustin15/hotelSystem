<?php

class logout
{

    public function expireCookie()
    {
        setcookie("userToken", "", time() - 3600, "", "", false, true);
        return array("expired" => true);
    }
}
