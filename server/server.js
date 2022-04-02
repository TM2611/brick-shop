import express from 'express';

import path from 'path';

import url from 'url';

import authConfig from './auth_config.js';

import auth0Helpers from './auth0_helper.js';

import * as products from './products.js';

import {requiredScopes as requiredScopes} from 'express-oauth2-jwt-bearer';

const app = express();

const auth0 = auth0Helpers(authConfig);

 // protect /api from unauthenticated users
app.use('/api', auth0.checkJwt);

// Middleware to configure individual routes to look for 'read:admin' scope
const checkScopes = requiredScopes('read:admin');

app.get('/api/admin', auth0.checkJwt, checkScopes, function(req, res) {
  console.log(checkScopes);
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:admin to see this.'
  });
});


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

async function getAllSingles(req, res) {
  res.json(await products.findAllSingles());
}


async function getSingleColour(req, res) {
  const result = await products.filterColour(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getLowToHigh(req, res) {
  const result = await products.sortLowToHigh(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getHighToLow(req, res) {
  const result = await products.sortHighToLow(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getMostPopular(req, res) {
  const result = await products.sortMostPopular(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

//Routes
app.get('/single', asyncWrap(getAllSingles));
app.get('/single/colour/:colour', asyncWrap(getSingleColour));
app.get('/single/colour/:colour/PriceHightolow', asyncWrap(getHighToLow));
app.get('/single/colour/:colour/PriceLowtohigh', asyncWrap(getLowToHigh));
app.get('/single/colour/:colour/MostPopular', asyncWrap(getMostPopular));

app.get('/api/profile', async (req, res) => {
  const userId = auth0.getUserID(req);
  const profile = await auth0.getProfile(req);
  res.send(`Hello user ${userId}, here's your profile:\n${JSON.stringify(profile, null, 2)}`);
});

app.get('/api/checkout', async (req, res) => {
  const userId = auth0.getUserID(req);
  const profile = await auth0.getProfile(req);
  res.send(`Hello user ${userId}, here's your profile:\n${JSON.stringify(profile, null, 2)}`);
});


// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
