CREATE DATABASE HOTEL;
use HOTEL;

CREATE TABLE usuarios(
usuario VARCHAR(50) primary key,
genero CHAR,
rol VARCHAR(11),
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
imagenUno BLOB NOT NULL,
imagenDos BLOB NOT NULL,
imagenTres BLOB NOT NULL,
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

CREATE TABLE servicio(
idServicio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombreServicio VARCHAR(50) NOT NULL,
descripcionServicio VARCHAR(80) NOT NULL,
precio DOUBLE NOT NULL,
imagen BLOB,
maxStock INT
);

CREATE TABLE serviciosExtra_habitacion(
idServicioHabitacion INT NOT NULL AUTO_INCREMENT,
idServicio INT NOT NULL,
cantidad INT NOT NULL,
idReservaHabitacionServicio INT NOT NULL,
numHabitacionServicio INT NOT NULL,

PRIMARY KEY(idServicioHabitacion,idServicio,numHabitacionServicio,idReservaHabitacionServicio),

CONSTRAINT fk_idServicio FOREIGN KEY (idServicioHabitacion)
REFERENCES servicio(idServicio) ON DELETE CASCADE ON UPDATE CASCADE,

CONSTRAINT fk_numHabitacionServicio FOREIGN KEY (numHabitacionServicio)
REFERENCES habitacion_reservada(numHabitacionReservada) ON DELETE CASCADE ON UPDATE CASCADE,

CONSTRAINT fk_idReservaServicio FOREIGN KEY (idReservaHabitacionServicio)
REFERENCES habitacion_reservada(idReservaHabitacion) ON DELETE CASCADE ON UPDATE CASCADE

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


INSERT INTO tipo_habitacion (categoria,imagenUno,imagenDos,imagenTres,camas,capacidad,terraza,precio) VALUES ("Suite",
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab1Suite_2.jpg"),
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab2Suite_2.jpg"),
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab3Suite_2.jpg"),5,6,1,300);
INSERT INTO tipo_habitacion (categoria,imagenUno,imagenDos,imagenTres,camas,capacidad,terraza,precio) VALUES ("Deluxe",
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab1Deluxe_2.jpg"),
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab2Deluxe_2.jpg"),
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab3Deluxe_2.jpg"),4,5,1,160);
INSERT INTO tipo_habitacion (categoria,imagenUno,imagenDos,imagenTres,camas,capacidad,terraza,precio) VALUES ("Estandar",
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab1_2.jpg"),
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab2_2.jpg"),
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab3_2.jpg"),3,4,1,80);

INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Telefono","telefono de la habitacion, tarifa 0.5 dolar por minuto",0.5,load_file('C:/xampp/htdocs/Sistema hotel/img/telephone.png'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Masajes","servicio de masajes a la habitacion, 10 dolares por sesion",10,load_file('C:/xampp/htdocs/Sistema hotel/img/massage.png'),null);

INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Agua Nativa 1L",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/water1L.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Agua Vitale 650ml",1.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/water650mL.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","CocaCola 1L",3,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/cocacola1l.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","CocaCola 650ml",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/cocacola650ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Whiskey Jack Daniels 5cl",2.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/jackDaniels5cl.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Ron Captain Morgan 5cl",2.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/captainMorgan5cl.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Fernet branca 5cl",2.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/fernetBranca5cl.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Red bull 250ml",3,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/redBull250ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Papas Lays Clasicas 150g",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/chispsLays.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Papas Lays Crema y cebolla 150g",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/chipsOnionAndCream.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Manix salados 160g",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/manix.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Chocolate Milka 90g",3,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/chocoMilka90g.png'),50);

INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Agua Nativa 1L",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/water1L.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Agua Vitale 650ml",1,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/water650ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","CocaCola 1L",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/cocacola1l.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","CocaCola 650ml",1.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/cocacola650ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Fanta 1L",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/fanta1l.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Fanta 650ml",1.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/fanta650ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Sprite 1L",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/sprite1l.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Sprite 650ml",1.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/sprite550ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Whiskey Jack Daniels 750ml",25,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/jackDaniels750ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Ron Captain Morgan 750ml",25,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/captainMorgan750ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Fernet Branca 750ml",25,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/fernetBranca750ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Red bull 250ml",4.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/redBull250ml.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Combo Hamburguesa con Fritas y Bebida",4,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/comboBurger.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Pizza comun",2.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pizzaComun.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Pizza con muzarrella",3.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pizzaMuzarella.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Pizza con pepperoni",3.5,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pizzaPepperoni.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Milkshake de frutilla",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/milkshakeStrawberry.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Milkshake de chocolate",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/milkshakeChoco.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Milkshake de vainilla",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/milshakeVanila.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Helado de chocolate",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/iceCreamChoco.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Helado de frutilla",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/iceCreamStrawBerry.png'),50);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Helado de vainilla",2,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/iceCreamVanila.png'),50);






