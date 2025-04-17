<?php
if (!isset($_COOKIE["userToken"]) && !isset($_COOKIE["userRefreshToken"])) {
    header("location:../../loginAdmin/index.html");
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../img/revision2.png">
    
    <link rel="stylesheet" href="../../../estilos/styleEditProfile/styleMain.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleEditProfile/styleResponsiveMain.css">
    <link rel="stylesheet" href="../../../estilos/styleEditProfile/styleChangeAvatar.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleEditProfile/styleResponsiveChangeAvatar.css">
    <link rel="stylesheet" href="../../../estilos/styleEditProfile/styleEditPassword.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleEditProfile/styleResponsiveEditPassword.css">


    <script type="module" src="../../../js/scriptsEditProfile/userData.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
        integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Editar perfil</title>
</head>

<body>

    <div class="modal"></div>
    <header>
        <li onclick="location.href='../index.php'">
            <img src="../../../img/home.png">
            <a>Inicio</a>
        </li>

        <div class="title">
            <h3>Editar Perfil</h3>
        </div>
    </header>

    <div class="containForm">

        <div class="loadingUser">

            <span>Cargando datos perfil</span>
            <img src="../../../img/spinnerMain.gif">

        </div>

        <div class="noDataUser">
            <img src="../../../img/userNoFound.png">
            <span>Ups,no se pudieron cargar los datos</span>
        </div>

        <form>
            <div class="optionPassword">
                <img class="editPassword" src="../../../img/editPassword.png">
            </div>
            <div class="avatar">
                <div class="icon">
                    <img>
                </div>
            </div>
            <button type="button" class="changeAvatar">
                <span>Editar</span>
                <img src="../../../img/editProfileAvatar.png">
            </button>
            <h4>Agustin Miranda</h4>

            <div class="inputs">

                <div class="rol">
                    <label>Rol:</label>
                    <span id="idRol"></span>

                </div>
                <div class="row">
                    <div class="name">

                        <label>Nombre</label>
                        <input autocomplete="off" type="text" id="nombre" name="name">
                        <div class="errorInput">
                            <img src="../../../img/warningInput.png">
                            <p></p>
                        </div>
                    </div>
                    <div class="lastname">

                        <label>Apellido</label>
                        <input autocomplete="off" type="text" id="apellido" name="lastname">
                        <div class="errorInput">
                            <img src="../../../img/warningInput.png">
                            <p></p>
                        </div>

                    </div>
                </div>

                <div class="rowTwo">
                    <div class="user">
                        <label>Usuario</label>
                        <input autocomplete="off" type="text" id="usuario" name="username">
                        <div class="errorInput">
                            <img src="../../../img/warningInput.png">
                            <p></p>
                        </div>
                    </div>

                    <div class="email">
                        <label>Correo</label>
                        <input autocomplete="off" type="text" id="correo" name="email">
                        <div class="errorInput">
                            <img src="../../../img/warningInput.png">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" class="btnSave">Guardar
                <img class="loadingSave" src="../../../img/spinnerBooking.gif">
            </button>

            <div class="alertSave">
                <img>
                <div class="body">
                    <span></span>
                    <p></p>
                </div>
            </div>

        </form>
    </div>
    <br><br>
</body>

</html>