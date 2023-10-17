USE compras_create;

CREATE TABLE `brand` (/*Marca*/
  `id_brand` int NOT NULL,
  `name_brand` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id_brand`)
) ENGINE=InnoDB;

INSERT INTO brand VALUES
(1,'TOMMY HILFIGER','Playeras de cuello redondo Hombre'),
(2,'POLO RALPH LAUREN','Playeras de cuello redondo y manga corta Hombre'),
(3,'HUGO BOSS','Playeras básicas cuello redondo y manga corta Hombre'),
(4,'LACOSTE','Playeras de cuello redondo y manga corta estampada Hombre');