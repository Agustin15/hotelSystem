<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);


?>

<br>
<img src="http://localhost/Sistema%20Hotel/img/borrarAlerta.png">
<br>
<h2>¿Desea eliminar la reserva <?php echo $reserva['idReserva'] ?></h2>
<br>

<button class="btnSi">Si</button>
<button class="btnNo">No</button>


<script>
    $(".btnSi").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");
        $(".divOpcion").remove();

        const datosReserva = {
            "idReserva": "<?php echo $reserva['idReserva'] ?>",
            "llegada": "<?php echo $reserva['llegada'] ?>",
            "salida": "<?php echo $reserva['salida'] ?>",
            "cantidadHabitaciones": "<?php echo $reserva['cantidadHabitaciones'] ?>",
        };

        var datosReservaJson = [];

       
        datosReservaJson.push(encodeURIComponent(JSON.stringify(datosReserva)));
        console.log(datosReservaJson);

        var url = `http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionReserva.php?reserva=
        ${datosReservaJson}`;
        fetch(url, {


                method: "DELETE"


            })
            .then(resp => resp.json())
            .then(data_resp => {
                if (data_resp) {


                    $('.divOpcion').removeClass('divConfirmacionDelete');
                    $('.divOpcion').empty();

                }
                aviso(data_resp, "Eliminar");
            })



    });


    $(".btnNo").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");

        $('.divOpcion').removeClass('divConfirmacionDelete');
        $('.divOpcion').empty();
        location.reload();

    })
</script>