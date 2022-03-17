import * as auth from './auth.js';
import * as ba from './basket.js';
// import * as fil from '../server/filter.js';

/* eslint-disable no-undef */ // not recgonising fetch?
async function checkout() {
  // Get the access token from the Auth0 client
  const token = await auth.auth0.getTokenSilently();

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
export default async function fetchAllProducts() {
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
  const products = await fetchAllProducts();
  products.forEach(product => {
    const t1 = document.querySelector('#product-template');
    const productTemplate = t1.content.cloneNode(true); // Clone necessary?
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    // const productDesc = productTemplate.querySelector('#product-desc');
    const addToBasket = productTemplate.querySelector('.add-to-basket');
    const addToBasketBtn = productTemplate.querySelector('.btn-atb');
    addToBasket.dataset.id = product.id;
    addToBasketBtn.addEventListener('click', ba.AddToBasket);
    addToBasketBtn.innerText = 'Add to Basket';
    if (ba.basket.includes(product.id)) {
      addToBasketBtn.innerText = 'In Basket';
      addToBasketBtn.disabled = true;
    }
    img.src = `${product.imgSrc}`;
    img.alt = `${product.imgSrc}`;
    productName.textContent = `${product.name}`;
    productPrice.textContent = `£${(product.price / 100).toFixed(2)}`;
    // productDesc.textContent = `${product.description}`;
    document.body.append(productTemplate);
  });
}

async function renderFiltered(e) {
  const item = document.querySelector('.item');
  if (document.body.contains(item)) {
    // Products already displayed
    const productsDOM = document.querySelectorAll('.item');
    for (const product of productsDOM) {
      product.remove();
    }
  }
  const products = await fetchFilteredProducts(e);
  products.forEach(product => {
    const t1 = document.querySelector('#product-template');
    const productTemplate = t1.content.cloneNode(true);
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    // const productDesc = productTemplate.querySelector('#product-desc');
    const addToBasket = productTemplate.querySelector('.add-to-basket');
    const addToBasketBtn = productTemplate.querySelector('.btn-atb');
    addToBasket.dataset.id = product.id;
    addToBasketBtn.addEventListener('click', ba.AddToBasket);
    addToBasketBtn.innerText = 'Add to Basket';
    if (ba.basket.includes(product.id)) {
      addToBasketBtn.innerText = 'In Basket';
      addToBasketBtn.disabled = true;
    }
    img.src = `${product.imgSrc}`;
    img.alt = `${product.imgSrc}`;
    productName.textContent = `${product.name}`;
    productPrice.textContent = `£${(product.price / 100).toFixed(2)}`;
    // productDesc.textContent = `${product.description}`;
    document.body.append(productTemplate);
  });
}

async function fetchFilteredProducts(e) {
  const colour = (e.target.options[e.target.selectedIndex].text).toLowerCase();
  if (colour === 'any') {
    return await fetchAllProducts();
  }
  const response = await fetch('/products/single/' + colour);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

function setupListeners() {
  document.querySelector('.our-products').addEventListener('click', renderProducts);
  document.querySelector('#btn-login').addEventListener('click', auth.login);
  document.querySelector('#btn-logout').addEventListener('click', auth.logout);
  document.querySelector('.btn-checkout').addEventListener('click', checkout);
  document.querySelector('.basket-btn').addEventListener('click', ba.viewBasket);
  document.querySelector('.close-basket').addEventListener('click', ba.closeBasket);
  document.querySelector('.clear-basket').addEventListener('click', ba.clearBasket);
  document.querySelector('#select').addEventListener('change', renderFiltered);
}


async function init() {
  await auth.initializeAuth0Client();
  await auth.updateAuthUI();
  await auth.handleAuth0Redirect();
  await ba.initBasket();
  setupListeners();
}

window.addEventListener('load', init);
