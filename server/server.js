import express from 'express';
import path from 'path';
import url from 'url';
import authConfig from './auth_config.js';
import auth0Helpers from './auth0_helper.js';
import * as dbjs from './db-helper.js';
import {requiredScopes as requiredScopes} from 'express-oauth2-jwt-bearer';
import multer from 'multer';

const app = express();

const auth0 = auth0Helpers(authConfig);


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

// FUTURE IMPLEMENTATION

// protect /admin from unauthenticated users
app.use('/checkout', auth0.checkJwt)

app.use('/admin', auth0.checkJwt);
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

async function getAllSingles(req, res) {
  res.json(await dbjs.findAllSingles());
}

async function getAllProducts(req, res) {
  res.json(await dbjs.listAllProducts());
}

async function getAdminOpenOrders(req, res) {
  res.json(await dbjs.listOpenOrders());
}


async function getCustomerOrders(req, res) {
  res.json(await dbjs.listCustomerOrders(req));
}

async function getSingleColour(req, res) {
  const result = await dbjs.filterColour(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getLowToHigh(req, res) {
  const result = await dbjs.sortLowToHigh(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getHighToLow(req, res) {
  const result = await dbjs.sortHighToLow(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getMostPopular(req, res) {
  const result = await dbjs.sortMostPopular(req.params.colour)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function postProduct(req, res){
  const product = await dbjs.addProduct(req)
  if (!product) {
    res.status(404).send('Failed to add product');
    return;
  }
  res.send(`${product.ProductName} added, ID:${product.ProductID}`)
}

async function postDeleteProduct(req, res){
  const deletedProduct = await dbjs.deleteProduct(req)
  if (!deletedProduct) {
    res.status(404).send('Failed to find product');
    return;
  }
  res.json(deletedProduct)
}

async function postOrderDispatched(req,res){
  const result = await dbjs.orderDispatched(req)
  if (!result) {
    res.status(404).send('Failed to mark order as dispatched');
    return;
  }
  res.json(result)
}

async function getProduct(req, res){
  const product = await dbjs.findProduct(req.params.id)
  if (!product) {
    res.status(404).send('Failed to find product');
    return;
  }
  res.json(product)
}


async function getSingleSorted(req, res) {
  const result = await dbjs.sortAllSingles(req.params.sort)
  if (!result) {
    res.status(404).send('No match for that colour');
    return;
  }
  res.json(result);
}

async function getBonsaiProducts(req, res){
  const result = await dbjs.findBonsaiProducts(req)
  if (!result) {
    res.status(404).send('Kit parts not found');
    return;
  }
  res.json(result);
}

async function getKit(req, res){
  const result = await dbjs.findKit(req)
  if (!result) {
    res.status(404).send('Kit parts not found');
    return;
  }
  res.json(result);
}

async function getAllKitIDs(req, res){
  const result = await dbjs.findAllKitIDs(req)
  if (!result) {
    res.status(404).send('Kit parts not found');
    return;
  }
  res.json(result);
}


async function getKitPrice(req, res){
  const result = await dbjs.getKitPrice(req)
  if (!result) {
    res.status(404).send('Kit parts not found');
    return;
  }
  res.json(result);
}

async function postProcessOrder(req, res){
  const profile = await auth0.getProfile(req);
  const orderDetails = await dbjs.processOrder(req, profile)
  if(!orderDetails){
    console.log('Purchase Failed');
    res.status(404).send('Purchase Failed');
    return
  }
  console.log('Purchase Succesful');
  res.json(orderDetails);
}

async function postCreateCustomer(req, res){
  const response = await dbjs.createCustomer(req)
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
  const result = await dbjs.adminIncreaseProductStock(req)
  if(!result){
    console.log('Stock Increase Failed');
    res.status(404).send('Stock Increase Failed');
    return
  }
  console.log('Stock Increase Succesful');
  res.json(result);
}

async function putAdminDecreaseStock(req, res){
  const result = await dbjs.adminDecreaseProductStock(req)
  if(!result){
    res.status(404).send('Stock Removal Failed');
    console.log('Stock Removal Failed');
    return
  }
  console.log('Stock Removal Succesful');
  res.json(result)
}

async function putAdminSetProductStock(req, res){
  const result = await dbjs.adminSetProductStock(req)
  if(!result){
    res.status(404).send('Stock Update Failed');
    console.log('Stock Update Failed');
    return
  }
  console.log('Stock Update Succesful');
  res.json(result) //TODO: fix return to client
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
app.get('/kit/bonsai/parts', asyncWrap(getBonsaiProducts));
app.get('/kit/:kitID', asyncWrap(getKit));
app.get('/kit/all/id', asyncWrap(getAllKitIDs));
app.get('/kit/:kitID/price', asyncWrap(getKitPrice));
app.get('/orders/:userID', asyncWrap(getCustomerOrders));
app.post('/checkout/submit/:basket', asyncWrap(postProcessOrder));
app.post('/create/customer/:accountType/:strProfile/', asyncWrap(postCreateCustomer));

//ADMIN ROUTES
app.get('/test/product/stock/list', asyncWrap(getAllProducts));
app.get('/test/orders/open', asyncWrap(getAdminOpenOrders));
app.put('/test/product/increase/:id/:quantity', asyncWrap(putAdminIncreaseStock))
app.put('/test/product/decrease/:id/:quantity', asyncWrap(putAdminDecreaseStock))
app.put('/test/product/set/:id/:quantity', asyncWrap(putAdminSetProductStock))
app.post('/test/upload', upload.single('picfile'), asyncWrap(postProduct));
app.post('/test/product/:id', asyncWrap(postDeleteProduct));
app.post('/test/dispatched/:orderID', asyncWrap(postOrderDispatched)); 


// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
