-- Up

CREATE TABLE Product
(
  ProductID varchar(36) PRIMARY KEY,
  ProductName varchar(20) not null,
  Colour varchar (20) not null,
  CategoryName varchar(30) not null,
  Price int not null,
  UnitsInStock int not null,
  ProductDesc text not null,
  ProductImageSrc varchar(80) not null,
  FOREIGN KEY (CategoryName) REFERENCES Category(CategoryName)
);

CREATE TABLE Orders
(
  OrderID varchar(36) not null,
  CustomerID varchar (30) not null,
  OrderDate datetime not null,
  Dispatched bit not null,
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE OrderItem
(
  OrderItemID varchar(36) PRIMARY KEY,
  OrderID varchar(36) not null,
  ProductID varchar(36) not null,
  Quantity int not null,
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);


CREATE TABLE Customer
(
  CustomerID varchar(36) PRIMARY KEY,
  Email varchar(100) not null,
  Firstname varchar(40),
  Surname varchar(40)
);


CREATE TABLE CustomerAddress
(
  CustomerAddressID varchar(36) PRIMARY KEY,
  CustomerID varchar(36),
  Addressln1 varchar(256),
  Addressln2 varchar(256),
  region varchar(256),
  postcode varchar(32),
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE Category
(
  CategoryName varchar(30) PRIMARY KEY,
  CategoryDesc text
);

CREATE TABLE Kit
(
  KitID varchar(36) PRIMARY KEY,
  -- B0NS41
  KitName varchar(50) not null,
  KitDocSrc varchar(50) not null,
  KitImgSrc varchar(50) not null
);

CREATE TABLE KitProduct
(
  KitID varchar(36) not null,
  ProductID varchar(36) not null,
  ProductQuantity int not null,
  FOREIGN KEY (KitID) REFERENCES Kit(KitID),
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- TODO: Stock ordered by popularity (more popular, less stock)

INSERT INTO Product
  (ProductID, ProductName, Colour, CategoryName, Price, UnitsInStock , ProductDesc, ProductImageSrc)
VALUES
  ('as5fgd', 'Brick 1x1', 'purple', 'brick', 6, 9100, 'description', './images/single/purple/brick1x1.png'),
  ('ha76sd8', 'Brick 1x2', 'purple', 'brick', 10, 9100, 'description', './images/single/purple/brick1x2.png'),
  ('fs3dsd', 'Brick 1x4', 'purple', 'brick', 13, 8723, 'description', './images/single/purple/brick1x4.png'),
  ('sd3fsq', 'Brick 2x2', 'purple', 'brick', 12, 13100, 'description', './images/single/purple/brick2x2.png'),
  ('ahs67ge', 'Brick 2x3', 'purple', 'brick', 16, 8100, 'description', './images/single/purple/brick2x3.png'),
  ('dya6d7c', 'Brick 3x1', 'purple', 'brick', 15, 9440, 'description', './images/single/purple/brick3x1.png'),
  ('yf3dnx8', 'Brick 4x2', 'purple', 'brick', 18, 9272, 'description', './images/single/purple/brick4x2.png'),
  ('jh6agd7m', 'Plate 1x1', 'purple', 'plate', 4, 13277, 'description', './images/single/purple/plate1x1.png'),
  ('rt6qyxk9', 'Plate 2x2', 'purple', 'plate', 10, 11277, 'description', './images/single/purple/plate2x2.png'),
  ('us3c9amp', 'Plate 2x3', 'purple', 'plate', 14, 13717, 'description', './images/single/purple/plate2x3.png'),
  ('hd7sd9an', 'Brick 1x1', 'red', 'brick', 6, 9100, 'description', './images/single/red/brick1x1.png'),
  ('h37xns82', 'Brick 1x2', 'red', 'brick', 10, 9100, 'description', './images/single/red/brick1x2.png'),
  ('i8cns9a', 'Brick 1x4', 'red', 'brick', 13, 8723, 'description', './images/single/red/brick1x4.png'),
  ('q1wd38d', 'Brick 2x2', 'red', 'brick', 12, 13100, 'description', './images/single/red/brick2x2.png'),
  ('p9diaj8', 'Brick 2x3', 'red', 'brick', 16, 8100, 'description', './images/single/red/brick2x3.png'),
  ('y6sjf6sh', 'Brick 3x1', 'red', 'brick', 15, 9440, 'description', './images/single/red/brick3x1.png'),
  ('m29ksla', 'Brick 4x2', 'red', 'brick', 18, 9272, 'description', './images/single/red/brick4x2.png'),
  ('la9smd8v', 'Plate 1x1', 'red', 'plate', 4, 13277, 'description', './images/single/red/plate1x1.png'),
  ('2a5sj8sm', 'Plate 2x2', 'red', 'plate', 10, 11277, 'description', './images/single/red/plate2x2.png'),
  ('hs79akf', 'Plate 2x3', 'red', 'plate', 14, 13717, 'description', './images/single/red/plate2x3.png'),
  ('k38shc8', 'Brick 1x1', 'blue', 'brick', 6, 9100, 'description', './images/single/blue/brick1x1.png'),
  ('as65dgj', 'Brick 1x2', 'blue', 'brick', 10, 9100, 'description', './images/single/blue/brick1x2.png'),
  ('z5agdj7', 'Brick 1x4', 'blue', 'brick', 13, 8723, 'description', './images/single/blue/brick1x4.png'),
  ('ct56sh7', 'Brick 2x2', 'blue', 'brick', 12, 13100, 'description', './images/single/blue/brick2x2.png'),
  ('n6ahsm9', 'Brick 2x3', 'blue', 'brick', 16, 8100, 'description', './images/single/blue/brick2x3.png'),
  ('g6ajdnx', 'Brick 3x1', 'blue', 'brick', 15, 9440, 'description', './images/single/blue/brick3x1.png'),
  ('mahs67d', 'Brick 4x2', 'blue', 'brick', 18, 9272, 'description', './images/single/blue/brick4x2.png'),
  ('os9fksm', 'Plate 1x1', 'blue', 'plate', 4, 13277, 'description', './images/single/blue/plate1x1.png'),
  ('y6d7sno', 'Plate 2x2', 'blue', 'plate', 10, 11277, 'description', './images/single/blue/plate2x2.png'),
  ('j4ymdbc8', 'Plate 2x3', 'blue', 'plate', 14, 13717, 'description', './images/single/blue/plate2x3.png'),
  ('rtd6v8m', 'Brick 1x1', 'yellow', 'brick', 6, 9100, 'description', './images/single/yellow/brick1x1.png'),
  ('p0a9dlk', 'Brick 1x2', 'yellow', 'brick', 10, 9100, 'description', './images/single/yellow/brick1x2.png'),
  ('jd7f8an', 'Brick 1x4', 'yellow', 'brick', 13, 8723, 'description', './images/single/yellow/brick1x4.png'),
  ('w4qbdu8', 'Brick 2x2', 'yellow', 'brick', 12, 13100, 'description', './images/single/yellow/brick2x2.png'),
  ('sh7w9cl', 'Brick 2x3', 'yellow', 'brick', 16, 8100, 'description', './images/single/yellow/brick2x3.png'),
  ('d6eysnv7', 'Brick 3x1', 'yellow', 'brick', 15, 9440, 'description', './images/single/yellow/brick3x1.png'),
  ('pod0c9d', 'Brick 4x2', 'yellow', 'brick', 18, 9272, 'description', './images/single/yellow/brick4x2.png'),
  ('t8abcjax', 'Plate 1x1', 'yellow', 'plate', 4, 13277, 'description', './images/single/yellow/plate1x1.png'),
  ('lsd7sn4', 'Plate 2x2', 'yellow', 'plate', 10, 11277, 'description', './images/single/yellow/plate2x2.png'),
  ('r5eyx8ak', 'Plate 2x3', 'yellow', 'plate', 14, 13717, 'description', './images/single/yellow/plate2x3.png'),
  ('i8ajhfn', 'Brick 1x1', 'white', 'brick', 6, 9100, 'description', './images/single/white/brick1x1.png'),
  ('f8dxnbs', 'Brick 1x2', 'white', 'brick', 10, 9100, 'description', './images/single/white/brick1x2.png'),
  ('jd7sf8an', 'Brick 1x4', 'white', 'brick', 13, 8723, 'description', './images/single/white/brick1x4.png'),
  ('w4qadu8', 'Brick 2x2', 'white', 'brick', 12, 13100, 'description', './images/single/white/brick2x2.png'),
  ('sh7w9al', 'Brick 2x3', 'white', 'brick', 16, 8100, 'description', './images/single/white/brick2x3.png'),
  ('ufy7d8', 'Brick 3x1', 'white', 'brick', 15, 9440, 'description', './images/single/white/brick3x1.png'),
  ('spf4jfh', 'Brick 4x2', 'white', 'brick', 18, 9272, 'description', './images/single/white/brick4x2.png'),
  ('s7fjc0', 'Plate 1x1', 'white', 'plate', 4, 13277, 'description', './images/single/white/plate1x1.png'),
  ('shf7csf', 'Plate 2x2', 'white', 'plate', 10, 11277, 'description', './images/single/white/plate2x2.png'),
  ('phd8cjsl', 'Plate 2x3', 'white', 'plate', 14, 13717, 'description', './images/single/white/plate2x3.png'),
  ('y4jagy7', 'Brick 1x1', 'grey', 'brick', 6, 9100, 'description', './images/single/grey/brick1x1.png'),
  ('bs02hvp', 'Brick 1x2', 'grey', 'brick', 10, 9100, 'description', './images/single/grey/brick1x2.png'),
  ('qm4kfg8', 'Brick 1x4', 'grey', 'brick', 13, 8723, 'description', './images/single/grey/brick1x4.png'),
  ('kjh3usd', 'Brick 2x2', 'grey', 'brick', 12, 13100, 'description', './images/single/grey/brick2x2.png'),
  ('s9efhkn', 'Brick 2x3', 'grey', 'brick', 16, 8100, 'description', './images/single/grey/brick2x3.png'),
  ('1j2iuwm', 'Brick 3x1', 'grey', 'brick', 15, 9440, 'description', './images/single/grey/brick3x1.png'),
  ('5dk5usx', 'Brick 4x2', 'grey', 'brick', 18, 9272, 'description', './images/single/grey/brick4x2.png'),
  ('lsh3ybd', 'Plate 1x1', 'grey', 'plate', 4, 13277, 'description', './images/single/grey/plate1x1.png'),
  ('fkh2gb', 'Plate 2x2', 'grey', 'plate', 10, 11277, 'description', './images/single/grey/plate2x2.png'),
  ('k3j4bb3', 'Plate 2x3', 'grey', 'plate', 14, 13717, 'description', './images/single/grey/plate2x3.png'),
  ('jh5dj8s', 'Brick 1x1', 'brown', 'brick', 6, 9100, 'description', './images/single/brown/brick1x1.png'),
  ('m4hdg6s', 'Brick 1x2', 'brown', 'brick', 10, 9100, 'description', './images/single/brown/brick1x2.png'),
  ('zgd6ath', 'Brick 1x4', 'brown', 'brick', 13, 8723, 'description', './images/single/brown/brick1x4.png'),
  ('q8spm4a', 'Brick 2x2', 'brown', 'brick', 12, 13100, 'description', './images/single/brown/brick2x2.png'),
  ('jm47sh', 'Brick 2x3', 'brown', 'brick', 16, 8100, 'description', './images/single/brown/brick2x3.png'),
  ('7fhs8j', 'Brick 3x1', 'brown', 'brick', 15, 9440, 'description', './images/single/brown/brick3x1.png'),
  ('g7shfjf', 'Brick 4x2', 'brown', 'brick', 18, 9272, 'description', './images/single/brown/brick4x2.png'),
  ('b7shv2a', 'Plate 1x1', 'brown', 'plate', 4, 13277, 'description', './images/single/brown/plate1x1.png'),
  ('fgks2gb3', 'Plate 2x2', 'brown', 'plate', 10, 11277, 'description', './images/single/brown/plate2x2.png'),
  ('a3jsg4bs', 'Plate 2x3', 'brown', 'plate', 14, 13717, 'description', './images/single/brown/plate2x3.png'),
  ('a8jdh6a', 'Brick 1x1', 'green', 'brick', 6, 9100, 'description', './images/single/green/brick1x1.png'),
  ('lf9ak7', 'Brick 1x2', 'green', 'brick', 10, 9100, 'description', './images/single/green/brick1x2.png'),
  ('b4ga79d', 'Brick 1x4', 'green', 'brick', 13, 8723, 'description', './images/single/green/brick1x4.png'),
  ('lp9adm2', 'Brick 2x2', 'green', 'brick', 12, 13100, 'description', './images/single/green/brick2x2.png'),
  ('w7fjakl', 'Brick 2x3', 'green', 'brick', 16, 8100, 'description', './images/single/green/brick2x3.png'),
  ('x7au3dm', 'Brick 3x1', 'green', 'brick', 15, 9440, 'description', './images/single/green/brick3x1.png'),
  ('r6aysnko', 'Brick 4x2', 'green', 'brick', 18, 9272, 'description', './images/single/green/brick4x2.png'),
  ('t4yl0r1', 'Plate 1x1', 'green', 'plate', 4, 13277, 'description', './images/single/green/plate1x1.png'),
  ('j4ym3s', 'Plate 2x2', 'green', 'plate', 10, 11277, 'description', './images/single/green/plate2x2.png'),
  ('j37sbd9', 'Plate 2x3', 'green', 'plate', 14, 13717, 'description', './images/single/green/plate2x3.png'),
  ('jh57d8s', 'Brick 1x1', 'orange', 'brick', 6, 9100, 'description', './images/single/orange/brick1x1.png'),
  ('k49slc', 'Brick 1x2', 'orange', 'brick', 10, 9100, 'description', './images/single/orange/brick1x2.png'),
  ('v7dhs9', 'Brick 1x4', 'orange', 'brick', 13, 8723, 'description', './images/single/orange/brick1x4.png'),
  ('qjf8dks', 'Brick 2x2', 'orange', 'brick', 12, 13100, 'description', './images/single/orange/brick2x2.png'),
  ('c8sjfh7s', 'Brick 2x3', 'orange', 'brick', 16, 8100, 'description', './images/single/orange/brick2x3.png'),
  ('k9d0alop', 'Brick 3x1', 'orange', 'brick', 15, 9440, 'description', './images/single/orange/brick3x1.png'),
  ('ds8dsfds', 'Brick 4x2', 'orange', 'brick', 18, 9272, 'description', './images/single/orange/brick4x2.png'),
  ('a3bcs83c', 'Plate 1x1', 'orange', 'plate', 4, 13277, 'description', './images/single/orange/plate1x1.png'),
  ('j38vs8s', 'Plate 2x2', 'orange', 'plate', 10, 11277, 'description', './images/single/orange/plate2x2.png'),
  ('mvs7akv9', 'Plate 2x3', 'orange', 'plate', 14, 13717, 'description', './images/single/orange/plate2x3.png'),
  ('g8djs0', 'Brick 1x1', 'black', 'brick', 6, 9100, 'description', './images/single/black/brick1x1.png'),
  ('sd9csn0', 'Brick 1x2', 'black', 'brick', 10, 9100, 'description', './images/single/black/brick1x2.png'),
  ('k342kc8', 'Brick 1x4', 'black', 'brick', 13, 8723, 'description', './images/single/black/brick1x4.png'),
  ('cjs8n3mx', 'Brick 2x2', 'black', 'brick', 12, 13100, 'description', './images/single/black/brick2x2.png'),
  ('asd8cs0', 'Brick 2x3', 'black', 'brick', 16, 8100, 'description', './images/single/black/brick2x3.png'),
  ('hx82nc20c', 'Brick 3x1', 'black', 'brick', 15, 9440, 'description', './images/single/black/brick3x1.png'),
  ('dcjs29w9', 'Brick 4x2', 'black', 'brick', 18, 9272, 'description', './images/single/black/brick4x2.png'),
  ('k3l2xc9', 'Plate 1x1', 'black', 'plate', 4, 13277, 'description', './images/single/black/plate1x1.png'),
  ('d3g2jg2', 'Plate 2x2', 'black', 'plate', 10, 11277, 'description', './images/single/black/plate2x2.png'),
  ('a2dfs93h', 'Plate 2x3', 'black', 'plate', 14, 13717, 'description', './images/single/black/plate2x3.png'),
  --Bonsai
  ('dsf43fws2', 'Black Tire 14mm', 'black', 'tire', 18, 4324, '14mm Black Tire. Part of the Bonsai Kit.', './images/single/black/tire.png'),
  ('f234fge5g', 'Brick 1x8', 'brown', 'brick', 14, 9212, '1x8 Brown Brick. Part of the Bonsai Kit.', './images/single/brown/brick1x8.png'),
  ('2sfc3sdfv', 'Brick 2x6', 'brown', 'brick', 15, 12345, '2x6 Brown Brick. Part of the Bonsai Kit.', './images/single/brown/brick2x6.png'),
  ('fr45fnh7', 'Round Tile', 'brown', 'tile', 16, 11346, '1x1 Stud Brown Round Tile. Part of the Bonsai Kit.', './images/single/brown/roundtile1x1.png'),
  ('d43fd3fs', 'Round Tile', 'green', 'tile', 16, 13146, '1x1 Stud Olive Green Round Tile. Part of the Bonsai Kit.', './images/single/green/roundtile1x1.png'),
  ('h5dsw21', '7-Petal Flower', 'pink', 'plant', 19, 12146, 'Dark Pink Flower with 7 Thick Petals. Part of the Bonsai Kit.', './images/single/pink/petal7flower.png'),
  ('r4sdv3xz', 'Frog', 'pink', 'animal', 15, 8146, 'Bright Pink Frog. Part of the Bonsai Kit.', './images/single/pink/frog.png'),
  ('a4vfg5vc', 'Plant Leaves 6x5', 'white', 'plant', 14, 9142, 'White Plant Leaves 6x5 with stud. Part of the Bonsai Kit.', './images/single/white/plantleaves6x5.png'),
  ('f45gh7ex', 'Plate 2x3', 'black', 'plate', 17, 10132, '2x3 Black Plate. Part of the Bonsai Kit.', './images/single/black/plate2x3.png'),
  ('kd8aj3j', 'Modified Plate 2x2', 'black', 'plate', 19, 13112, '2x2 Modified Black Plate. Part of the Bonsai Kit.', './images/single/black/plate-modified2x2.png'),
  ('gf3sz3g', 'Plate 2x10', 'brown', 'plate', 14, 14345, '2x10 Brown Plate. Part of the Bonsai Kit.', './images/single/brown/plate2x10.png'),
  ('jh64da1', 'Wedge Plate 4x4', 'brown', 'plate', 16, 12132, '4x4 Wedge Plate. Part of the Bonsai Kit.', './images/single/brown/wedgeplate4x4.png'),
  ('fg5d4fzs', 'Slope Curved 2x2x3', 'black', 'slope', 18, 7425, '2x2x2 Black Slope Curved. Part of the Bonsai Kit.', './images/single/black/slope-curved2x2x3.png'),
  ('g6hg3ds2', 'Round Tile', 'pink', 'tile', 16, 7658, '1x1 Stud Pink Round Tile. Part of the Bonsai Kit.', './images/single/pink/roundtile1x1.png'),
  ('g4d7hb8m', 'Tile 2x4', 'black', 'tile', 15, 9324, '2x4 Black Tile. Part of the Bonsai Kit.', './images/single/black/tile2x4.png'),
  ('k7jg8sha', 'Groove Plate 1x2', 'brown', 'plate', 16, 11132, '1x2 Groove Plate. Part of the Bonsai Kit.', './images/single/brown/grooveplate1x2.png');


INSERT INTO Kit
  (KitID, KitName, KitDocSrc, KitImgSrc)
VALUES
  ('B0NS41', 'Bonsai Tree', '/instructions/assets/bonsai/bonsai.pdf', '/images/kits/bonsai/bonsai.png');

INSERT INTO KitProduct
  (KitID, ProductID, ProductQuantity)
VALUES
  ('B0NS41', 'r4sdv3xz', 100),
  ('B0NS41', 'fr45fnh7', 100),
  ('B0NS41', 'd43fd3fs', 100),
  ('B0NS41', 'g6hg3ds2', 100),
  ('B0NS41', 'jh64da1', 80),
  ('B0NS41', 'h5dsw21', 50),
  ('B0NS41', 'a4vfg5vc', 50),
  ('B0NS41', '2sfc3sdfv', 50),
  ('B0NS41', 'k7jg8sha', 50),
  ('B0NS41', 'gf3sz3g', 50),
  ('B0NS41', 'f45gh7ex', 40),
  ('B0NS41', 'f234fge5g', 30),
  ('B0NS41', 'fg5d4fzs', 20),
  ('B0NS41', 'g4d7hb8m', 20),
  ('B0NS41', 'kd8aj3j', 6),
  ('B0NS41', 'dsf43fws2', 4);




-- Down

DROP TABLE Product;
DROP TABLE OrderItem
DROP TABLE Orders;
DROP TABLE Customer;
DROP TABLE CustomerAddress;
DROP TABLE Category;
DROP TABLE Kit;
DROP TABLE KitProduct;