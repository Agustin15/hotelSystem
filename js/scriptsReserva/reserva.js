

async function submitBooking(clientBooking) {
    try {
      loading(true);
      const response = await fetch(
        "http://localhost/sistema%20Hotel/controller/datosReserva.php",
        {
          method: "POST",
          body: JSON.stringify(clientBooking),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = await response.json();
  
      if (result.respuesta == true) {
        localStorage.clear();
        location.href =
          "../views/confirmacionReserva.php?option=bookingRealized&mailClient=" +
          clientBooking.client.mail;
      } else {
        throw result.respuesta;
      }
    } catch (error) {
      alertErrorBooking(error);
    } finally {
      loading(false);
    }
  }
  
  async function updateBookingExists(clientBooking, bookingPast) {
    const updateBooking = {
      idBooking: JSON.stringify(bookingPast.idReserva),
      client: clientBooking.client,
      quantityRoomsBookingPast: bookingPast.cantidadHabitaciones,
      booking: clientBooking.booking,
    };
  
    try {
      loading(true);
      const response = await fetch(
        "http://localhost/sistema%20Hotel/controller/datosReserva.php",
  
        {
          method: "PUT",
          body: JSON.stringify(updateBooking),
          headers: {
            "Content-Type": "applica{tion/json",
          },
        }
      );
  
      const result = await response.json();
  
      if (result.respuesta) {
        localStorage.clear();
        location.href =
          "../views/confirmacionReserva.php?option=bookingUpdated&mailClient=" +
          clientBooking.client.mail;
      } else {
        throw result.respuesta;
      }
    } catch (error) {
      alertErrorBooking(error);
    } finally {
      loading(false);
    }
  }
  