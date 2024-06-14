CREATE DATABASE HOTEL;
use HOTEL;


CREATE TABLE admin(
usuario VARCHAR(50) primary key,
genero CHAR,
contrasenia VARCHAR(200)

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE clientes(
idCliente INT AUTO_INCREMENT,
correo VARCHAR(50) NOT NULL,  
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL, 
telefono VARCHAR(30) NOT NULL,
PRIMARY KEY(idCliente)

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE habitaciones(
numHabitacion INT NOT NULL PRIMARY KEY,
tipoHabitacion VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE tipo_habitacion(
categoria VARCHAR(50) NOT NULL PRIMARY KEY,
camas INT NOT NULL,
capacidad INT NOT NULL,
terraza INT,
precio DOUBLE NOT NULL

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE reserva_habitacion(
idReserva INT NOT NULL AUTO_INCREMENT, 
idClienteReserva INT NOT NULL,
fechaLlegada DATE NOT NULL,
fechaSalida DATE NOT NULL,
cantidadHabitaciones INT NOT NULL,
PRIMARY KEY(idReserva,idClienteReserva),

CONSTRAINT fk_idClienteReserva FOREIGN KEY (idClienteReserva)
REFERENCES clientes(idCliente) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE habitacion_reservada(
idReservaHabitacion INT NOT NULL,
idClienteHabitacion INT NOT NULL,
numHabitacionReservada INT NOT NULL,
fechaLlegadaHabitacion DATE NOT NULL,
fechaSalidaHabitacion DATE NOT NULL,
adultos INT,
ninos INT, 
PRIMARY KEY(idReservaHabitacion,idClienteHabitacion,numHabitacionReservada),

CONSTRAINT fk_idReserva FOREIGN KEY (idReservaHabitacion)
REFERENCES reserva_habitacion(idReserva) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_numHabitacionReservada FOREIGN KEY (numHabitacionReservada)
REFERENCES habitaciones(numHabitacion),
CONSTRAINT fk_idClienteHabitacion FOREIGN KEY (idClienteHabitacion)
REFERENCES clientes(idCliente)

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE serviciosExtra_habitacion(
idServicio INT NOT NULL,
nombreServicio VARCHAR(50) NOT NULL,
precioServicio DOUBLE NOT NULL,
idReservaHabitacionServicio INT NOT NULL,
numHabitacionServicio INT NOT NULL,

primary key(idServicio,numHabitacionServicio,idReservaHabitacionServicio),

CONSTRAINT fk_idReservaServicio FOREIGN KEY(idReservaHabitacionServicio)
REFERENCES habitacion_reservada (idReservaHabitacion) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_numHabitacionServicio FOREIGN KEY(numHabitacionServicio)
REFERENCES habitacion_reservada (numHabitacionReservada) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pago(
idReservaPago INT NOT NULL,
idClientePago INT NOT NULL,
deposito DOUBLE,

PRIMARY KEY(idReservaPago,idClientePago),
CONSTRAINT fk_idReservaPago FOREIGN KEY (idReservaPago)
REFERENCES reserva_habitacion (idReserva) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_idClientePago FOREIGN KEY (idClientePago)
REFERENCES clientes(idCliente) ON DELETE CASCADE ON UPDATE CASCADE

);


INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (1,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (2,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (3,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (4,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (5,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (6,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (7,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (8,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (9,"Estandar");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (10,"Estandar");


INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (11,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (12,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (13,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (14,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (15,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (16,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (17,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (18,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (19,"Deluxe");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (20,"Deluxe");

INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (21,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (22,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (23,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (24,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (25,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (26,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (27,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (28,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (29,"Suite");
INSERT INTO habitaciones (numHabitacion,tipoHabitacion) VALUES (30,"Suite");



INSERT INTO tipo_habitacion (categoria,camas,capacidad,terraza,precio) VALUES ("Suite",5,6,1,500);
INSERT INTO tipo_habitacion (categoria,camas,capacidad,terraza,precio) VALUES ("Deluxe",4,5,1,300);
INSERT INTO tipo_habitacion (categoria,camas,capacidad,terraza,precio) VALUES ("Estandar",3,4,1,120);





