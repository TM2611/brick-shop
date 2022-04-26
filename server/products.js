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

export async function processOrder(req){
  const db = await dbConn;
  const customerID = req.params.userID;
  const orderID = uuid()
  const orderItemID = uuid()
  const orderDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const basket = new Map (JSON.parse(req.params.basket))
  for (const [productID, quantityOrdered] of basket.entries()) {
    const stockChange = await decreaseProductStock(productID, quantityOrdered)
    console.log(`ProductID\n Old stock:${stockChange.oldStock}, New stock:${stockChange.newStock}`); 
    const orderStmnt = await db.run('INSERT INTO Order VALUES(?,?,?)', [orderID, customerID, orderDate])
    const orderItemStmnt = await db.run('INSERT INTO OrderItem VALUES(?,?,?,?)', [orderItemID, orderID, productID, quantityOrdered])
    if (orderStmnt.changes === 0 || orderItemStmnt.changes === 0) throw new Error('Failed to Process Order');
  }
  return orderID
}

export async function createCustomer(req){
  const db = await dbConn;
  const profile = JSON.parse(req.params.strProfile)
  const customerID = profile.sub;
  const email = profile.email
  console.log(req.params.strProfile);
  if(req.params.accountType === 'named'){
    const firstname = profile.given_name;
    const surname = profile.family_name;
    console.log(firstname);
    console.log(surname);
    const stmnt = await db.run('INSERT INTO Customer VALUES (?, ?, ?, ?)',[customerID, email, firstname, surname])
    if (stmnt.changes === 0) throw new Error('Failed to Register');
  } else{
    const stmnt = await db.run('INSERT INTO Customer VALUES (?, ?, ?, ?)',[customerID, email, null, null])
    if (stmnt.changes === 0) throw new Error('Failed to Register');
  }
  return true
}

async function decreaseProductStock(productID, quantity){
  const db = await dbConn;
  const stmnt = await db.get('SELECT UnitsInStock FROM Product WHERE ProductID = ?', productID);
  const oldStock = stmnt.UnitsInStock;
  if(quantity > oldStock){
    // TODO: tell customer
    // TODO: order more stock?
    throw new Error('Quantity exceeds stock level')
    
  }
  const newStock = oldStock - quantity;
  const updateStatement = await db.run('UPDATE Product SET UnitsInStock = ? WHERE ProductID = ?', [newStock, productID]);
  // if nothing was updated, the productID doesn't exist
  if (updateStatement.changes === 0) throw new Error('product not found');
  console.log(productID,"old stock:",oldStock);
  console.log(productID,"new stock:",newStock);
  return {oldStock: oldStock, newStock:newStock};
}



// --------------------- ADMIN ----------------------------- //

export async function addProduct(req){
  const db = await dbConn;
  const id = uuid()
  req.file.path = req.file.path.replace(/\\/g, "/") //if windows
  req.file.path = req.file.path.replace('public/','') //remove 'public' so path is relative to client
  const product = {
    ProductID: id,
    ProductName : req.body.name,
    Colour : req.body.colour,
    CategoryName : req.body.category,
    Price : req.body.price,
    UnitsInStock : req.body.stock,
    ProductDesc : req.body.desc,
    ProductImageSrc: req.file.path
   }
   //TODO: usee add a product function
  await db.run('INSERT INTO Product VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  [product.ProductID, 
    product.ProductName, 
    product.Colour, 
    product.CategoryName, 
    product.Price, 
    product.UnitsInStock, 
    product.ProductDesc, 
    product.ProductImageSrc
  ]);
  console.log(product);
  return product
}

export async function listAllProducts(req){
  const db = await dbConn;
  return db.all('SELECT * FROM Product ORDER BY ProductName'); 
}

export async function listAllOrders(req){
  const db = await dbConn;
  return db.all('SELECT * FROM Orders ORDER BY OrderDate'); 
}

export async function adminIncreaseProductStock(req){
  const productID = req.params.id;
  const quantity = parseInt(req.params.quantity);
  const result = await increaseProductStock(productID, quantity);
  if (!result){
    throw new Error('Stock update Failed')
  }
  return result;
}

export async function adminDecreaseProductStock(req){
  const productID = req.params.id;
  const quantity = parseInt(req.params.quantity);
  const result = await decreaseProductStock(productID, quantity);
  if (!result){
    throw new Error('Stock update Failed');
  }
  return result;
}

export async function adminSetProductStock(req){
  const productID = req.params.id;
  const quantity = parseInt(req.params.quantity);
  // const result = await setProductStock(productID, quantity);
  
  const db = await dbConn;
  const newStock = quantity;
  //TODO: display current stock to user or remove stmt + oldStock
  const stmnt = await db.get('SELECT UnitsInStock FROM Product WHERE ProductID = ?', productID);
  const oldStock = stmnt.UnitsInStock;
  const updateStatement = await db.run('UPDATE Product SET UnitsInStock = ? WHERE ProductID = ?', [newStock, productID]);
  // if nothing was updated, the productID doesn't exist
  if (updateStatement.changes === 0) throw new Error('Stock update failed');
  // console.log(productID,"old stock:",oldStock);
  // console.log(productID,"new stock:",newStock);
  return {oldStock: oldStock, newStock:newStock};
}

// async function setProductStock(productID, quantity){
//   const db = await dbConn;
//   const newStock = quantity;
//   //TODO: display current stock to user or remove stmt + oldStock
//   const stmnt = await db.get('SELECT UnitsInStock FROM Product WHERE ProductID = ?', productID);
//   const oldStock = stmnt.UnitsInStock;
//   const updateStatement = await db.run('UPDATE Product SET UnitsInStock = ? WHERE ProductID = ?', [newStock, productID]);
//   // if nothing was updated, the productID doesn't exist
//   if (updateStatement.changes === 0) throw new Error('product not found');
//   return {oldStock: oldStock, newStock:newStock};
// }

async function increaseProductStock(productID, quantity){
  const db = await dbConn;
  const stmnt = await db.get('SELECT UnitsInStock FROM Product WHERE ProductID = ?', productID);
  const oldStock = stmnt.UnitsInStock;
  const newStock = oldStock + quantity;
  const updateStatement = await db.run('UPDATE Product SET UnitsInStock = ? WHERE ProductID = ?', [newStock, productID]);
  // if nothing was updated, the productID doesn't exist
  if (updateStatement.changes === 0) throw new Error('product not found');
  return {oldStock: oldStock, newStock:newStock};
}

export async function deleteProduct(req){
  const db = await dbConn;
  const id = req.params.id
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
