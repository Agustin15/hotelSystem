INSERT INTO usuarios(usuario,genero,rol,contrasenia) values("Agustin","M","admin","Agus15052004");
INSERT INTO usuarios(usuario,genero,rol,contrasenia) values("Andrea","F","encargado","andre123");

ALTER TABLE serviciosextra_habitacion DROP foreign key fk_idServicio;
ALTER TABLE serviciosextra_habitacion Add CONSTRAINT fk_idServicio foreign key (idServicio) 
references servicio(idServicio);