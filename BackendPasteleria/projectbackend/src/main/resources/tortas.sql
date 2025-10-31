USE base;

INSERT INTO usuario (id, nombre, email, password, rol, activo) 
VALUES (1, 'Daniel Morales', 'daniel@pasteleria.com', '1234', 'ADMIN', true);

INSERT INTO usuario (id, nombre, email, password, rol, activo) 
VALUES (2, 'María Pérez', 'maria@pasteleria.com', 'abcd', 'CLIENTE', true);

INSERT INTO producto (id, nombre, descripcion, precio, stock, categoria, activo, usuario_id)
VALUES
(1, 'Torta de Chocolate', 'Torta húmeda con ganache de chocolate', 5500, 10, 'Tortas', true, 1),
(2, 'Cheesecake de Frutilla', 'Suave pastel de queso con mermelada de frutilla', 4800, 6, 'Tortas', true, 1),
(3, 'Cupcake de Vainilla', 'Cupcake con betún de crema pastelera', 1500, 25, 'Cupcakes', true, 2);

SELECT * FROM usuario;
SELECT * FROM producto;
