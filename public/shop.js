/* eslint-disable no-undef */
async function fetchAuthConfig() {
  // eslint-disable-next-line no-undef
  const response = await fetch('./auth_config');
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}

// global auth libray entry point variable
let auth0 = null;

// Uses fetchAuthConfig to obtain the configuration file and initialize the auth0 variable
async function initializeAuth0Client() {
  const config = await fetchAuthConfig();
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience,
  });
}

// update the state of all authentication-related elements
async function updateAuthUI() {
  const isAuthenticated = await auth0.isAuthenticated();
  document.getElementById('btn-login').disabled = isAuthenticated;
  document.getElementById('btn-logout').disabled = !isAuthenticated;
  document.querySelector('.btn-checkout').disabled = !isAuthenticated;

  if (isAuthenticated) {
    // Content no longer gated
    const user = await auth0.getUser();
    const loginStatus = document.querySelector('#login-status');
    loginStatus.textContent = 'Logged in as ' + user.name;
  }
}

async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin, // redirect user back to the same page they are on currently.
  });
}

function logout() {
  auth0.logout({
    returnTo: window.location.origin,
  });
}

// Remove the query from the URL
async function handleAuth0Redirect() {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) return;

  const query = window.location.search;
  if (query.includes('state=')) {
    try {
      // process the login state
      await auth0.handleRedirectCallback();
    } catch (e) {
      window.alert(e.message || 'authentication error, sorry');
      logout();
    }

    // remove the query parameters
    window.history.replaceState({}, document.title, '/');

    await updateAuthUI();
  }
}

async function checkout() {
  // Get the access token from the Auth0 client
  const token = await auth0.getTokenSilently();

  const el = document.getElementById('login-status');
  const fetchOptions = {
    credentials: 'same-origin',
    method: 'GET',
    // Give access to the bearer of the token.
    headers: { Authorization: 'Bearer ' + token },
  };
  const response = await fetch('/api/checkout', fetchOptions);
  if (!response.ok) {
    // handle the error
    el.textContent = 'Server error:\n' + response.status;
    return;
  }

  // handle the response
  console.log('Checkout successful!');
}

// PRODUCTS //

async function fetchProducts() {
  const response = await fetch('/products');
  if (!response.ok) {
    throw response;
  }
  return response.json();
}


async function renderProducts() {
  const item = document.querySelector('.item');
  if (document.body.contains(item)) {
    // Products already displayed
    return;
  }
  const products = await fetchProducts();
  products.forEach(product => {
    const t1 = document.querySelector('#products');
    const productTemplate = t1.content.cloneNode(true); // Clone necessary?
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    const productDesc = productTemplate.querySelector('#product-desc');
    const basketBtn = productTemplate.querySelector('.btn-atb');
    const basketID = productTemplate.querySelector('.add-to-basket');
    basketID.setAttribute('data-id', product.id);
    basketBtn.addEventListener('click', addToBasket(basketID.getAttribute('data-id'), basketBtn));
    img.src = `${product.imgSrc}`;
    img.alt = `${product.imgSrc}`;
    productName.textContent = `${product.name}`;
    productPrice.textContent = `${(product.price / 100).toFixed(2)}`;
    productDesc.textContent = `${product.description}`;
    document.body.append(productTemplate);
  });
  saveProducts(products);
  console.log('Products saved to storage');
}


function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

function getProductFromStorage(id) {
  const products = JSON.parse(localStorage.getItem('products'));
  return products.find(product => product.id === id);
}

function addToBasket(id, button) {
  const inBasket = basket.find(item => item.id === id);
  if (inBasket) {
    button.innerText = 'In Basket';
    button.disabled = true;
  }
  button.addEventListener('click', event => {
    const basketItem = getProductFromStorage(id);
    event.target.innerText = 'In Basket';
    console.log(event.target);
    event.target.disabled = true;
    console.log(basketItem);
  });
  // console.log('Added to basket, product id:', id);
}


// CART //


const basketBtn = document.querySelector('.cart-btn');
const closeBasketBtn = document.querySelector('.close-cart');
const clearBasketBtn = document.querySelector('.Clear-cart');
const basketDOM = document.querySelector('.cart');
const basketOverlay = document.querySelector('.cart-overlay');
const basketContent = document.querySelector('.cart-content');
const basketItems = document.querySelector('.cart-items');
const basketTotal = document.querySelector('.cart-total');
const products = document.querySelector('#products');

const basket = [];


function setupListeners() {
  document.querySelector('.our-products').addEventListener('click', renderProducts);
  document.querySelector('#btn-login').addEventListener('click', login);
  document.querySelector('#btn-logout').addEventListener('click', logout);
  document.querySelector('.btn-checkout').addEventListener('click', checkout);
}

async function init() {
  await initializeAuth0Client();
  await setupListeners();
  await updateAuthUI();
  await handleAuth0Redirect();
}

window.addEventListener('load', init);
