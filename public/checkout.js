import * as main from './main.js';
import * as auth from './auth.js';
import * as ba from './basket.js';
import * as fjs from './fetch.js';



async function renderBasket(){
  const isBasketEmpty = localStorage.getItem('basket') === null;
  if (isBasketEmpty) {
    const emptyBasketMsg = document.querySelector('#empty-checkout-msg');
    const continueShopping = document.querySelector('#continue-shopping');
    emptyBasketMsg.textContent = 'Your basket is Empty'
    continueShopping.innerHTML = 'Click here to <a href="./index.html">continue shopping</a>'
    return;
  }
  const container = document.querySelector('.checkout-page-container');
  const products = await fjs.fetchAllSingles();
  for (const [itemID, quantity] of ba.basket.entries()) {
    const product = products.find(({ ProductID }) => ProductID === itemID);
    const t1 = document.querySelector('#checkout-item-template');
    const itemTemplate = t1.content.cloneNode(true);
    const img = itemTemplate.querySelector('#checkout-item-img');
    const itemName = itemTemplate.querySelector('#checkout-item-name');
    const itemPrice = itemTemplate.querySelector('#checkout-item-price');
    const itemQuantity = itemTemplate.querySelector('#checkout-item-quantity');
    const removeItemBtn = itemTemplate.querySelector('#checkout-remove-item');
    const checkoutItemDom = itemTemplate.querySelector('.checkout-item');
    checkoutItemDom.dataset.id = product.ProductID;
    itemName.textContent = product.ProductName;
    itemQuantity.textContent = quantity;
    img.src = product.ProductImage;
    img.alt = product.ProductImage;
    itemName.textContent = product.ProductName;
    itemPrice.textContent = (product.Price / 100).toFixed(2);
    removeItemBtn.addEventListener('click', removeCheckoutItem)
    container.append(itemTemplate);
  }
  // Dynamically Add Buy Now Button
  // Dynamically Add Continue shopping Button
}

function removeCheckoutItem(e){
  const checkoutItemDOM = e.target.parentNode.parentNode;
  const itemID = checkoutItemDOM.dataset.id
  debugger

}

function setupListeners() {
  document.querySelector('#btn-login').addEventListener('click', auth.login);
  document.querySelector('#btn-logout').addEventListener('click', auth.logout);
  document.querySelector('.profile').addEventListener('click', ba.viewProfile);
  document.querySelector('.btn-checkout').addEventListener('click', ba.checkoutPage);
  document.querySelector('.basket-btn').addEventListener('click', ba.viewBasket);
  document.querySelector('.close-basket').addEventListener('click', ba.closeBasket);
  document.querySelector('.clear-basket').addEventListener('click', ba.clearBasket);
  document.querySelector('#login-icon').addEventListener('click', main.showDropdown);
  window.addEventListener('scroll', main.navbarDisplay);
  window.addEventListener('click', main.closeDropdown);
}


async function init() {
  await auth.initializeAuth0Client();
  await auth.updateAuthUI();
  await auth.handleAuth0Redirect();
  await ba.initBasket();
  await renderBasket();
  setupListeners();
}

window.addEventListener('load', init);