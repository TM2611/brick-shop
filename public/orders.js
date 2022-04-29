import * as _ from './nav.js'
import * as fjs from './fetch.js'
import * as main from './main.js'
import * as auth from './auth.js'
import * as ba from './basket.js'

function setupListeners() {

}

//dynamically create order list table
export async function customerListOrders(){
  const profile = await main.getProfile();
  const userID = profile.sub
  const orders = await fjs.fetchCustomerOrders(userID);
  const t1 = document.querySelector('.customer-order-row-template');
  const tableBody = document.querySelector('.customer-order-table-body');
  Object.keys(orders).forEach(key => {
    const orderRowTemplate = t1.content.cloneNode(true);
    const orderIDCell = orderRowTemplate.querySelector('.order-id-cell');
    const productCell = orderRowTemplate.querySelector('.product-cell');
    const colourCell = orderRowTemplate.querySelector('.colour-cell');
    const quantityCell = orderRowTemplate.querySelector('.quantity-cell');
    const dateCell = orderRowTemplate.querySelector('.customer-order-date-cell');
    orderIDCell.textContent = orders[key].OrderID;
    productCell.textContent = orders[key].ProductName;
    colourCell.textContent = orders[key].Colour;
    quantityCell.textContent = orders[key].Quantity;
    dateCell.textContent = orders[key].OrderDate;
    tableBody.append(orderRowTemplate)
  });
}

async function init() {
  await auth.initializeAuth0Client();
  await auth.updateAuthUI();
  await auth.handleAuth0Redirect();
  await ba.initBasket();
  await customerListOrders()
  setupListeners();
}

window.addEventListener('load', init);