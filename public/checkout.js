// import * as auth from './auth.js';
import * as ba from './basket.js';
import * as fjs from './fetch.js';
import * as main from './main.js';
import * as auth from './auth.js';



async function renderCheckoutPage(){
  const isBasketEmpty = localStorage.getItem('basket') === null;
  if (isBasketEmpty) {
    document.querySelector('.empty-continue-btn').addEventListener("click", 
    homePage);    
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
    const t1 = document.querySelector('#checkout-item-template');
    const itemTemplate = t1.content.cloneNode(true);
    const img = itemTemplate.querySelector('#checkout-item-img');
    const itemName = itemTemplate.querySelector('#checkout-item-name');
    const itemPriceDOM = itemTemplate.querySelector('#checkout-item-price');
    const checkoutItemDom = itemTemplate.querySelector('.checkout-item');
    let itemQuantityDOM = itemTemplate.querySelector('.checkout-item-quantity');
    const isItemKit = await main.checkBasketKit(itemID);
    if(isItemKit){
      const kit = await fjs.fetchKit(itemID)
      const kitPrice = await fjs.fetchKitPrice(itemID)
      const price = kitPrice / 100;
      checkoutItemDom.dataset.id = itemID // Set ID in DOM
      img.src = kit.KitImgSrc;
      img.alt = `${kit.KitName} Image`;
      itemName.textContent = kit.KitName;
      itemPriceDOM.textContent = `£${(price).toFixed(2)}`;
      itemQuantityDOM.textContent = `${quantity} x`
      total += price * quantity
      itemsContainer.append(itemTemplate);
    } else{
      const product = products.find(({ ProductID }) => ProductID === itemID);
      const price = product.Price / 100;
      checkoutItemDom.dataset.id = product.ProductID;
      itemName.textContent = product.ProductName;
      img.src = product.ProductImageSrc;
      img.alt = `${product.ProductName} Image`;
      itemName.textContent = product.ProductName;
      itemPriceDOM.textContent = `£${(price).toFixed(2)}`;
      itemQuantityDOM.textContent = `${quantity} x`
      total += price * quantity
      itemsContainer.append(itemTemplate);
    }
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
  const profile = await main.getProfile();
  const namedAccount = hasGivenName(profile)
  debugger
  const strProfile = JSON.stringify(profile);
  const userID = profile.sub
  let orderID;
  const fetchOptions = {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  };
  const accountType = await checkAccountType()
  const customerRes = await fetch(`/create/customer/${accountType}/${strProfile}`, fetchOptions)
  if (customerRes.ok){
    const orderRes = await fetch(`/checkout/submit/${userID}/${basket}`, fetchOptions)
    if (orderRes.ok){
       orderID = await response.json();   
       console.log("orderID:", orderID);
    }
  }
  else{
    throw new Error(customerRes)
  }


  //clear basket
  ba.clearBasket()
  main.confirmPage()
}

function hasGivenName(profile){
  return profile.given_name !== undefined
  //google-oauth2 has given_name and family_name
  //auth0 does not
}

function setupListeners() {
  document.querySelector('.buy-btn').addEventListener('click', submitOrder)
}

function homePage() {
  window.location.pathname = 'index.html';
}



async function init() {
  await auth.initializeAuth0Client();
  await ba.initBasket();
  await renderCheckoutPage();
  setupListeners();
}

window.addEventListener('load', init);