

import fetchProducts from './main.js';
/* global localStorage */

export let basket; // IDs of items in basket


export async function initBasket() {
  const isBasketEmpty = localStorage.getItem('basket') === null;
  if (!isBasketEmpty) {
    basket = JSON.parse(localStorage.getItem('basket'));
    const products = await fetchProducts(); // necessary?
    const basketDOM = document.querySelector('.basket');
    const basketQuantityDOM = document.querySelector('.basket-quantity');
    const t2 = document.querySelector('#basket-item-template');
    const basketTotalDOM = document.querySelector('.basket-total');
    let total = 0;
    basketQuantityDOM.textContent = 0;
    for (const itemID of basket) {
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
      const product = products.find(({ id }) => id === itemID);
      const price = product.price / 100;
      basketItemDOM.dataset.id = product.id; // Set ID in DOM
      basketQuantityDOM.textContent = basketQuantity + 1;
      removeItemBtn.textContent = 'Remove';
      img.src = `${product.imgSrc}`;
      img.alt = `${product.imgSrc}`;
      productName.textContent = product.name;
      productPriceDOM.textContent = price.toFixed(2);
      increaseBtn.addEventListener('click', increaseQuantity);
      decreaseBtn.addEventListener('click', decreaseQuantity);
      removeItemBtn.addEventListener('click', removeBasketItem);
      // TODO: Save basket item quantity in local storage
      itemAmountDOM.textContent = 1; // = item quantinty from storage
      basketDOM.append(itemTemplate);
      total += price;
    }
    basketTotalDOM.textContent = total.toFixed(2);
    return;
  }
  basket = [];
}


function removeBasketItem(e) {
  const basketItemDOM = e.target.parentNode.parentNode;
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketTotal = parseFloat(basketTotalDOM.textContent);
  const productPriceDOM = e.target.parentNode.querySelector('#basket-product-price');
  const price = parseFloat(productPriceDOM.textContent);
  const itemAmountDOM = basketItemDOM.querySelector('.item-amount');
  const itemAmount = parseInt(itemAmountDOM.textContent);
  const itemID = parseInt(basketItemDOM.dataset.id);
  const index = basket.indexOf(itemID);
  const basketQuantityDOM = document.querySelector('.basket-quantity');
  const basketQuantity = parseInt(basketQuantityDOM.textContent);
  basket.splice(index, 1); // Remove ID from array
  localStorage.setItem('basket', JSON.stringify(basket));
  basketItemDOM.remove(); // Remove item from DOM
  basketQuantityDOM.textContent = basketQuantity - 1;
  // TODO: bug: removing 3 red bricks (60p) causes negative sign in total
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
  } else { // Reset button with specified ID
    for (const atb of addToBasketList) {
      if (itemID === parseInt(atb.dataset.id)) {
        const atbBtn = atb.querySelector('.btn');
        atbBtn.innerText = 'Add to Basket'; // Reset 'Add to Basket' button in DOM
        atbBtn.disabled = false;
        break;
      }
    }
  }
  // updateTotalPrice()
}

function increaseQuantity(e) {
  const itemAmountDOM = e.target.parentNode.querySelector('.item-amount');
  const itemAmount = parseInt(itemAmountDOM.innerText);
  const productPriceDOM = e.target.parentNode.parentNode.querySelector('#basket-product-price');
  const price = parseFloat(productPriceDOM.textContent);
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketTotal = parseFloat(basketTotalDOM.textContent);
  itemAmountDOM.textContent = itemAmount + 1;
  basketTotalDOM.textContent = (basketTotal + price).toFixed(2);
}

function decreaseQuantity(e) {
  const itemAmountDOM = e.target.parentNode.querySelector('.item-amount');
  const itemAmount = parseInt(itemAmountDOM.innerText);
  const productPriceDOM = e.target.parentNode.parentNode.querySelector('#basket-product-price');
  const price = parseFloat(productPriceDOM.textContent);
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketTotal = parseFloat(basketTotalDOM.textContent);
  if (!(itemAmountDOM.textContent <= 1)) {
    itemAmountDOM.textContent = itemAmount - 1;
    basketTotalDOM.textContent = (basketTotal - price).toFixed(2);
  }
}

export async function AddToBasket(e) {
  const itemID = parseInt(e.target.parentNode.dataset.id);
  const products = await fetchProducts(); // necessary?
  const basketDOM = document.querySelector('.basket');
  const product = products.find(({ id }) => id === itemID);
  const t2 = document.querySelector('#basket-item-template');
  const itemTemplate = t2.content.cloneNode(true); // Why is clone necessary ?
  const basketItemDOM = itemTemplate.querySelector('.basket-item');
  const img = itemTemplate.querySelector('#basket-product-img');
  const productName = itemTemplate.querySelector('#basket-product-name');
  const productPriceDOM = itemTemplate.querySelector('#basket-product-price');
  const removeItemBtn = itemTemplate.querySelector('.remove-item');
  const increaseBtn = itemTemplate.querySelector('.fa-chevron-up');
  const decreaseBtn = itemTemplate.querySelector('.fa-chevron-down');
  const itemAmount = itemTemplate.querySelector('.item-amount');
  const basketQuantity = document.querySelector('.basket-quantity');
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketTotal = parseFloat(basketTotalDOM.textContent);
  const price = product.price / 100;
  basketQuantity.textContent = parseInt(basketQuantity.textContent) + 1;
  basketItemDOM.dataset.id = itemID; // Set ID in DOM
  removeItemBtn.textContent = 'Remove';
  img.src = `${product.imgSrc}`;
  img.alt = `${product.imgSrc}`;
  productName.textContent = product.name;
  productPriceDOM.textContent = price.toFixed(2);
  increaseBtn.addEventListener('click', increaseQuantity);
  decreaseBtn.addEventListener('click', decreaseQuantity);
  removeItemBtn.addEventListener('click', removeBasketItem);
  basket.push(itemID); // Add ID to basket array
  localStorage.setItem('basket', JSON.stringify(basket));
  itemAmount.textContent = 1;
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

export function closeBasket() {
  const basket = document.querySelector('.basket');
  const basketOverlay = document.querySelector('.basket-overlay');
  basket.classList.remove('showBasket');
  basketOverlay.classList.remove('transparentBcg');
}

export function clearBasket() {
  const basketTotalDOM = document.querySelector('.basket-total');
  const basketItems = document.querySelectorAll('.basket-item');
  for (const elem of basketItems) {
    elem.remove();
  }
  basket = [];
  localStorage.removeItem('basket');
  document.querySelector('.basket-quantity').textContent = 0;
  basketTotalDOM.textContent = (0).toFixed(2);
  resetAddToBasketBtn();
}
