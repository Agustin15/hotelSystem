<?php

if (!isset($_COOKIE["userToken"]) && !isset($_COOKIE["userRefreshToken"])) {

    header("location:../../../loginAdmin/index.html");
}

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../../img/revision2.png">

    <link rel="stylesheet" href="../../../../estilos/responsive/styleRevenuesAdmin/styleBillToMobile.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
        integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"
        integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>

    <script defer type="module" src="../.././../../js/scriptsRevenues/scriptBillMobile.js"></script>
    <title>Factura reserva Mobile</title>
</head>

<body>


    <div class="containBill">
        <div class="contentBill"></div>

    </div>

</body>

</html>