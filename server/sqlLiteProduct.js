// import uuid from 'uuid-random';
import sqlite from 'sqlite';

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './server/migrations-sqlite' });
  return db;
}

const dbConn = init();

export async function filterColour(colour) {
  const db = await dbConn;
  return db.get('SELECT * FROM Product WHERE colour = ? ORDER BY instock', colour);
}

export async function findSingles() {
  const db = await dbConn;
  return db.all('SELECT * FROM Product ORDER BY instock');
}

// TODO: add and edit products (admin)

// export async function addProduct(product) {
//   const db = await dbConn;
//   const id = uuid();
//   await db.run('INSERT INTO Messages VALUES (?, ?, ?, ?, ?, ?, ?)',
//     [id, pName, colour, pType, price, instock, info, imgsrc]);
// }
