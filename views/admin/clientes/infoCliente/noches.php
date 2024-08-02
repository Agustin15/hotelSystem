<?php

$noches = json_decode($_GET['noches']);

?>


<div class="detallesNoches">

    <img class="cerrarNoches" src="../../../img/cerrarVentana.png">
    <img src="../../../img/nochesInfo.png">
    <br>
    <h2>Noches</h2>
    <br>

    <label><?php echo $noches ?></label>

</div>

