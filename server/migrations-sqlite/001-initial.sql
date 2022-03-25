CREATE TABLE Product
(
  id CHAR(36) PRIMARY KEY,
  pName varchar(40) not null,
  colour varchar(20) not null,
  pType varchar (20) not null,
  price int not null,
  -- pence
  instock int not null,
  info text not null,
  imgsrc varchar(40) not null
);

INSERT INTO Product
  (id, pName, colour, pType, price, instock, info, imgSrc)
VALUES
  ('as5fgd', 'Brick 1x1', 'purple', 'brick', 20, 9100, 'description', './images/single/purple/brick1x1.png'),
  ('fs3dsd', 'Brick 1x2', 'purple', 'brick', 20, 7100, 'description', './images/single/purple/brick1x1.png'),
  ('sd3fs', 'Brick 1x1', 'red', 'brick', 20, 8100, 'description', './images/single/red/brick1x1.png');

DROP TABLE Products;