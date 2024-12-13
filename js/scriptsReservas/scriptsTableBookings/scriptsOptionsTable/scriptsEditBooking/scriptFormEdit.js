export const drawFormEdit = (body, booking) => {
  let nights = calculateDifferenceNight(
    new Date(booking.fechaLlegada),
    new Date(booking.fechaSalida)
  );

  body.innerHTML = `
   <div class="containFormAndCart">

        <div class="row">
            <div class="containForm">

                <div class="nights">

                    <h3>${nights} noches</h3>
                    <img src="../../../img/night.png">
                </div>

                <form>
                    <div class="rowOne">
                        <div class="dateStart">
                            <label>Fecha de llegada</label>
                            <input name="startBooking" value=${booking.fechaLlegada} type="date" id="startInput">
                        </div>

                        <div class="dateEnd">
                            <label>Fecha de Salida</label>
                            <input name="endBooking" value=${booking.fechaSalida}  type="date" id="endInput">
                        </div>

                    </div>

                    <div class="rowTwo">
                        <div class="client">
                            <label>Cliente</label>
                            <select name="client" id="clientsSelect"></select>
                        </div>


                        <div class="quantityRooms">

                            <label>Cantidad de habitaciones</label>
                            <input id="roomsQuantityInput" name="roomsQuantity" type="number" readonly
                                placeholder="Habitaciones seleccionadas">
                            <div class="msjError">
                                <div class="arrow"></div>
                                <img src="../../../img/advertenciaLogin.png">
                                <span></span>
                            </div>
                        </div>

                    </div>

                    <button type="submit">
                        Editar reserva
                        <img class="loadingForm" src="../../../img/spinnerBooking.gif">
                    </button>


                    <div class="alertForm">
                        <img>
                        <div class="body">
                            <span></span>

                            <p></p>
                        </div>

                    </div>

                </form>

            </div>

            <div class="cartRooms">

                <h3>Habitaciones seleccionadas</h3>

                <ul></ul>

                <div class="total">

                    <span>Total</span>

                </div>
            </div>

        </div>

</div>
    `;
};

function calculateDifferenceNight(llegada, salida) {
  let differenceTime = salida.getTime() - llegada.getTime();

  let differenceDays = Math.round(differenceTime / (1000 * 3600 * 24));

  return differenceDays;
}
