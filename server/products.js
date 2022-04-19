import sqlite from 'sqlite';
import uuid from 'uuid-random'

async function init() {
  const db = await sqlite.open('./db.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './server/migrations-sqlite' });
  return db;
}

const dbConn = init();

export async function filterColour(colour) {
  const db = await dbConn;
  return db.all('SELECT * FROM Product WHERE Colour = ? ORDER BY UnitsInStock ', colour);
}

export async function findAllSingles() {
  const db = await dbConn;
  return db.all('SELECT * FROM Product ORDER BY UnitsInStock ');
}

export async function sortHighToLow(colour) {
  const db = await dbConn;
  if (colour === 'any') {
    return db.all('SELECT * FROM Product ORDER BY price DESC')
  }
  return db.all('SELECT * FROM Product WHERE Colour = ? ORDER BY price DESC', colour);
}

export async function sortLowToHigh(colour) {
  const db = await dbConn;
  if (colour === 'any') {
    return db.all('SELECT * FROM Product ORDER BY price')
  }
  return db.all('SELECT * FROM Product WHERE Colour = ? ORDER BY price', colour);
}

export async function sortMostPopular(colour) {
  const db = await dbConn;
  if (colour === 'any') {
    return db.all('SELECT * FROM Product ORDER BY UnitsInStock ')
  }
  return db.all('SELECT * FROM Product WHERE Colour = ? ORDER BY UnitsInStock ', colour);
}

export async function sortAllSingles(sort) {
  const db = await dbConn;
  if (sort === 'PriceLowtohigh') {
    return db.all('SELECT * FROM Product ORDER BY price')
  }
  else if (sort === 'PriceHightolow') {
    return db.all('SELECT * FROM Product ORDER BY price DESC')
  }
  //MostPopular
  return db.all('SELECT * FROM Product ORDER BY UnitsInStock ')
}
// LIMIT, OFFSET, QUERY ORDER BY.
// const params = new URLSearchParams(window.location.search);
// const page = params.get('page') || 0;


export async function findProduct(id) {
  const db = await dbConn;
  return db.get('SELECT * FROM Product WHERE ProductID = ?', id);
}


//TODO: order table
export async function processOrder(req){
  const db = await dbConn;
  const userID = req.params.userID;
  const basket = new Map (JSON.parse(req.params.basket))
  for (const [productID, quantityOrdered] of basket.entries()) {
    await decreaseProductStock(productID, quantityOrdered)
  }
  return true //TODO: return true acceptable?
}


async function decreaseProductStock(productID, quantity){
  const db = await dbConn;
  const stmnt = await db.get('SELECT UnitsInStock FROM Product WHERE ProductID = ?', productID);
  const currentStock = stmnt.UnitsInStock;
  if(quantity >= currentStock){
    // TODO: tell customer
    // TODO: order more stock?
    throw new Error('Quantity exceeds stock level')
  }
  const updatedStock = currentStock - quantity;
  const updateStatement = await db.run('UPDATE Product SET UnitsInStock = ? WHERE ProductID = ?', [updatedStock, productID]);
  // if nothing was updated, the productID doesn't exist
  if (updateStatement.changes === 0) throw new Error('product not found');
  console.log(productID,"old stock:",currentStock);
  console.log(productID,"new stock:",updatedStock);
  return true
}



// --------------------- ADMIN ----------------------------- //

export async function addProduct(req){
  const db = await dbConn;
  const id = uuid()
  req.file.path = req.file.path.replace(/\\/g, "/")
  const product = {
    ProductID: id,
    ProductName : req.body.name,
    Colour : req.body.colour,
    CategoryName : req.body.category,
    Price : req.body.price,
    UnitsInStock : req.body.stock,
    ProductDesc : req.body.desc,
    ProductImage: req.file.path
   }
  await db.run('INSERT INTO Product VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  [product.ProductID, 
    product.ProductName, 
    product.Colour, 
    product.CategoryName, 
    product.Price, 
    product.UnitsInStock, 
    product.ProductDesc, 
    product.ProductImage
  ]);
  console.log(product);
  return product
}

// TODO: More ways to update existing product?

export async function adminIncreaseProductStock(req){
  const productID = req.body.productID
  const quantity = parseInt(req.body.quantity)
  const result = await increaseProductStock(productID, quantity);
  if (!result){
    throw new Error('Stock update Failed')
  }
  return true


}


export async function adminDecreaseProductStock(req){
  const productID = req.body.productID
  const quantity = parseInt(req.body.quantity)
  const result = await decreaseProductStock(productID, quantity);
  if (!result){
    throw new Error('Stock update Failed')
  }
  return true

}


export async function adminSetProductStock(req){
  const productID = req.body.productID
  const quantity = parseInt(req.body.quantity)
  const result = await setProductStock(productID, quantity);
  if (!result){
    throw new Error('Stock update Failed')
  }
  return true

}

async function setProductStock(productID, quantity){
  const db = await dbConn;
  const updatedStock = quantity
  //TODO: display current stock to user or remove stmt + currentStock
  const stmnt = await db.get('SELECT UnitsInStock FROM Product WHERE ProductID = ?', productID);
  const currentStock = stmnt.UnitsInStock;
  const updateStatement = await db.run('UPDATE Product SET UnitsInStock = ? WHERE ProductID = ?', [updatedStock, productID]);
  // if nothing was updated, the productID doesn't exist
  if (updateStatement.changes === 0) throw new Error('product not found');
  console.log(productID,"old stock:",currentStock);
  console.log(productID,"new stock:",updatedStock);
  return true
}

async function increaseProductStock(productID, quantity){
  const db = await dbConn;
  const stmnt = await db.get('SELECT UnitsInStock FROM Product WHERE ProductID = ?', productID);
  const currentStock = stmnt.UnitsInStock;
  const updatedStock = currentStock + quantity;
  const updateStatement = await db.run('UPDATE Product SET UnitsInStock = ? WHERE ProductID = ?', [updatedStock, productID]);
  // if nothing was updated, the productID doesn't exist
  if (updateStatement.changes === 0) throw new Error('product not found');
  console.log(productID,"old stock:",currentStock);
  console.log(productID,"new stock:",updatedStock);
  return true
}


export async function deleteProduct(req){
  const db = await dbConn;
  const id = req.body.id
  const product = await findProduct(id)
  const statement = await db.run('DELETE FROM Product WHERE ProductID = ?', id)
  //ID does not exist if no changes are made
  if (statement.changes === 0) throw new Error('Product not found');
  return product
}

// Test functions - remove EVERYTHING below when done

export async function deleteProductByName(name){
  const db = await dbConn;
  const statement = await db.run('DELETE FROM Product WHERE ProductName = ?', name)
  //ID does not exist if no changes are made
  if (statement.changes === 0) throw new Error('Product not found');
  console.log('removed product:',name);
}

export async function addAProduct(){
  const db = await dbConn;
  const statement = await db.run('INSERT INTO Product VALUES("as5fgd", "Brick 1x1", "purple", "brick", 6, 9100, "description", "./images/single/purple/brick1x1.png")')
  if (statement.changes === 0) throw new Error('Product not found');
  console.log('ADDED product:',"as5fgd");
  return findProduct('as5fgd')
}
