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



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/admin/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
});
const upload = multer({storage: storage})



//Middleware to allow us to handle URL encoded data
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: false}));

// Middleware to configure individual routes to look for 'read:admin' scope
const checkScopes = requiredScopes('read:admin');

// protect /admin from unauthenticated users
app.use('/admin', auth0.checkJwt);
app.use('/profile', auth0.checkJwt);
app.use('/userID', auth0.checkJwt);
app.use('/checkout', auth0.checkJwt)

//TODO: need checkjwt?
app.get('/admin/check', auth0.checkJwt, checkScopes, function(req, res) {
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

// app.get('/admin', (req, res) => {
//   res.send({
//     msg: 'Accessed admin page',
//   });
// });

async function getAllSingles(req, res) {
  res.json(await pjs.findAllSingles());
}

async function getAllProducts(req, res) {
  res.json(await pjs.listAllProducts());
}

async function getAllOrders(req, res) {
  res.json(await pjs.listAllOrders());
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
  // res.status(200)
  // .send(`Removed product: ${deletedProduct.ProductName} (ID: ${deletedProduct.ProductID})`) //TODO: incorrect response
  if (!deletedProduct) {
    res.status(404).send('Failed to find product');
    return;
  }
  res.json(deletedProduct)

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

async function postProcessOrder(req, res){
  const orderID = await pjs.processOrder(req)
  if(!orderID){
    console.log('Purchase Failed');
    res.status(404).send('Purchase Failed');
    return
  }
  console.log('Purchase Succesful');
  res.json(orderID);
}

async function postCreateCustomer(req, res){
  const response = await pjs.createCustomer(req)
  if(!response){
    console.log('Customer Registration Failed');
    res.status(404).send('Failed to register');
    return
  }
  console.log('Customer Creation Succesful');
  res.send('Customer Creation Succesful');
}

// ADMIN
async function putAdminIncreaseStock(req, res){
  const result = await pjs.adminIncreaseProductStock(req)
  if(!result){
    console.log('Stock Increase Failed');
    res.status(404).send('Stock Increase Failed');
    return
  }
  console.log('Stock Increase Succesful');
  res.json(result);
}

async function putAdminDecreaseStock(req, res){
  const result = await pjs.adminDecreaseProductStock(req)
  if(!result){
    res.status(404).send('Stock Removal Failed');
    console.log('Stock Removal Failed');
    return
  }
  console.log('Stock Removal Succesful');
  res.json(result)
}

async function putAdminSetProductStock(req, res){
  const result = await pjs.adminSetProductStock(req)
  if(!result){
    res.status(404).send('Stock Update Failed');
    console.log('Stock Update Failed');
    return
  }
  console.log('Stock Update Succesful');
  res.json(result) //TODO: fix return to client
}


function hasGivenName(profile){
  return profile.given_name !== undefined
  //google-oauth2 has given_name and family_name
  //auth0 does
}

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

//ROUTES
app.get('/single', asyncWrap(getAllSingles));
app.get('/single/sort/:sort', asyncWrap(getSingleSorted));
app.get('/single/colour/:colour', asyncWrap(getSingleColour));
app.get('/single/colour/:colour/PriceHightolow', asyncWrap(getHighToLow));
app.get('/single/colour/:colour/PriceLowtohigh', asyncWrap(getLowToHigh));
app.get('/single/colour/:colour/MostPopular', asyncWrap(getMostPopular));
app.get('/test/product/:id', asyncWrap(getProduct));
app.post('/checkout/submit/:userID/:basket', asyncWrap(postProcessOrder));
app.post('/create/customer/:accountType/:strProfile/', asyncWrap(postCreateCustomer));

//ADMIN ROUTES
app.get('/test/product/stock/list', asyncWrap(getAllProducts));
app.get('/test/orders', asyncWrap(getAllOrders));
app.post('/test/product/:id', asyncWrap(deleteProduct)); 
app.put('/test/product/increase/:id/:quantity', asyncWrap(putAdminIncreaseStock))
app.put('/test/product/decrease/:id/:quantity', asyncWrap(putAdminDecreaseStock))
app.put('/test/product/set/:id/:quantity', asyncWrap(putAdminSetProductStock))
app.post('/test/upload', upload.single('picfile'), asyncWrap(postProduct));



app.get('/profile', async (req, res) => {
  const profile = await auth0.getProfile(req);
  res.send(JSON.stringify(profile, null, 2));
});

app.get('/checkout/name', async (req, res) => {
  const profile = await auth0.getProfile(req);
  if(hasGivenName(profile)){
    res.send('named')
  }
  res.send('notNamed')
});

app.get('/userID', async (req, res) => {
  const userId = auth0.getUserID(req);
  res.send(userId);
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





