import * as main from './main.js';
// import * as auth from './auth.js';
import * as ba from './basket.js';
import * as fjs from './fetch.js';



export async function renderCheckout(){
  const isBasketEmpty = localStorage.getItem('basket') === null;
  if (isBasketEmpty) {
    const emptyBasketMsg = document.querySelector('#empty-checkout-msg');
    // const continueShopping = document.querySelector('#continue-shopping');
    emptyBasketMsg.textContent = 'Your basket is Empty'
    // continueShopping.innerHTML = '<a href="./index.html">Continue shopping</a>'
    return;
  }
  const container = document.querySelector('.checkout-items');
  // const buyNowBtn = document.querySelector('#buy-btn')
  // let total = document.querySelector('#checkout-total-value') //TODO: create function to calc total from basket local storage
  let preTotal =  document.querySelector('#checkout-pre-total')
  const products = await fjs.fetchAllSingles();
  for (const [itemID, quantity] of ba.basket.entries()) {
    const product = products.find(({ ProductID }) => ProductID === itemID);
    const t1 = document.querySelector('#checkout-item-template');
    const itemTemplate = t1.content.cloneNode(true);
    const img = itemTemplate.querySelector('#checkout-item-img');
    const itemName = itemTemplate.querySelector('#checkout-item-name');
    const itemPrice = itemTemplate.querySelector('#checkout-item-value');
    const checkoutItemDom = itemTemplate.querySelector('.checkout-item');
    checkoutItemDom.dataset.id = product.ProductID;
    itemName.textContent = product.ProductName;
    img.src = product.ProductImage;
    img.alt = product.ProductImage;
    itemName.textContent = product.ProductName;
    itemPrice.textContent = (product.Price / 100).toFixed(2);
    container.append(itemTemplate);
  }
  preTotal.textContent = 'Order Total : £'
  // total.textContent = document.querySelector('.basket-total').textContent;
}

function setupListeners() {
}


async function init() {
  // await auth.initializeAuth0Client();
  // await auth.updateAuthUI();
  // await auth.handleAuth0Redirect();
  await ba.initBasket();
  await renderCheckout();
  setupListeners();
}

window.addEventListener('load', init);