<?php

$dataUser = json_decode($_GET['user'], true);
$respuestaJson;

if (!empty($dataUser['user']) && !empty($dataUser['password'])) {


    $user = $dataUser['user'];
    $password = $dataUser['password'];

    require("../../model/claseUsuario.php");


    $usuario = new usuario();

    $issetUser= $usuario->selectUser($user);


    if ($issetUser) {

       if($issetUser['contrasenia']==$dataUser['password']){

           
        session_id("login");
        session_start();
        $_SESSION['usuario'] = $user;

        
        $respuesta=array("respuesta"=>true);
      
       }else{

        $respuesta=array("respuesta"=>"Contraseña incorrecta");
       }


    } else {


      $respuesta=array("respuesta"=>"No reconocemos este usuario");
        
    }
}else{

  
    header("location:../views/admin/loginAdmin.php");
}

echo json_encode($respuesta);
