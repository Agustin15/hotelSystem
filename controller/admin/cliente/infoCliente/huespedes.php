<?php

$adultos = json_decode($_GET['adultos']);
$ninos = json_decode($_GET['ninos']);

?>


<div class="detallesHuespedes">

    <img class="cerrarHuespedes" src="../../../img/cerrarVentana.png">
    <img src="../../../img/huespedesInfo.png">
    <br>
    <h2>Total huespedes</h2>
    <br>

    <li>Adultos:<?php echo $adultos ?></li>
    <li>Niños:<?php echo $ninos ?></li>   

</div>

<script>
    $(".cerrarHuespedes").on("click", function() {


        $("#modalInfo").css("display", "none");
        $("#modalInfo").css("cursor", "auto");

        $(".subVentanas").empty();
        


    });
</script>