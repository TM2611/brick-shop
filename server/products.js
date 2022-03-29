import sqlite from 'sqlite';

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './server/migrations-sqlite' });
  return db;
}

const dbConn = init();

export async function filterColour(colour) {
  const db = await dbConn;
  return db.all('SELECT * FROM Product WHERE colour = ? ORDER BY instock', colour);
}

export async function findAllSingles() {
  const db = await dbConn;
  return db.all('SELECT * FROM Product ORDER BY instock');
}

export async function sortHighToLow(colour) {
  const db = await dbConn;
  if (colour === 'any') {
    return db.all('SELECT * FROM Product ORDER BY price DESC')
  }
  return db.all('SELECT * FROM Product WHERE colour = ? ORDER BY price DESC', colour);
}

export async function sortLowToHigh(colour) {
  const db = await dbConn;
  if (colour === 'any') {
    return db.all('SELECT * FROM Product ORDER BY price')
  }
  return db.all('SELECT * FROM Product WHERE colour = ? ORDER BY price', colour);
}

export async function sortMostPopular(colour) {
  const db = await dbConn;
  if (colour === 'any') {
    return db.all('SELECT * FROM Product ORDER BY instock')
  }
  return db.all('SELECT * FROM Product WHERE colour = ? ORDER BY instock', colour);
}

// LIMIT, OFFSET, QUERY ORDER BY.
// const params = new URLSearchParams(window.location.search);
// const page = params.get('page') || 0;


// TODO: add and edit products (admin)

// export async function addProduct(product) {
//   const db = await dbConn;
//   const id = uuid();
//   await db.run('INSERT INTO Messages VALUES (?, ?, ?, ?, ?, ?, ?)',
//     [id, pName, colour, pType, price, instock, info, imgsrc]);
// }
