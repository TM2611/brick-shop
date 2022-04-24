import * as fjs from './fetch.js';
import * as auth from './auth.js';

// TODO: have to clear localstorage after changing code? normal?
export let basket; // IDs and quantities of items in basket

export async function initBasket() {
  const isBasketStorageEmpty = localStorage.getItem('basket') === null;
  if (isBasketStorageEmpty) {
    basket = new Map();
    return;
  }
  const isBasketDOMEmpty = document.querySelectorAll('.basket-item').length === 0
  // isBasketDOMEmpty.length potentially > 0 if returning from checkout page
  if (!isBasketDOMEmpty){
    return;
  }
  basket = new Map(JSON.parse(localStorage.basket));
  if(window.location.href.indexOf("checkout") != -1){ //if on checkout page
    return;
  }
  const products = await fjs.fetchAllSingles();
  const basketDOM = document.querySelector('.basket');
  const basketQuantityDOM = document.querySelector('.basket-quantity');
  const t2 = document.querySelector('#basket-item-template');
  const basketTotalDOM = document.querySelector('.basket-total');
  let total = 0;
  basketQuantityDOM.textContent = 0;
  for (const [item, quantity] of basket.entries()) {
    const basketQuantity = parseInt(basketQuantityDOM.textContent);
    const itemTemplate = t2.content.cloneNode(true);
    const basketItemDOM = itemTemplate.querySelector('.basket-item');
    const img = itemTemplate.querySelector('#basket-product-img');
    const productName = itemTemplate.querySelector('#basket-product-name');
    const productPriceDOM = itemTemplate.querySelector('#basket-product-price');
    const removeItemBtn = itemTemplate.querySelector('.remove-item');
    const increaseBtn = itemTemplate.querySelector('.fa-chevron-up');
    const decreaseBtn = itemTemplate.querySelector('.fa-chevron-down');
    const itemAmountDOM = itemTemplate.querySelector('.item-amount');
    const product = products.find(({ ProductID }) => ProductID === item); // TODO: retrieve single product?
    const price = product.Price / 100;
    basketItemDOM.dataset.id = product.ProductID; // Set ID in DOM
    basketQuantityDOM.textContent = basketQuantity + 1;
    removeItemBtn.textContent = 'Remove';
    img.src = product.ProductImage;
    img.alt = `${product.ProductName} Image`;
    productName.textContent = product.ProductName;
    productPriceDOM.textContent = price.toFixed(2);
    increaseBtn.addEventListener('click', increaseItemQuantity);
    decreaseBtn.addEventListener('click', decreaseItemQuantity);
    removeItemBtn.addEventListener('click', removeBasketItem);
    itemAmountDOM.textContent = quantity; // = item quantinty from storage
    basketDOM.append(itemTemplate);
    total += price * quantity
  }
  basketTotalDOM.textContent = total.toFixed(2);
}

function removeBasketItem(e) {
  const basketItemDOM = e.target.parentNode.parentNode;
  const productPriceDOM = e.target.parentNode.querySelector('#basket-product-price');
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketTotal = parseFloat(basketTotalDOM.textContent);
  const price = parseFloat(productPriceDOM.textContent);
  const itemAmountDOM = basketItemDOM.querySelector('.item-amount');
  const itemAmount = parseInt(itemAmountDOM.textContent);
  const itemID = basketItemDOM.dataset.id;
  const basketQuantityDOM = document.querySelector('.basket-quantity');
  const basketQuantity = parseInt(basketQuantityDOM.textContent);
  basket.delete(itemID);
  localStorage.basket = JSON.stringify(Array.from(basket));
  basketItemDOM.remove(); // Remove item from DOM
  basketQuantityDOM.textContent = basketQuantity - 1;
  // TODO: bug: removing 3 1x2 bricks (60p) causes negative sign in total
  basketTotalDOM.textContent = (basketTotal - (price * itemAmount)).toFixed(2);
  resetAddToBasketBtn(itemID);
}

function resetAddToBasketBtn(itemID = 'n/a') {
  const addToBasketList = document.querySelectorAll('.add-to-basket');
  if (itemID === 'n/a') { // Reset all atb buttons
    for (const atb of addToBasketList) {
      const atbBtn = atb.querySelector('.btn');
      atbBtn.innerText = 'Add to Basket';
      atbBtn.disabled = false;
    }
  } else { // Reset button with ID passed as an argument
    for (const atb of addToBasketList) {
      if (itemID === atb.dataset.id) {
        const atbBtn = atb.querySelector('.btn');
        atbBtn.innerText = 'Add to Basket'; // Reset 'Add to Basket' button in DOM
        atbBtn.disabled = false;
        break;
      }
    }
  }
}

