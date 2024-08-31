<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../estilos/styleAdmin.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="../../js/alertas.js" defer></script>
    <script src="../../js/scriptsLogin.js" defer></script>

    <title>Admin-Login</title>

<body>



    <div id="loginAdmin">

        <div class="panelInfo">


            <img src="../../img/iconSystem.png">
            <h4>Hotel System</h4>
            <p>Inicie sesion como administrador o usuario comun </p>


        </div>

        <div class="containForm">


            <div class="title">
                <img src="../../img/iconFormLogin.png">

                <h4>Complete sus datos</h4>
            </div>

            <form onsubmit="setUser(event)">
                <div class="user">
                    <div>
                        <label for="userId">Usuario</label>
                    </div>
                    <div>
                        <input autocomplete="off" placeholder="Ingrese su usuario" id="userId" type="text" name="user">
                    </div>
                </div>

                <div class="password">
                    <div>
                        <label for="passwordId">Contraseña</label>
                    </div>
                    <div class="passwordContain">
                        <input autocomplete="off" placeholder="Ingrese su contraseña" id="passwordId" type="password" name="password">
                   
                        <img onclick="passwordStatus(event)" src="../../img/ojo.png">
                    </div>
                </div>

                <div class="containButton">


                    <button type="submit">Ingresar

                    <img class="spinner" src="../../img/spinner.gif">

                    </button>
                </div>

                <div id="alertLogin">

                    <div class="bodyAlert">
                        <div class="icon">
                            <img src="../../img/advertenciaLogin.png">
                        </div>
                        <div class="msj">
                            <div class="advertencia">
                                <span>Advertencia</span>
                            </div>
                            <div>
                                <p>Complete todos los campos</p>
                            </div>
                        </div>
                    </div>
                    <div class="progresBar">
                        <div class="progres">

                        </div>
                    </div>
                </div>

            </form>
        </div>

    </div>



</body>

</html>