INSERT INTO usuarios(usuario,genero,rol,contrasenia) values("Agustin","M","admin","Agus2004");
INSERT INTO usuarios(usuario,genero,rol,contrasenia) values("Andrea","F","encargado","andre123");

INSERT INTO clientes(correo,nombre,apellido,telefono) values("valu@gmail.com","Valentin","Miranda","094335741");
INSERT INTO clientes(correo,nombre,apellido,telefono) values("seba@gmail.com","Srbastian","Miranda","094335741");
INSERT INTO clientes(correo,nombre,apellido,telefono) values("tomas@gmail.com","Tomas","Poggio","09999999");
INSERT INTO clientes(correo,nombre,apellido,telefono) values("manuel@gmail.com","Manuel","Poggio","097777777");
INSERT INTO clientes(correo,nombre,apellido,telefono) values("daniel@gmail.com","Daniel","Poggio","094444444");


ALTER TABLE tipo_habitacion ADD COLUMN imagenUno BLOB NOT NULL AFTER categoria;
ALTER TABLE tipo_habitacion ADD COLUMN imagenDos BLOB NOT NULL AFTER imagenUno;
ALTER TABLE tipo_habitacion ADD COLUMN imagenTres BLOB NOT NULL AFTER imagenDos;

UPDATE tipo_habitacion set imagenUno=load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab1_2.jpg"),
imagenDos=load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab2_2.jpg"),imagenTres=
load_file("C:/xampp/htdocs/Sistema hotel/img/bannerHab3_2.jpg") 
where categoria="Estandar";