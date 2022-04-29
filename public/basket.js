   
import * as fjs from './fetch.js';
import * as auth from './auth.js';
import * as main from './main.js';

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
  for (const [itemID, quantity] of basket.entries()) {
    const isItemKit = await main.checkBasketKit(itemID); //Check if current item is a kit
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
    basketQuantityDOM.textContent = basketQuantity + 1;
    removeItemBtn.textContent = 'Remove';
    increaseBtn.addEventListener('click', increaseItemQuantity);
    decreaseBtn.addEventListener('click', decreaseItemQuantity);
    removeItemBtn.addEventListener('click', removeBasketItem);
    itemAmountDOM.textContent = quantity;
    if(!isItemKit){
      const product = products.find(({ ProductID }) => ProductID === itemID); // TODO: URGENT retrieve single product?
      const price = product.Price / 100;
      basketItemDOM.dataset.id = product.ProductID; // Set ID in DOM
      img.src = product.ProductImageSrc;
      img.alt = `${product.ProductName} Image`;
      productName.textContent = product.ProductName;
      productPriceDOM.textContent = price.toFixed(2);
      basketDOM.append(itemTemplate);
      total += price * quantity
    }
    else{
      const kit = await fjs.fetchKit(itemID)
      const kitPrice = await fjs.fetchKitPrice(itemID)
      const price = kitPrice / 100;
      basketItemDOM.dataset.id = itemID // Set ID in DOM
      img.src = kit.KitImgSrc;
      img.alt = `${kit.KitName} Image`;
      productName.textContent = kit.KitName;
      productPriceDOM.textContent = price.toFixed(2);
      basketDOM.append(itemTemplate);
      total += price * quantity
    }
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
  basketTotalDOM.textContent = (basketTotal - (price * itemAmount)).toFixed(2);
  resetAddToBasketBtn(itemID);
}

async function resetAddToBasketBtn(itemID) {
  const isItemKit = await main.checkBasketKit(itemID);
  if(isItemKit){
    resetKitBtn(itemID)
  } else {
    resetBrickBtn(itemID)
    }
}

function resetBrickBtn(itemID){
  const brickATBs = document.querySelectorAll('.add-to-basket');
  // Reset brick atb button with itemID
  for (const atb of brickATBs) {
    if (itemID === atb.dataset.id) {
      const atbBtn = atb.querySelector('.btn');
      atbBtn.innerText = 'Add to Basket'; // Reset 'Add to Basket' button in DOM
      atbBtn.disabled = false;
      break;
    }
  }
}

function resetKitBtn(itemID){
  const kitATBs = document.querySelectorAll('.kit-buy');  
    // Reset kit atb button with itemID
    for (const atbBtn of kitATBs) {
      if (itemID === atbBtn.dataset.id) {
        atbBtn.innerText = 'Add to Basket'; // Reset 'Add to Basket' button in DOM
        atbBtn.disabled = false;
        break;
      }
    }
}

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

export async function addToBasket(e, kit = false) {
  const basketDOM = document.querySelector('.basket');
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
  basketQuantityDOM.textContent = parseInt(basketQuantityDOM.textContent) + 1;
  removeItemBtn.textContent = 'Remove';
  increaseBtn.addEventListener('click', increaseItemQuantity);
  decreaseBtn.addEventListener('click', decreaseItemQuantity);
  removeItemBtn.addEventListener('click', removeBasketItem);
  e.target.textContent = 'In Basket';
  e.target.disabled = true;
  if(kit === false){
    //if brick
    const itemID = e.target.parentNode.dataset.id;
    const products = await fjs.fetchAllSingles();
    const product = products.find(({ ProductID }) => ProductID === itemID);
    basketItemDOM.dataset.id = itemID; // Set ID in DOM
    const price = product.Price / 100;
    productPriceDOM.textContent = price.toFixed(2);
    img.src = `${product.ProductImageSrc}`;
    img.alt = `${product.ProductName} Image`;
    productName.textContent = product.ProductName;
    basket.set(itemID, 1);
    localStorage.basket = JSON.stringify(Array.from(basket));
    itemAmountDOM.textContent = 1;
    basketTotalDOM.textContent = (basketTotal + price).toFixed(2);
    basketDOM.append(itemTemplate);
  }
  else{
    debugger
    const kitID = kit.KitID
    const kitPrice = await fjs.fetchKitPrice(kitID)
    const price = kitPrice / 100;
    productPriceDOM.textContent = price.toFixed(2);
    img.src = `${kit.KitImgSrc}`;
    img.alt = `${kit.KitName} Image`;
    productName.textContent = kit.KitName;
    basketItemDOM.dataset.id = kitID; // Set ID in DOM
    basket.set(kitID, 1);
    localStorage.basket = JSON.stringify(Array.from(basket));
    itemAmountDOM.textContent = 1;
    basketTotalDOM.textContent = (basketTotal + price).toFixed(2);
    basketDOM.append(itemTemplate);
  }

}

export function viewBasket() {
  const basketDOM = document.querySelector('.basket');
  const basketOverlay = document.querySelector('.basket-overlay');
  basketDOM.classList.add('showBasket');
  basketOverlay.classList.add('transparentBcg');
}
// TODO: Close basket when click outside of overlay
export async function closeBasket() {
  const basketDOM = document.querySelector('.basket');
  const basketOverlay = document.querySelector('.basket-overlay');
  basketDOM.classList.remove('showBasket');
  basketOverlay.classList.remove('transparentBcg');
}

export function clearBasket() {
  if(window.location.href.indexOf("checkout.html") === -1){ //if not on checkout page
    const basketTotalDOM = document.querySelector('.basket-total');
    const basketItems = document.querySelectorAll('.basket-item');
    for (const elem of basketItems) {
      const itemID = elem.dataset.id
      elem.remove();
      resetAddToBasketBtn(itemID);
    }
    document.querySelector('.basket-quantity').textContent = 0;
    basketTotalDOM.textContent = (0).toFixed(2);
    }
  basket = new Map();
  localStorage.removeItem('basket');
}
