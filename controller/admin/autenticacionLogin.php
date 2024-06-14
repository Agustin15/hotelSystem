<?php


if (!empty($_POST['user']) && !empty($_POST['password'])) {

    $usuario = $_POST['user'];
    $contrasenia = $_POST['password'];

    require("../../model/claseAdmin.php");


    $admin = new admin();

    $registro = $admin->selectAdminUser($usuario, $contrasenia);

    if ($registro != null) {

        session_id("login");
        session_start();
        $_SESSION['usuario'] = $usuario;

        header("location:../../views/admin/panelAdmin.php");
    } else {
?>

        <?php
        include("../../views/admin/loginAdmin.php");

        ?>
        <script>
            alertaCompleteDatos("Nombre de usuario o contraseña incorrectos");
        </script>


    <?php
    }
} else {

    ?>

    <?php

    include("../../views/admin/loginAdmin.php");

    ?>
    <script>
        alertaCompleteDatos("Complete todos los campos");
    </script>

<?php
}

?>