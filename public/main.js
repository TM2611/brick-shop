/* eslint-disable no-undef */ // not recgonising fetch?
import * as auth from './auth.js';
import * as ba from './basket.js';

// import * as fil from '../server/filter.js';
let prevScrollpos;
// NAVBAR
function showDropdown(e) {
  if (e.target.closest('.icon-options')) {
    // we are inside the menu, ignore the click
    return;
  }
  document.querySelector('.icon-options').classList.add('display');
}

function closeDropdown(e) {
  // Hide dropdown if user clicks outside of dropdown or login icon
  const initial = document.querySelector('#initial');
  const icon = document.querySelector('#login-icon');
  if (!(e.target.closest('.icon-options')) && ((e.target !== icon) && (e.target !== initial))) {
    document.querySelector('.icon-options').classList.remove('display');
  }
}

function navbarDisplay() {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector('.navbar');
  if (prevScrollpos > currentScrollPos) {
    navbar.classList.remove('hide-nav');
  } else {
    navbar.classList.add('hide-nav');
  }
  prevScrollpos = currentScrollPos;
}

// PRODUCTS //
export default async function fetchAllProducts() {
  const response = await fetch('/products');
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

//TODO: change append body

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
  // TODO: bug - toggleDropdown triggered when dropdown option clicked
  document.querySelector('#login-icon').addEventListener('click', showDropdown);
  document.querySelector('.single-bricks').addEventListener('click', renderProducts);
  document.querySelector('#btn-login').addEventListener('click', auth.login);
  document.querySelector('#btn-logout').addEventListener('click', auth.logout);
  // document.querySelector('.btn-checkout').addEventListener('click', ba.checkout);
  document.querySelector('.btn-checkout').addEventListener('click', ba.checkoutPage);

  document.querySelector('.basket-btn').addEventListener('click', ba.viewBasket);
  document.querySelector('.close-basket').addEventListener('click', ba.closeBasket);
  document.querySelector('.clear-basket').addEventListener('click', ba.clearBasket);
  document.querySelector('#select').addEventListener('change', renderFiltered);
  window.addEventListener('scroll', navbarDisplay);
  window.addEventListener('click', closeDropdown);
}


async function init() {
  await auth.initializeAuth0Client();
  await auth.updateAuthUI();
  await auth.handleAuth0Redirect();
  await ba.initBasket();
  setupListeners();
}

window.addEventListener('load', init);