//TODO: If on checkout page, update quantity on the page
function increaseItemQuantity(e) {
  const itemID = e.target.parentElement.parentElement.dataset.id;
  let itemAmount = basket.get(itemID);
  const itemAmountDOM = e.target.parentNode.querySelector('.item-amount');
  const productPriceDOM = e.target.parentNode.parentNode.querySelector('#basket-product-price');
  const price = parseFloat(productPriceDOM.textContent);
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketTotal = parseFloat(basketTotalDOM.textContent);
  itemAmount += 1;
  basket.set(itemID, itemAmount);
  localStorage.basket = JSON.stringify(Array.from(basket));
  itemAmountDOM.textContent = itemAmount;
  basketTotalDOM.textContent = (basketTotal + price).toFixed(2);
}

function decreaseItemQuantity(e) {
  const itemID = e.target.parentElement.parentElement.dataset.id;
  let itemAmount = basket.get(itemID);
  const itemAmountDOM = e.target.parentNode.querySelector('.item-amount');
  const productPriceDOM = e.target.parentNode.parentNode.querySelector('#basket-product-price');
  const price = parseFloat(productPriceDOM.textContent);
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketTotal = parseFloat(basketTotalDOM.textContent);
  if (!(itemAmountDOM.textContent <= 1)) {
    itemAmount -= 1;
    basket.set(itemID, itemAmount);
    localStorage.basket = JSON.stringify(Array.from(basket));
    itemAmountDOM.textContent = itemAmount;
    basketTotalDOM.textContent = (basketTotal - price).toFixed(2);
  }
}


export async function AddToBasket(e) {
  const itemID = e.target.parentNode.dataset.id;
  const products = await fjs.fetchAllSingles(); // TODO: fetch single product? (or retrieve from storage / DB ?)
  const basketDOM = document.querySelector('.basket');
  const product = products.find(({ ProductID }) => ProductID === itemID);
  const t2 = document.querySelector('#basket-item-template');
  const itemTemplate = t2.content.cloneNode(true);
  const basketItemDOM = itemTemplate.querySelector('.basket-item');
  const img = itemTemplate.querySelector('#basket-product-img');
  const productName = itemTemplate.querySelector('#basket-product-name');
  const productPriceDOM = itemTemplate.querySelector('#basket-product-price');
  const removeItemBtn = itemTemplate.querySelector('.remove-item');
  const increaseBtn = itemTemplate.querySelector('.fa-chevron-up');
  const decreaseBtn = itemTemplate.querySelector('.fa-chevron-down');
  const itemAmountDOM = itemTemplate.querySelector('.item-amount');
  const basketQuantityDOM = document.querySelector('.basket-quantity');
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketTotal = parseFloat(basketTotalDOM.textContent);
  const price = product.Price / 100;
  basketQuantityDOM.textContent = parseInt(basketQuantityDOM.textContent) + 1;
  basketItemDOM.dataset.id = itemID; // Set ID in DOM
  removeItemBtn.textContent = 'Remove';
  img.src = `${product.ProductImage}`;
  img.alt = `${product.ProductName} Image`;
  productName.textContent = product.ProductName;
  productPriceDOM.textContent = price.toFixed(2);
  increaseBtn.addEventListener('click', increaseItemQuantity);
  decreaseBtn.addEventListener('click', decreaseItemQuantity);
  removeItemBtn.addEventListener('click', removeBasketItem);
  basket.set(itemID, 1);
  localStorage.basket = JSON.stringify(Array.from(basket));
  itemAmountDOM.textContent = 1;
  e.target.textContent = 'In Basket';
  e.target.disabled = true;
  basketTotalDOM.textContent = (basketTotal + price).toFixed(2);
  basketDOM.append(itemTemplate);
}


export function viewBasket() {
  const basketDOM = document.querySelector('.basket');
  const basketOverlay = document.querySelector('.basket-overlay');
  basketDOM.classList.add('showBasket');
  basketOverlay.classList.add('transparentBcg');
}
// TODO: Close basket when click outside of overlay
// TODO: closeBasket on checkoutpage resets basket total
export async function closeBasket() {
  if(window.location.href.indexOf("checkout") != -1){ //if on checkout page
    for (const item of document.querySelectorAll('.checkout-item')) {
      item.remove();
    }
    window.location.reload() //Reload checkout page to re-render items 
    // TODO: find alternative to reloading page?
  } 

  const basketDOM = document.querySelector('.basket');
  const basketOverlay = document.querySelector('.basket-overlay');
  basketDOM.classList.remove('showBasket');
  basketOverlay.classList.remove('transparentBcg');
}

export function clearBasket() {
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketItems = document.querySelectorAll('.basket-item');
  for (const elem of basketItems) {
    elem.remove();
  }
  basket = new Map();
  localStorage.removeItem('basket');
  document.querySelector('.basket-quantity').textContent = 0;
  basketTotalDOM.textContent = (0).toFixed(2);
  resetAddToBasketBtn();
}


