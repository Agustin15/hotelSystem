INSERT INTO usuarios(usuario,nombre,apellido,correo,imagen,rol,contrasenia) values("agusMiranda","Agustin","Miranda","agus20m05@gmail.com",
load_file("C:/xampp/htdocs/Sistema hotel/img/avatarMan.png"),"Administrador","Dudu22558899");

INSERT INTO usuarios(usuario,nombre,apellido,correo,imagen,rol,contrasenia) values("andreaPoggio","Andrea","Poggio","andrea@gmail.com",
load_file("C:/xampp/htdocs/Sistema hotel/img/avatarWoman.png"),"Empleado","andre123456");

use hotel;
ALTER TABLE serviciosextra_habitacion DROP foreign key fk_idServicio;
ALTER TABLE serviciosextra_habitacion Add CONSTRAINT fk_idServicio foreign key (idServicio) 
references servicio(idServicio);