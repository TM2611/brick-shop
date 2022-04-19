import express from 'express';

import path from 'path';

import url from 'url';

import authConfig from './auth_config.js';

import auth0Helpers from './auth0_helper.js';

import * as pjs from './products.js';

import {requiredScopes as requiredScopes} from 'express-oauth2-jwt-bearer';

const app = express();

const auth0 = auth0Helpers(authConfig);

import multer from 'multer';
//const upload = multer({ dest: '../public/images/admin/uploads' })


//TODO: multer not adding to images to folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/images/admin/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
});
const upload = multer({storage: storage})

 // protect /admin from unauthenticated users
app.use('/admin', auth0.checkJwt);


//Middleware to allow us to handle URL encoded data
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: false}));

// Middleware to configure individual routes to look for 'read:admin' scope
const checkScopes = requiredScopes('read:admin');

app.get('/admin', auth0.checkJwt, checkScopes, function(req, res) {
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
  res.json(await pjs.findAllSingles());
}


async function getSingleColour(req, res) {
  const result = await pjs.filterColour(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getLowToHigh(req, res) {
  const result = await pjs.sortLowToHigh(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getHighToLow(req, res) {
  const result = await pjs.sortHighToLow(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getMostPopular(req, res) {
  const result = await pjs.sortMostPopular(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}


async function postProduct(req, res){
  const product = await pjs.addProduct(req)
  if (!product) {
    res.status(404).send('Failed to add product');
    return;
  }
  res.send(`${product.ProductName} added, ID:${product.ProductID}`)
}

// TODO: remove image from image folder?
// TODO: return admin back to remove.html + update text content of '#server-response'
async function deleteProduct(req, res){
  const deletedProduct = await pjs.deleteProduct(req)
  console.log(res.body);
  res.status(200)
  .send(`Removed product: ${deletedProduct.ProductName} (ID: ${deletedProduct.ProductID})`) //TODO: incorrect response
}

async function getProduct(req, res){
  const product = await pjs.findProduct(req.params.id)
  if (!product) {
    res.status(404).send('Failed to find product');
    return;
  }
  res.json(product)
}


async function getSingleSorted(req, res) {
  const result = await pjs.sortAllSingles(req.params.sort)
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
app.get('/single/sort/:sort', asyncWrap(getSingleSorted));
app.get('/single/colour/:colour', asyncWrap(getSingleColour));
app.get('/single/colour/:colour/PriceHightolow', asyncWrap(getHighToLow));
app.get('/single/colour/:colour/PriceLowtohigh', asyncWrap(getLowToHigh));
app.get('/single/colour/:colour/MostPopular', asyncWrap(getMostPopular));
app.post('/test/upload', upload.single('picfile'), asyncWrap(postProduct));
app.post('/test/product/id', asyncWrap(deleteProduct)); 
app.get('/test/product/:id', asyncWrap(getProduct));
app.delete('/test/product/name/:name', asyncWrap(deleteAllProductsByName));


app.get('/profile', async (req, res) => {
  const userId = auth0.getUserID(req); //TODO: UserID returning null
  const profile = await auth0.getProfile(req);
  res.send(`Hello user ${userId}, here's your profile:\n${JSON.stringify(profile, null, 2)}`);
});

app.get('/checkout', async (req, res) => {
  const userId = auth0.getUserID(req);
  const profile = await auth0.getProfile(req);
  res.send(`Hello user ${userId}, here's your profile:\n${JSON.stringify(profile, null, 2)}`);
});

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


// Test functions - remove EVERYTHING below when done
async function deleteAllProductsByName(req, res){
  await pjs.deleteAllProductsByName(req.params.name)
  res.status(200).send('Deleted Products');
}

async function addAProduct(req, res){
  const product = await pjs.addAProduct()
  res.json(product)
}

app.delete('/test/product/name/:name', asyncWrap(deleteAllProductsByName));



// async function postProduct(req, res){
//   const product = await pjs.addProduct(req)
//   if (!product) {
//     res.status(404).send('Failed to add product');
//     return;
//   }
//   res.send(`${product.ProductName} added, ID:${product.ProductID}`)
// }

async function putStock(req, res){
  const resp = await pjs.processOrder(req)
}

app.put('/checkout/submit/:userID/:basket', asyncWrap(putStock))
