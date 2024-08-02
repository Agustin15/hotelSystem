<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../estilos/styleAdmin.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="../../js/alertas.js" defer></script>
    <script src="../../js/scriptsLogin.js" defer ></script>

    <title>Admin-Login</title>

<body>
    <header id="headerLogin">

        <div id="logo">
            <img src="../../img/revision.png" width="50px">
            <h1>Sistema Hotel</h1>
        </div>


        <ul>

            <li><a href="../../views/index.html">Inicio</a></li>
            <li><a href="../../views/habitaciones.html">Habitaciones</a></li>
            <li><a href="../../views/index.html #sobreNosotros">Sobre nosotros</a></li>
            <li><a href="../../views/index.html #contacto">Contacto</a></li>


        </ul>


        <ul class="redes">
            <li><img src="../../img/instagram.png"></li>
            <li><img src="../../img/facebook.png"></li>
            <li><img src="../../img/whatsapp.png"></li>

        </ul>
    </header>



    <div class="avisoCompleteDatosFormulario">

        <img src="../../img/avisoHuespedes.png">

        <label></label>

    </div>

    <div id="loginAdmin">

        <br>
        <form method="POST" id="formLogin">

            <br>
            <h1>Ingresa los datos</h1>
            <br>

            <img class="iconoUser" src="../../img/usuario.png">
            <input id="usuario" type="text" name="user" autocomplete="off">
            <label class="lblUsuario">Usuario</label>
            <br>

            <input id="password" type="password" name="password" autocomplete="off">
            <label class="lblPass">Contraseña</label>
            <img class="iconoPass" src="../../img/ojo.png">
            <br>

            <input type="submit" value="Login">

            <div id="disenioForm">

                <br>
                <h2>Inicio de sesion de Admin</h2>
                <br>
                <img class="imgForm" src="../../img/imgForm.png">

            </div>

        </form>


    </div>



</body>

</html>

