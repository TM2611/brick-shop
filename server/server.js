/* eslint-disable no-unused-vars */
import express from 'express';
import path from 'path';
import url from 'url';

import authConfig from './auth_config.js';

import auth0Helpers from './auth0_helper.js';

// import { products } from './products.js';
import { products } from './products2.js';

const app = express();

const auth0 = auth0Helpers(authConfig);

app.get('/products', (req, res) => {
  res.json(products);
});

// protect /checkout from unauthenticated users
app.use('/api', auth0.checkJwt);

app.get('/api/checkout', async (req, res) => {
  await console.log('Checked Out succesfully');
});

// this will serve the files present in /public
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../public')));

// Endpoint to serve the configuration file to client-side app.
app.get('/auth_config', (req, res) => {
  res.json(authConfig);
});

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
