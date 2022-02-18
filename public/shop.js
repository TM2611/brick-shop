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
    const t1 = document.querySelector('#product-template');
    const productTemplate = t1.content.cloneNode(true); // Clone necessary?
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    const productDesc = productTemplate.querySelector('#product-desc');
    const addToBasket = productTemplate.querySelector('.add-to-basket');
    const addToBasketBtn = productTemplate.querySelector('.btn-atb');
    addToBasket.dataset.id = product.id;
    addToBasketBtn.addEventListener('click', AddToBasket);
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


// BASKET //

const basket = []; // IDs of items in basket

// const basketBtn = document.querySelector('.basket-btn');
// const closeBasketBtn = document.querySelector('.close-basket');
// const clearBasketBtn = document.querySelector('.Clear-basket');
// const basketOverlay = document.querySelector('.basket-overlay');
// const basketContent = document.querySelector('.basket-content');
// const basketItems = document.querySelector('.basket-items');
// const basketTotal = document.querySelector('.basket-total');
// const products = document.querySelector('#products');

// const basketQuantity = document.querySelector('.basket-quantity');
// const basketDOM = document.querySelector('.basket');
// ^Functions sometimes failed to find global ?

async function AddToBasket(e) {
  const products = await fetchProducts(); // necessary?
  const itemID = parseInt(e.target.parentNode.dataset.id);
  const inBasket = basket.includes(itemID);
  const basketQuantity = document.querySelector('.basket-quantity');
  basketQuantity.innerText = parseInt(basketQuantity.innerText) + 1;
  e.target.innerText = 'In Basket';
  e.target.disabled = true;
  if (!inBasket) {
    const product = products.find(({ id }) => id === itemID);
    const t2 = document.querySelector('#basket-item-template');
    const itemTemplate = t2.content.cloneNode(true); // Why is clone necessary ?
    const basketItem = itemTemplate.querySelector('.basket-item');
    const img = itemTemplate.querySelector('#basket-img');
    const productName = itemTemplate.querySelector('#basket-name');
    const productPrice = itemTemplate.querySelector('#basket-price');
    const basketDOM = document.querySelector('.basket');
    const removeItem = itemTemplate.querySelector('.remove-item');
    basket.push(itemID); // Add ID to basket array
    basketItem.dataset.id = itemID; // Set ID in DOM
    removeItem.innerText = 'Remove';
    removeItem.addEventListener('click', removeBasketItem);
    img.src = `${product.imgSrc}`;
    img.alt = `${product.imgSrc}`;
    productName.textContent = `${product.name}`;
    productPrice.textContent = `£${(product.price / 100).toFixed(2)}`;
    basketDOM.append(itemTemplate);
  }
}

function viewBasket() {
  const basketDOM = document.querySelector('.basket');
  const basketOverlay = document.querySelector('.basket-overlay');
  basketDOM.classList.add('showBasket');
  basketOverlay.classList.add('transparentBcg');
}

function closeBasket() {
  const basket = document.querySelector('.basket');
  const basketOverlay = document.querySelector('.basket-overlay');
  basket.classList.remove('showBasket');
  basketOverlay.classList.remove('transparentBcg');
}

function removeBasketItem(e) {
  const itemID = parseInt(e.target.parentNode.parentNode.dataset.id);
  const index = basket.indexOf(itemID);
  const basketQuantity = document.querySelector('.basket-quantity');
  basket.splice(index, 1); // Remove ID from array
  e.target.parentElement.parentElement.remove(); // Remove item from DOM
  basketQuantity.innerText = parseInt(basketQuantity.innerText) - 1;
  // Find ATB button of product with an id === itemID
  const addToBasketList = document.querySelectorAll('.add-to-basket');
  for (const atb of addToBasketList) {
    if (itemID === parseInt(atb.dataset.id)) {
      const atbBtn = atb.querySelector('.btn');
      atbBtn.innerText = 'Add to Basket'; // Reset 'Add to Basket' button
      atbBtn.disabled = false;
      break;
    }
  }
}

function setupListeners() {
  // document.querySelector('.our-products').addEventListener('click', renderProducts);
  document.querySelector('#btn-login').addEventListener('click', login);
  document.querySelector('#btn-logout').addEventListener('click', logout);
  document.querySelector('.btn-checkout').addEventListener('click', checkout);
  document.querySelector('.basket-btn').addEventListener('click', viewBasket);
  document.querySelector('.close-basket').addEventListener('click', closeBasket);
}

async function init() {
  renderProducts();
  await initializeAuth0Client();
  await setupListeners();
  await updateAuthUI();
  await handleAuth0Redirect();
}

window.addEventListener('load', init);
