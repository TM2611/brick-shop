/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from 'express';
import path from 'path';
import url from 'url';

import authConfig from './auth_config.js';

// import * as fil from './filter.js';
// import filterColour from './filter.js';

import auth0Helpers from './auth0_helper.js';

import * as sqlp from './sqlLiteProduct.js';


const app = express();

const auth0 = auth0Helpers(authConfig);

// // protect /checkout from unauthenticated users
// app.use('/api', auth0.checkJwt);

// app.get('/api/checkout', async (req, res) => {
//   await console.log('Checked Out succesfully');
// });

// this will serve the files present in /public
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../public')));

// Endpoint to serve the configuration file to client-side app.
app.get('/auth_config', (req, res) => {
  res.json(authConfig);
});

app.get('/admin', (req, res) => {
  res.send({
    msg: 'Accessed admin page',
  });
});

async function getSingles(req, res) {
  res.json(await sqlp.findSingles());
}

// Filter
async function getSingleColour(req, res) {
  res.json(await sqlp.filterColour(req.params.colour));
}

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/singles', asyncWrap(getSingles));
app.get('single/colour/:colour', asyncWrap(getSingleColour));


// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
