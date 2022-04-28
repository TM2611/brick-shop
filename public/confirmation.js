// import * as auth from './auth.js';
import * as ba from './basket.js';
import * as fjs from './fetch.js';
import * as main from './main.js';
import * as auth from './auth.js';



async function displayConfirmation(){
  const basket = new Map(JSON.parse(sessionStorage.basket));
  const orderDetails = JSON.parse(sessionStorage.orderDetails);
  const date = orderDetails.OrderDate;
  const orderID = orderDetails.OrderID;
  document.querySelector('.order-id').textContent = orderID;
  document.querySelector('.order-date').textContent = date;
}

function setupListeners() {
  document.querySelector('.buy-btn').addEventListener('click', submitOrder)
}



async function init() {
  await auth.initializeAuth0Client();
  await displayConfirmation()
  setupListeners();
}

window.addEventListener('load', init);