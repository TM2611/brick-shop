// TODO: Save basket item quantity in local storage

import fetchProducts from './shop.js';
/* global localStorage */

export let basket; // IDs of items in basket


// TODO:
export async function initBasket() {
  basket = JSON.parse(localStorage.getItem('basket'));
  // Add items in basket array to basket
  const products = await fetchProducts(); // necessary?
  const basketQuantity = document.querySelector('.basket-quantity');
  basketQuantity.innerText = 0;
  for (const basketID of basket) {
    const product = products.find(({ id }) => id === basketID);
    const t2 = document.querySelector('#basket-item-template');
    const itemTemplate = t2.content.cloneNode(true); // Why is clone necessary ?
    const basketItem = itemTemplate.querySelector('.basket-item');
    const img = itemTemplate.querySelector('#basket-img');
    const productName = itemTemplate.querySelector('#basket-name');
    const productPrice = itemTemplate.querySelector('#basket-price');
    const basketDOM = document.querySelector('.basket');
    const removeItemBtn = itemTemplate.querySelector('.remove-item');
    const increaseBtn = itemTemplate.querySelector('.fa-chevron-up');
    const decreaseBtn = itemTemplate.querySelector('.fa-chevron-down');
    const itemAmount = itemTemplate.querySelector('.item-amount');
    basketItem.dataset.id = product.id; // Set ID in DOM
    itemAmount.innerText = 1;
    basketQuantity.innerText = parseInt(basketQuantity.innerText) + 1;
    removeItemBtn.innerText = 'Remove';
    img.src = `${product.imgSrc}`;
    img.alt = `${product.imgSrc}`;
    productName.textContent = `${product.name}`;
    productPrice.textContent = `£${(product.price / 100).toFixed(2)}`;
    basketDOM.append(itemTemplate);

    // Setup template listeners
    increaseBtn.addEventListener('click', increaseQuantity);
    decreaseBtn.addEventListener('click', decreaseQuantity);
    removeItemBtn.addEventListener('click', removeBasketItem);
  }
}

function removeBasketItem(e) {
  const itemID = parseInt(e.target.parentNode.parentNode.dataset.id);
  const index = basket.indexOf(itemID);
  const basketQuantity = document.querySelector('.basket-quantity');
  basket.splice(index, 1); // Remove ID from array
  localStorage.setItem('basket', JSON.stringify(basket));
  e.target.parentElement.parentElement.remove(); // Remove item from DOM
  basketQuantity.innerText = parseInt(basketQuantity.innerText) - 1;
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
}

function increaseQuantity(e) {
  const itemAmount = e.target.parentNode.querySelector('.item-amount');
  itemAmount.innerText = parseInt(itemAmount.innerText) + 1;
}

function decreaseQuantity(e) {
  const itemAmount = e.target.parentNode.querySelector('.item-amount');
  if (!(itemAmount.innerText <= 1)) {
    itemAmount.innerText = parseInt(itemAmount.innerText) - 1;
  }
}

export async function AddToBasket(e) {
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
    const removeItemBtn = itemTemplate.querySelector('.remove-item');
    const increaseBtn = itemTemplate.querySelector('.fa-chevron-up');
    const decreaseBtn = itemTemplate.querySelector('.fa-chevron-down');
    const itemAmount = itemTemplate.querySelector('.item-amount');
    basket.push(itemID); // Add ID to basket array
    localStorage.setItem('basket', JSON.stringify(basket));
    basketItem.dataset.id = itemID; // Set ID in DOM
    itemAmount.innerText = 1;
    removeItemBtn.innerText = 'Remove';
    img.src = `${product.imgSrc}`;
    img.alt = `${product.imgSrc}`;
    productName.textContent = `${product.name}`;
    productPrice.textContent = `£${(product.price / 100).toFixed(2)}`;
    basketDOM.append(itemTemplate);

    // Setup template listeners
    increaseBtn.addEventListener('click', increaseQuantity);
    decreaseBtn.addEventListener('click', decreaseQuantity);
    removeItemBtn.addEventListener('click', removeBasketItem);
  }
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
  const basketItems = document.querySelectorAll('.basket-item');
  for (const elem of basketItems) {
    elem.remove();
  }
  basket = [];
  localStorage.removeItem('basket');
  document.querySelector('.basket-quantity').innerText = 0;
  resetAddToBasketBtn();
}
