import * as auth from './auth.js';
import * as ba from './basket.js';

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
export default async function fetchAllSingles() {
  const response = await fetch('/single');
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
  const products = await fetchAllSingles();
  products.forEach(product => {
    const t1 = document.querySelector('#product-template');
    const productTemplate = t1.content.cloneNode(true);
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    const addToBasket = productTemplate.querySelector('.add-to-basket');
    const addToBasketBtn = productTemplate.querySelector('.btn-atb');
    addToBasket.dataset.id = product.ProductID;
    addToBasketBtn.addEventListener('click', ba.AddToBasket);
    addToBasketBtn.innerText = 'Add to Basket';
    if (ba.basket.has(product.ProductID)) {
      addToBasketBtn.innerText = 'In Basket';
      addToBasketBtn.disabled = true;
    }
    img.src = `${product.ProductImage}`;
    img.alt = `${product.ProductImage}`;
    productName.textContent = `${product.ProductName}`;
    productPrice.textContent = `£${(product.Price / 100).toFixed(2)}`;
    document.querySelector('.products-container').append(productTemplate);
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
    addToBasket.dataset.id = product.ProductID;
    addToBasketBtn.addEventListener('click', ba.AddToBasket);
    addToBasketBtn.innerText = 'Add to Basket';
    if (ba.basket.has(product.ProductID)) {
      addToBasketBtn.innerText = 'In Basket';
      addToBasketBtn.disabled = true;
    }
    img.src = `${product.ProductImage}`;
    img.alt = `${product.ProductImage}`;
    productName.textContent = `${product.ProductName}`;
    productPrice.textContent = `£${(product.Price / 100).toFixed(2)}`;
    // productDesc.textContent = `${product.description}`;
    document.querySelector('.products-container').append(productTemplate);
  });
}

async function renderSorted(e) {
  const item = document.querySelector('.item');
  if (document.body.contains(item)) {
    // Products already displayed
    const productsDOM = document.querySelectorAll('.item');
    for (const product of productsDOM) {
      product.remove();
    }
  }
  const products = await fetchSortedProducts(e);
  products.forEach(product => {
    const t1 = document.querySelector('#product-template');
    const productTemplate = t1.content.cloneNode(true);
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    // const productDesc = productTemplate.querySelector('#product-desc');
    const addToBasket = productTemplate.querySelector('.add-to-basket');
    const addToBasketBtn = productTemplate.querySelector('.btn-atb');
    addToBasket.dataset.id = product.ProductID;
    addToBasketBtn.addEventListener('click', ba.AddToBasket);
    addToBasketBtn.innerText = 'Add to Basket';
    if (ba.basket.has(product.ProductID)) {
      addToBasketBtn.innerText = 'In Basket';
      addToBasketBtn.disabled = true;
    }
    img.src = `${product.ProductImage}`;
    img.alt = `${product.ProductImage}`;
    productName.textContent = `${product.ProductName}`;
    productPrice.textContent = `£${(product.Price / 100).toFixed(2)}`;
    // productDesc.textContent = `${product.description}`;
    document.querySelector('.products-container').append(productTemplate);
  });
}


async function fetchFilteredProducts(e) {
  const colour = (e.target.options[e.target.selectedIndex].text).toLowerCase();
  if (colour === 'any') {
    return await fetchAllSingles();
  }
  const response = await fetch('/single/colour/' + colour);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

async function fetchSortedProducts(e) {
  const filter = document.querySelector('#colour-filter');
  const colour = filter.options[filter.selectedIndex].text.toLowerCase();
  const sdd = document.querySelector('#sort');
  const regex = /[)( ]/g ; //Remove any brackets or spaces
  const sort = sdd.options[sdd.selectedIndex].text.replace(regex, '');
  const response = await fetch(`/single/colour/${colour}/${sort}`);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

function setupListeners() {
  document.querySelector('#login-icon').addEventListener('click', showDropdown);
  document.querySelector('.single-bricks').addEventListener('click', renderProducts);
  document.querySelector('#btn-login').addEventListener('click', auth.login);
  document.querySelector('#btn-logout').addEventListener('click', auth.logout);
  document.querySelector('.profile').addEventListener('click', ba.viewProfile);
  document.querySelector('.btn-checkout').addEventListener('click', ba.checkoutPage);
  document.querySelector('.basket-btn').addEventListener('click', ba.viewBasket);
  document.querySelector('.close-basket').addEventListener('click', ba.closeBasket);
  document.querySelector('.clear-basket').addEventListener('click', ba.clearBasket);
  document.querySelector('#colour-filter').addEventListener('change', renderFiltered);
  document.querySelector('#sort').addEventListener('change', renderSorted);
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
