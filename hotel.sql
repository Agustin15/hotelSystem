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

CREATE TABLE servicio(
idServicio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombreServicio VARCHAR(50) NOT NULL,
descripcionServicio VARCHAR(80) NOT NULL,
precio DOUBLE NOT NULL,
imagen BLOB,
maxStock INT
);

CREATE TABLE serviciosExtra_habitacion(
idServicioHabitacion INT NOT NULL,
cantidad INT NOT NULL,
idReservaHabitacionServicio INT NOT NULL,
numHabitacionServicio INT NOT NULL,

PRIMARY KEY(idServicioHabitacion,numHabitacionServicio,idReservaHabitacionServicio),

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


INSERT INTO tipo_habitacion (categoria,camas,capacidad,terraza,precio) VALUES ("Suite",5,6,1,500);
INSERT INTO tipo_habitacion (categoria,camas,capacidad,terraza,precio) VALUES ("Deluxe",4,5,1,300);
INSERT INTO tipo_habitacion (categoria,camas,capacidad,terraza,precio) VALUES ("Estandar",3,4,1,120);

INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Telefono","telefono de la habitacion, tarifa 50 pesos por minuto",50,null,null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Masajes","servicio de masajes a la habitacion 500 pesos por persona",500,null,null);

INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Agua 1L",75,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/agua1L.jpg'),2);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Agua 650ml",55,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/agua650mL.jpg'),6);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","CocaCola 1L",100,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/cocacola1l.jpg'),2);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","CocaCola 650ml",80,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/cocacola650ml.jpg'),6);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Whiskey Jack Daniels 5cl",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/whiskeyJackDaniels5cl.jpg'),5);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Ron Captain Morgan 5cl",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/ronCaptainMorgan5cl.jpg'),5);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Fernet branca 5cl",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/fernetBranca5cl.jpg'),5);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Red bull 250ml",100,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/redBull250ml.jpg'),6);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Papas pringles comun 37g",75,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pringlesComun37g.png'),4);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Papas pringles crema y cebolla 37g",75,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pringlesCrema37g.jpg'),4);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Papas pringles barbacoa 37g",75,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pringlesBBQ37g.png'),4);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Manix salados 160g",70,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/manixSalados160g.jpg'),4);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Minibar","Chocolate Milka 90g",100,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/chocoMilka90g.jpg'),3);

INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Agua 1L",65,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/agua1L.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Agua 650ml",45,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/agua650ml.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","CocaCola 1L",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/cocacola1l.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","CocaCola 650ml",70,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/cocacola650ml.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Fanta 1L",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/fanta1l.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Fanta 650ml",70,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/fanta650ml.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Sprite 1L",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/sprite1l.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Sprite 650ml",70,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/sprite650ml.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Whiskey Jack Daniels 1L",900,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/whiskeyJackDaniels1l.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Ron Captain Morgan 1L",900,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/ronCaptainMorgan1l.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Fernet Branca 750mL",800,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/fernetBranca750ml.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Red bull 250mL",100,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/redBull250ml.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Hamburguesa comun con fritas",160,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/hamburComun.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Hamburguesa con queso mas fritas",200,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/hamburConQueso.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Hamburguesa completa mas fritas",280,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/hamburCompleta.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Sandwiche caliente",85,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/sandwicheCaliente.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Pizza comun",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pizzaComun.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Pizza con muzarrella",140,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pizzaMuzzarella.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Pizza con pepperoni",180,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pizzaPepperoni.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Licuado de frutilla",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/licuadoFrutilla.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Licuado de chocolate",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/licuadoChocolate.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Licuado de vainilla",90,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/licuadoVainilla.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Licuado de oreo",110,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/licuadoOreo.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Helado de chocolate",70,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/heladoChocolate.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Helado de frutilla",70,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/heladoFrutilla.jpg'),null);
INSERT INTO servicio(nombreServicio,descripcionServicio,precio,imagen,maxStock) VALUES ("Cantina","Helado de vainilla",70,load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/heladoVainilla.jpg'),null);






