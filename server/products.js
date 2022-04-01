import sqlite from 'sqlite';

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


// TODO: add and edit products (admin)

// export async function addProduct(product) {
//   const db = await dbConn;
//   const id = uuid();
//   await db.run('INSERT INTO Messages VALUES (?, ?, ?, ?, ?, ?, ?)',
//     [id, ProductName, colour, pType, price, UnitsInStock , info, ProductImage]);
// }
