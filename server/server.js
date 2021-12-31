import express from 'express';
import path from 'path';
import url from 'url';

import { products } from './products.js';

const app = express();

app.get('/products', (req, res) => {
  res.json(products);
});

// this will serve the files present in static/ inside this stage
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../public')));

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
