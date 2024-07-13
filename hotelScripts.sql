INSERT INTO admin(usuario,genero,contrasenia) values("Agustin","M","Agus2004");
INSERT INTO admin(usuario,genero,contrasenia) values("Andrea","F","andre123");

INSERT INTO clientes(correo,nombre,apellido,telefono) values("valu@gmail.com","Valentin","Miranda","094335741");
INSERT INTO clientes(correo,nombre,apellido,telefono) values("seba@gmail.com","Srbastian","Miranda","094335741");
INSERT INTO clientes(correo,nombre,apellido,telefono) values("tomas@gmail.com","Tomas","Poggio","09999999");
INSERT INTO clientes(correo,nombre,apellido,telefono) values("manuel@gmail.com","Manuel","Poggio","097777777");
INSERT INTO clientes(correo,nombre,apellido,telefono) values("daniel@gmail.com","Daniel","Poggio","094444444");

UPDATE servicio set imagen=load_file('C:/xampp/htdocs/Sistema hotel/img/imgProducts/pringlesBBQ37g.png')
 where idServicio=13;