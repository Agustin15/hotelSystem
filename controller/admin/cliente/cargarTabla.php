<?php



require("../../../model/claseCliente.php");


$claseCliente = new cliente();
$clientesEstado = $claseCliente->getAllClientes();


if (empty($clientesEstado->fetch_all(MYSQLI_ASSOC))) {

?>

    <script>
        $(document).ready(function() {

            showHideBuscador("none");

        });
    </script>
    <div class="clientesVacio">

        <img src="../../../img/sinDatos.png">
        <br>
        <h3>No hay datos aun</h3>
    </div>


<?php
} else {

?>

    <tr class="headerTable">

        <th>Nombre</th>
        <th>Apellido</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th>Opciones</th>
    </tr>

    <?php

    $clientes = $claseCliente->getAllClientes();
    foreach ($clientes->fetch_all(MYSQLI_ASSOC) as $cliente) {


    ?>
        <tr class="trBody">



            <td class="tdNombre">

                <img src="../../../img/usuarioTable.png">
                <a><?php echo $cliente['nombre'] ?></a>

            </td>
            <td><?php echo $cliente['apellido'] ?></td>

            <td data-correo-cliente="<?php echo $cliente['correo'] ?>" class="tdCorreo"><?php echo $cliente['correo'] ?></td>

            <td><?php echo $cliente['telefono'] ?></td>

            <td>

                <button class="btnEliminar" data-opcion="eliminar" data-id="<?php echo $cliente['idCliente'] ?>" data-correo="<?php echo $cliente['correo'] ?>" data-nombre="<?php echo $cliente['nombre'] ?>" data-apellido="<?php echo $cliente['apellido'] ?>" data-telefono="<?php echo $cliente['telefono'] ?>">


                    <img src="../../../img/borrar.png">
                </button>

                <button class="btnEditar" data-opcion="editar" data-id="<?php echo $cliente['idCliente'] ?>" data-correo="<?php echo $cliente['correo'] ?>" data-nombre="<?php echo $cliente['nombre'] ?>" data-apellido="<?php echo $cliente['apellido'] ?>" data-telefono="<?php echo $cliente['telefono'] ?>">

                    <img src="../../../img/editar.png">

                </button>
                <button class="btnInfo" data-opcion="info" data-id="<?php echo $cliente['idCliente'] ?>" data-correo="<?php echo $cliente['correo'] ?>" data-nombre="<?php echo $cliente['nombre'] ?>" data-apellido="<?php echo $cliente['apellido'] ?>" data-telefono="<?php echo $cliente['telefono'] ?>">

                    <img src="../../../img/detalles.png">

                </button>
            </td>


        </tr>

<?php
    }
}

?>

<script>
    const showHideBuscador = (estado) => {

        $("#buscador").css("display", estado);
        $(".lupa").css("display", estado);

    }

    datosCliente = [];
    const btns = $(".trBody").find("button");

    btns.each(function(index, btn) {

        const opcion = $(btn).data("opcion");

        $(btn).on("click", function() {


            const cliente = {

                "idCliente": $(btn).data("id"),
                "correo": $(btn).data("correo"),
                "nombre": $(btn).data("nombre"),
                "apellido": $(btn).data("apellido"),
                "telefono": $(btn).data("telefono")

            };
            datosCliente.push(cliente);

            switch (opcion) {

                case "eliminar":

                    opcionCliente(datosCliente, "eliminar");

                    break;


                case "editar":

                    opcionCliente(datosCliente, "editar");
                    break;

                case "info":

                    opcionCliente(datosCliente, "info");
                    break;
            }

        });

    });
</script>