import * as main from './main.js';
// import * as auth from './auth.js';
import * as ba from './basket.js';
import * as fjs from './fetch.js';


async function renderCheckoutPage(){
  const isBasketEmpty = localStorage.getItem('basket') === null;
  if (isBasketEmpty) {
    debugger
    document.querySelector('.empty-continue-btn').addEventListener("click", 
    main.homePage);    
    return;
  }
  const emptyCheckout = document.querySelector('.empty-checkout');
  const checkoutSections = document.querySelector('.checkout-sections-container');
  emptyCheckout.classList.add('no-display')
  checkoutSections.classList.remove('hide')
  await renderReviewSection()
  // TODO: renderAddressSection()
  // TODO: renderPaymentMethodSection() ?
  // const buyNowBtn = document.querySelector('#buy-btn') 
}

async function renderReviewSection(){
  document.querySelector('.box-title-basket').textContent = 'Basket';
  document.querySelector('.box-title-items').textContent = `${calculateItemNumber()} items`;
  await renderReviewItems()

}

function calculateItemNumber(){
  let totalQuantity = 0
  for (const [_, quantity] of ba.basket.entries()) {
    totalQuantity += quantity
  }
  return totalQuantity
}

async function renderReviewItems(){
  const itemsContainer = document.querySelector('.checkout-items-container');
  let total = 0;
  const products = await fjs.fetchAllSingles();
  for (const [itemID, quantity] of ba.basket.entries()) {
    const product = products.find(({ ProductID }) => ProductID === itemID);
    const t1 = document.querySelector('#checkout-item-template');
    const itemTemplate = t1.content.cloneNode(true);
    const img = itemTemplate.querySelector('#checkout-item-img');
    const itemName = itemTemplate.querySelector('#checkout-item-name');
    const itemPriceDOM = itemTemplate.querySelector('#checkout-item-price');
    const checkoutItemDom = itemTemplate.querySelector('.checkout-item');
    const price = product.Price / 100;
    let itemQuantityDOM = itemTemplate.querySelector('.checkout-item-quantity');
    checkoutItemDom.dataset.id = product.ProductID;
    itemName.textContent = product.ProductName;
    img.src = product.ProductImage;
    img.alt = product.ProductImage;
    itemName.textContent = product.ProductName;
    itemPriceDOM.textContent = `£${(price).toFixed(2)}`;
    itemQuantityDOM.textContent = `${quantity} x`
    total += price * quantity
    itemsContainer.append(itemTemplate);
  }
  renderOrderTotal(total)
}


function renderOrderTotal(total){
  let preTotalDOM =  document.querySelector('#review-box-pre-total')
  let totalDOM = document.querySelector('.review-box-total-value')
  preTotalDOM.textContent = 'Order Total : £'
  totalDOM.textContent = total.toFixed(2);
}


async function submitOrder(){
  const basket = JSON.stringify(Array.from(ba.basket));
  const userID = 'placeholderID'

  const orderFetchOptions = {
    credentials: 'same-origin',
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
  };
  const response = await fetch(`/checkout/submit/${userID}/${basket}`, orderFetchOptions)
}


function setupListeners() {
  document.querySelector('.buy-btn').addEventListener('click', submitOrder)
}


async function init() {
  // await auth.initializeAuth0Client();
  // await auth.updateAuthUI();
  // await auth.handleAuth0Redirect();
  await ba.initBasket();
  await renderCheckoutPage();
  setupListeners();
}

window.addEventListener('load', init);