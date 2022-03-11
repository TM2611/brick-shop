--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TABLE IF EXISTS Messageboard;
-- CREATE TABLE IF NOT EXISTS Messageboard (
--     id   serial      PRIMARY KEY,
--     time timestamp DEFAULT now(),
--     msg  text
-- );

-- INSERT INTO Messageboard (msg) VALUES
-- ( 'these are three default messages' ),
-- ( 'delivered from the server' ),
-- ( 'using a custom route' );

DROP TABLE IF EXISTS Product CASCADE;
CREATE TABLE Product (
  id serial PRIMARY KEY,
  pname varchar(40) not null,
  colour varchar(15) not null,
  price int not null, -- pence
  inStock int not null,
  description text not null,
  imgSrc varchar(40) not null
);
  

INSERT INTO Product (pname, colour, price, instock, description, imgSrc) VALUES
('Brick 1x1', 'red', '20', 100, 'description', './images/single/purple/brick1x1.png');