import * as ba from './basket.js';
import * as auth from './auth.js';
import * as _ from './nav.js';



async function displayConfirmation(){
  ba.clearBasket();
  const order = JSON.parse(sessionStorage.orderDetails);
  const orderDate = order.orderDate;
  const orderID = order.orderID;
  document.querySelector('.order-id').textContent =  `Order ID: ${orderID}`;
  document.querySelector('.order-date').textContent = `Order Date/Time: ${orderDate}`;
}

async function init() {
  await ba.initBasket();
  await auth.initializeAuth0Client();
  await displayConfirmation()

}

window.addEventListener('load', init);