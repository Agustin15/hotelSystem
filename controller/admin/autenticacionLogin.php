<?php

$dataUser = json_decode(file_get_contents("php://input"), true);


if (!empty($dataUser['user']) && !empty($dataUser['password'])) {


    $user = $dataUser['user'];
    $password = $dataUser['password'];

    require("../../model/claseAdmin.php");


    $admin = new admin();

    $registro = $admin->selectAdminUser($user,$password);

    if ($registro != null) {

        session_id("login");
        session_start();
        $_SESSION['usuario'] = $user;

        
        $respuestaJson=json_encode($respuesta=array("resultado"=>true));



    } else {


        $respuestaJson=json_encode($respuesta=array("resultado"=>"Usuario o contraseña ingresada incorrectos"));

        echo $respuestaJson;
        
    }
}else{

  
    header("location:../../views/admin/loginAdmin.php");
}

echo $respuestaJson;
