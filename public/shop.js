import * as auth from './auth.js';
import * as ba from './basket.js';

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
export default async function fetchProducts() {
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
    const t1 = document.querySelector('#product-template');
    const productTemplate = t1.content.cloneNode(true); // Clone necessary?
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    const productDesc = productTemplate.querySelector('#product-desc');
    const addToBasket = productTemplate.querySelector('.add-to-basket');
    const addToBasketBtn = productTemplate.querySelector('.btn-atb');
    addToBasket.dataset.id = product.id;
    addToBasketBtn.addEventListener('click', ba.AddToBasket);
    img.src = `${product.imgSrc}`;
    img.alt = `${product.imgSrc}`;
    productName.textContent = `${product.name}`;
    productPrice.textContent = `£${(product.price / 100).toFixed(2)}`;
    productDesc.textContent = `${product.description}`;
    document.body.append(productTemplate);
  });
  // saveProducts(products);
  // console.log('Products saved to storage');
}


// function saveProducts(products) {
//   localStorage.setItem('products', JSON.stringify(products));
// }

// function getProductFromStorage(id) {
//   const products = JSON.parse(localStorage.getItem('products'));
//   return products.find(product => product.id === id); // Find product with id equivalent to parameter
// }


function setupListeners() {
  // document.querySelector('.our-products').addEventListener('click', renderProducts);
  document.querySelector('#btn-login').addEventListener('click', auth.login);
  document.querySelector('#btn-logout').addEventListener('click', auth.logout);
  document.querySelector('.btn-checkout').addEventListener('click', checkout);
  document.querySelector('.basket-btn').addEventListener('click', ba.viewBasket);
  document.querySelector('.close-basket').addEventListener('click', ba.closeBasket);
  document.querySelector('.clear-basket').addEventListener('click', ba.clearBasket);
}

async function init() {
  renderProducts();
  await auth.initializeAuth0Client();
  await setupListeners();
  await auth.updateAuthUI();
  await auth.handleAuth0Redirect();
}

window.addEventListener('load', init);
